const TransactionsModel = require('../models/FindTransactions')

// Get /api/transactions
exports.getTransactions = async (req, res, next) => { 
  try {
    const transactions = await TransactionsModel.find();
    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (err) { 
    return res.status(500).json({
      seccess: false,
      error: 'Server Error'
    })
  }
}

// Post /api/vi/transactions
exports.addTransactions = async (req, res, next) => { 
  try {
    const { text, amount } = req.body;

    const transaction = await TransactionsModel.create(req.body);

    return res.status(201).json({
      success: true,
      data: transaction
    });
  } catch (error) {
    if (error.name === 'ValidatorError') {
      const messages = Object.values(error.errors).map((m) => m.message);

      return res.status(400).json({
        success: false,
        error: messages
      })
    } else { 
      return res.status(500).json({
        seccess: false,
        error: 'Server Error'
    })
    }
  }

  res.send('POST REQUEST')
}

// Delete /api/vi/transactions:id
exports.deleteTransactions = async (req, res, next) => { 
  try { 
    const transaction = await TransactionsModel.findById(req.params.id)

    if (!transaction) return res.status(404).json({
      success: false,
      error: 'No transaction Found',
    });

    await transaction.remove()

    return res.send(200).json({
      success: true,
      data: {}
    })
  } catch (error) {
    return res.send(500).json({
      success: false,
      error: 'Internal Server Error'
    })
  }
}