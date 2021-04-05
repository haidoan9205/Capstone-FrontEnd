const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema({
    transactionId: String,
    prevOwner: String,
    userId: String,
    photoId: String,
    photoHash: String,
    amount: String,
    transactionCreationTime: Date,
    // transactionCreatonTime: {
    //     type: Date,
    //     default: Date.now
    // }
})

module.exports = mongoose.model('Transaction', TransactionSchema);