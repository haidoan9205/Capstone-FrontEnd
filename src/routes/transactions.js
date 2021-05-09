const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv/config');
const Transaction = require('../models/Transaction');
const ProvenDB = require('@southbanksoftware/provendb-node-driver').Database;
const MongoClient = require('mongodb').MongoClient;
const { response } = require('express');

let client;
let result;
let pdb;

async function getConnection() {
    try {
        client = new MongoClient(process.env.DB_CONNECTION1, { useNewUrlParser: true, useUnifiedTopology: true });
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

router.post('/', async(req, res) => {
    //console.log("req body: " + JSON.stringify(req.body));
    await getConnection();
    // Use/Create the collection "Transactions"
    const col = pdb.collection("Transactions");
    // Check current version
    result = await pdb.getVersion();
    console.log(`Version was ${result.version}.`);
    const transaction = new Transaction({
        transactionId: req.body.transactionId,
        prevOwner: req.body.prevOwner,
        userId: req.body.userId,
        photoId: req.body.photoId,
        photoHash: req.body.photoHash,
        amount: req.body.amount + ' USD',
        transactionCreationTime: req.body.transactionCreationTime,
    });
    try {
        result = await col.insertOne(transaction);
        // Find one document
        result = await col.findOne();
        // Print to the console
        console.log(result);
        // Check version again
        result = await pdb.getVersion();
        console.log(`Version is now ${result.version}.`);

        // // Fetch the history of that document.
        // result = await pdb.docHistory('Transactions', { name: 'Yeezus' });
        // console.log(result);
        // let length = result.history.length;
        // console.log(
        //     `History for document: ${JSON.stringify(result.history[length - 1], null, 4)}`
        // );

        // Create a Proof
        result = await pdb.submitProof({
            anchorType: 'HEDERA_MAINNET'
        });
        console.log(`Submitted Proof: ${JSON.stringify(result, null, 4)}`);
        //console.log(`Your ProofID: ${JSON.stringify(result.proofId)}`);
        let proofId = JSON.stringify(result.proofId);
        return res.send(`${proofId}`);
    }
    // try {
    //     const savedTrans = await transaction.save();
    //     res.json(savedTrans);
    // } 
    catch (error) {
        res.json({ message: error });
    } finally {
        await client.close();
    }
    // transaction.save()
    // .then(data => {
    //     res.json(data);
    // })
    //     .catch(err => {
    //         res.json({ message: err });
    //     })

});

router.get('/getProof/:id', async(req, res) => {
    await getConnection();
    try {
        // Get an existing Proof with input proofId
        result = await pdb.getProof(req.params.id);
        if (result.proofs == "") {
            return res.send('ProofId is invalid!');
        } else {
            console.log(`Latest Proof Is: ${JSON.stringify(result.proofs, null, 4)}`);
            return res.json(result.proofs, null, 4);
        }
    } catch (error) {
        res.json({ message: error });
    } finally {
        await client.close();
    }

});

router.get('/getDocumentHistory/:userId', async(req, res) => {
    await getConnection();
    try {
        // Fetch the history of that document.
        result = await pdb.docHistory('Transactions', { userId: `${req.params.userId}` });
        console.log(result);
        let length = result.history.length;
        console.log(
            `History for document: ${JSON.stringify(result.history[length - 1], null, 4)}`
        );

        return res.json(result.history, null, 4);
    } catch (error) {
        res.json({ message: error });
    } finally {
        await client.close();
    }

});

router.get('/getPhotoHistory/:photoHash', async (req, res) => {
    await getConnection();
    try {
        result = await pdb.docHistory('Transactions', { photoHash: `${req.params.photoHash}` });
        console.log(result);
        let length = result.history.length;
        console.log(
            `History of photo: ${JSON.stringify(result.history[length - 1], null, 4)}`
        );
        return res.json(result.history, null, 4);
    } catch (error) {
        res.json({ message: error });
    } finally {
        await client.close();
    }
})

router.put('/checkCart/:photoId', async(req, res) => {
    setTimeout(function() {

        axios.put('https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Photo/ChangeIsBought/' +
            req.params.photoId).then((response) => {
            console.log(response.status);
            console.log(response.data);
        })
    }, 900000);
    // axios.put('https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Photo/ChangeIsBought/' +
    //         req.params.photoId).then((response) => {
    //             console.log(response.status);
    //             console.log(response.data);
    //         })

});

// router.get('/verifyProof/:id', async (req, res) => {
//     await getConnection();
//     try {
//         // Verify the proof of that document.
//         result = await pdb.verifyProof(req.params.id);
//         console.log(result);
//         return res.json(result, null, 4);
//     } catch (error) {
//         res.json({ message: error });
//     } finally {
//         await client.close();
//     }

// });
module.exports = router;