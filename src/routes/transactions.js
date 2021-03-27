const express = require('express');
const router = express.Router();
require('dotenv/config');
const Transaction = require('../models/Transaction');
const ProvenDB = require('@southbanksoftware/provendb-node-driver').Database;
const MongoClient = require('mongodb').MongoClient;

const client = new MongoClient(process.env.DB_CONNECTION1, { useNewUrlParser: true });

let result;
let pdb;
let proofId;

async function getConnection() {
    try {
        await client.connect();
        console.log("Connected correctly to server!");
        const db = client.db(process.env.DB_NAME);
        // Create ProvenDB Client
        pdb = new ProvenDB(db);
    } catch (error) {
        console.log(error);
    }
}

router.get('/', (req, res) => {
    res.send('On transactions !')
});

router.post('/', async (req, res) => {
    await getConnection();
    // Use/Create the collection "Transactions"
    const col = pdb.collection("Transactions");
    // Check current version
    result = await pdb.getVersion();
    console.log(`Version was ${result.version}.`);

    const transaction = new Transaction({
        transactionId: req.body.transactionId,
        userId: req.body.userId,
        name: req.body.name,
        photoId: req.body.photoId,
        photoHash: req.body.photoHash,
        price: req.body.price,
        transactionCreationTime: req.body.transactionCreationTime,
    });
    try {
        result = await col.insertOne(transaction);
        // Find one document
        result = await col.findOne();
        let tmp = result;
        // Print to the console
        console.log(result);
        // Check version again
        result = await pdb.getVersion();
        console.log(`Version is now ${result.version}.`);

        // Fetch the history of that document.
        result = await pdb.docHistory('Transactions', { name: 'Tom Doe' });
        console.log(result);
        let length = result.history.length;
        console.log(
            `History for document: ${JSON.stringify(result.history[length - 1], null, 4)}`
        );

        // Create a Proof
        result = await pdb.submitProof();
        console.log(`Submitted Proof: ${JSON.stringify(result, null, 4)}`);
        //console.log(`Your ProofID: ${JSON.stringify(result.proofId)}`);
        proofId = JSON.stringify(result.proofId);

    }
    // try {
    //     const savedTrans = await transaction.save();
    //     res.json(savedTrans);
    // } 
    catch (error) {
        res.json({ message: error });
    }
    finally {
        await client.close();
    }
    // transaction.save()
    // .then(data => {
    //     res.json(data);
    // })
    //     .catch(err => {
    //         res.json({ message: err });
    //     })
    return res.send(`ProofID: ${proofId}`);
});

router.get('/getProof', async (req, res) => {
    
    try {
        await getConnection();
        // Get an existing Proof
        result = await pdb.getProof();
        console.log(`Latest Proof Is: ${JSON.stringify(result, null, 4)}`);
        return res.json(result);
    } catch (error) {
        res.json({ message: error });
    } finally {
        await client.close();
        
    }

})
module.exports = router;