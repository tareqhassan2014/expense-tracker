const  mongoose  = require('mongoose');
const Schema = require('mongoose').Schema;

const categoriesModel = new Schema({
    type: {
        type: String,
        default: 'Investment',
    },
    color: {
        type: String,
        default: '#fcbe44',
    },
});

const transactionModel = new Schema({
    name: {
        type: String,
        default: 'Anonymous',
    },
    amount: Number,
    type: {
        type: String,
        default: 'Investment',
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Categories = mongoose.model('categories', categoriesModel);
const Transaction = mongoose.model('transaction', transactionModel);

exports.default = Transaction;

module.exports = { Categories, Transaction };
