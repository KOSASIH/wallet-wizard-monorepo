// Import dependencies
const axios = require('axios');
const Web3 = require('web3');

// Define market data API endpoints
const MARKET_DATA_API = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd';

// Define profit calculation constants
const PROFIT_CALCULATION_INTERVAL = 86400; // 1 day in seconds
const INVESTMENT_RETURN_RATE = 0.05; // 5% return rate

// Define profit calculation function
async function calculateDailyProfits() {
  // Fetch market data
  const marketDataResponse = await axios.get(MARKET_DATA_API);
  const ethUsdPrice = marketDataResponse.data.ethereum.usd;

  // Calculate daily profits
  const totalInvestments = await getTotalInvestments();
  const dailyProfits = totalInvestments * INVESTMENT_RETURN_RATE * ethUsdPrice;

  return dailyProfits;
}

// Define helper function to get total investments
async function getTotalInvestments() {
  const walletWizard = new Web3.eth.Contract(WalletWizard.abi, WalletWizard.address);
  const totalInvestments = await walletWizard.methods.totalInvestments().call();
  return totalInvestments;
}

module.exports = { calculateDailyProfits };
