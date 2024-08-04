// Import dependencies
const Web3 = require('web3');
const { WalletWizard } = require('../contracts');

// Initialize Web3 provider
const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/YOUR_PROJECT_ID'));

// Initialize WalletWizard contract instance
const walletWizard = new web3.eth.Contract(WalletWizard.abi, WalletWizard.address);

// Define SDK constants
const SDK_VERSION = '1.0.0';

// Define SDK functions
async function invest(amount, userAddress) {
  // Invest in WalletWizard using Web3
  const txCount = await web3.eth.getTransactionCount(userAddress);
  const tx = {
    from: userAddress,
    to: WalletWizard.address,
    value: web3.utils.toWei(amount, 'ether'),
    gas: '20000',
    gasPrice: web3.utils.toWei('20', 'gwei'),
    nonce: txCount
  };
  const signedTx = await web3.eth.accounts.signTransaction(tx, '0xYourPrivateKey');
  await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
}

async function getInvestmentBalance(userAddress) {
  // Get investment balance using WalletWizard contract
  const balance = await walletWizard.methods.balanceOf(userAddress).call();
  return balance;
}

async function getDailyProfits() {
  // Get daily profits using WalletWizard contract
  const dailyProfits = await walletWizard.methods.dailyProfits().call();
  return dailyProfits;
}

async function withdraw(amount, userAddress) {
  // Withdraw profits using WalletWizard contract
  await walletWizard.methods.withdraw(amount).send({ from: userAddress });
}

// Define SDK events
walletWizard.events.Invested((error, event) => {
  if (error) {
    console.error(error);
  } else {
    console.log(`User invested ${event.returnValues.amount} Ether`);
  }
});

walletWizard.events.DailyProfitsUpdated((error, event) => {
  if (error) {
    console.error(error);
  } else {
    console.log(`Daily profits updated to ${event.returnValues.dailyProfits} Ether`);
  }
});

// Export SDK functions
module.exports = {
  invest,
  getInvestmentBalance,
  getDailyProfits,
  withdraw
};
