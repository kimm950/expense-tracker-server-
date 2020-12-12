const mongoose = require('mongoose');

const FindTransactionsSchema = new mongoose.Schema({
  text: {
    type: String,
    trim: true,
    required: [true, 'Please add some texts']
  },
  amount: {
    type: Number,
    required: [true, 'Please add some number']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('transactions', FindTransactionsSchema)
