const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema({
    transactionId: String,
    userId: String,
    name: String,
    photoId: String,
    photoHash: String,
    amount: Number,
    transactionCreationTime: Date,
    // transactionCreatonTime: {
    //     type: Date,
    //     default: Date.now
    // }
})

module.exports = mongoose.model('Transaction', TransactionSchema);