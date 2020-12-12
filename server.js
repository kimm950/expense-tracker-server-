const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
const colors = require('colors');
const morgan = require('morgan');
const connectDB =require('./config/db')

dotenv.config({ path: './config/config.env' })

connectDB();

const transactions = require('./routes/transactions')

const app = express();

app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/transactions', transactions)
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Running on ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))