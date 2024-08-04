// Import dependencies
import Web3 from 'web3';
import { WalletWizardContract } from '../contracts/WalletWizardContract';
import { CryptoWalletContract } from '../contracts/CryptoWalletContract';
import { OracleContract } from '../oracle/OracleContract';

// Set up Web3 provider
const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/YOUR_PROJECT_ID'));

// Set up contract instances
const walletWizardContract = new WalletWizardContract('WalletWizard', '0x1234567890abcdef');
const cryptoWalletContract = new CryptoWalletContract('CryptoWallet', '0xabcdef1234567890');
const oracleContract = new OracleContract('Oracle', '0x7890abcdef123456');

// Deploy contracts
async function deployContracts() {
  // Deploy WalletWizard contract
  const walletWizardTx = await web3.eth.accounts.signTransaction({
    from: '0x1234567890abcdef',
    to: '0x0000000000000000000000000000000000000000',
    data: walletWizardContract.bytecode,
    gas: '200000',
    gasPrice: web3.utils.toWei('20', 'gwei'),
  }, '0x1234567890abcdef');
  await web3.eth.sendTransaction(walletWizardTx.rawTransaction);

  // Deploy CryptoWallet contract
  const cryptoWalletTx = await web3.eth.accounts.signTransaction({
    from: '0xabcdef1234567890',
    to: '0x0000000000000000000000000000000000000000',
    data: cryptoWalletContract.bytecode,
    gas: '200000',
    gasPrice: web3.utils.toWei('20', 'gwei'),
  }, '0xabcdef1234567890');
  await web3.eth.sendTransaction(cryptoWalletTx.rawTransaction);

  // Deploy Oracle contract
  const oracleTx = await web3.eth.accounts.signTransaction({
    from: '0x7890abcdef123456',
    to: '0x0000000000000000000000000000000000000000',
    data: oracleContract.bytecode,
    gas: '200000',
    gasPrice: web3.utils.toWei('20', 'gwei'),
  }, '0x7890abcdef123456');
  await web3.eth.sendTransaction(oracleTx.rawTransaction);
}

deployContracts().then(() => {
  console.log('Contracts deployed successfully!');
}).catch((error) => {
  console.error('Error deploying contracts:', error);
});
