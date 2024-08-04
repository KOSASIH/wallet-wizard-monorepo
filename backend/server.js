// Import dependencies
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'ongoose';
import { WalletWizardSDK } from '../sdk/walletWizardSDK';
import { CryptoWalletSDK } from '../sdk/cryptoWalletSDK';
import { Oracle } from '../oracle/oracle';
import database from './database';

// Initialize Express app
const app = express();

// Enable CORS and security headers
app.use(cors());
app.use(helmet());

// Connect to MongoDB database
mongoose.connect('mongodb://localhost/walletwizard', { useNewUrlParser: true, useUnifiedTopology: true });

// Initialize SDKs and Oracle
const walletWizardSDK = new WalletWizardSDK();
const cryptoWalletSDK = new CryptoWalletSDK();
const oracle = new Oracle();

// Define API routes
app.get('/api/profits', async (req, res) => {
  const profits = await walletWizardSDK.getDailyProfits();
  res.json(profits);
});

app.post('/api/invest', async (req, res) => {
  const { amount } = req.body;
  await walletWizardSDK.invest(amount);
  res.json({ message: 'Investment successful' });
});

app.get('/api/investment-history', async (req, res) => {
  const history = await database.getInvestmentHistory();
  res.json(history);
});

app.get('/api/wallet-balance', async (req, res) => {
  const balance = await cryptoWalletSDK.getBalance();
  res.json(balance);
});

app.post('/api/withdraw', async (req, res) => {
  const { amount } = req.body;
  await cryptoWalletSDK.withdraw(amount);
  res.json({ message: 'Withdrawal successful' });
});

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
