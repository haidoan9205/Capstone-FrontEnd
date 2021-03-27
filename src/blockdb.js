const ProvenDB = require('@southbanksoftware/provendb-node-driver').Database;
const MongoClient = require('mongodb').MongoClient;
//const url = "mongodb+srv://imago-admin:capstone@cluster0.1vhur.mongodb.net/myFirstDatabase?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";
const url = "mongo mongodb://imago-admin:capstone@imago-bc.provendb.io/imago-bc?ssl=true";

const client = new MongoClient(url);

// The database to use
const dbName = "imago-bc";

let result;
let pdb;

async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server!");
        const db = client.db(dbName);
        // Create ProvenDB Client
        pdb = new ProvenDB(db);
        console.log(db);
        // Use/Create the collection "Transactions"
        const col = pdb.collection("Transactions");
        // Check current version
        result = await pdb.getVersion();
        console.log(`Version was ${result.version}.`);
        // Construct a document                                                                                                                                                              
        let userTransaction = {
            "transactionId": "test trans id",
            "userId": "test user id",
            "name": "Jane Doe",
            "photoId": "test photo id",
            "photoHash": "098f6bcd4621d373cade4e832627b4f6",
            "price": 50000 + " USD",
            "transactionCreation": new Date(),
        }
        // Insert a single document, wait for promise so we can read it back
        result = await col.insertOne(userTransaction);
        // Find one document
        result = await col.findOne();
        // Print to the console
        console.log(result);
        // Check version again
        result = await pdb.getVersion();
        console.log(`Version is now ${result.version}.`);

        // Fetch the history of that document.
        result = await pdb.docHistory('Transactions', { name: 'Jane Doe' });
        console.log(result);
        let length = result.history.length;
        console.log(
            `History for document: ${JSON.stringify(result.history[length - 1], null, 4)}`
        );

        // Create a Proof
        result = await pdb.submitProof();
        console.log(`Submitted Proof: ${JSON.stringify(result, null, 4)}`);

        // Get an existing Proof
        result = await pdb.getProof('6fa4bdc1-3b14-4347-8cf1-b3419085caac');
        console.log(`Latest Proof Is: ${JSON.stringify(result, null, 4)}`);

    } catch (err) {
        console.log(err.stack);
    }

    finally {
        await client.close();
    }
}
run().catch(console.dir);
