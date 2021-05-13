const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema({
    transactionId: String,
    prevOwner: String,
    ownerID: String,
    photoId: String,
    photoHash: String,
    isTransaction: Boolean,
    amount: String,
    createDate: Date,
    // transactionCreatonTime: {
    //     type: Date,
    //     default: Date.now
    // }
})

module.exports = mongoose.model('Transaction', TransactionSchema);