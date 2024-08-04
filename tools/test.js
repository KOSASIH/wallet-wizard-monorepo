// Import dependencies
import { WalletWizardContract } from '../contracts/WalletWizardContract';
import { CryptoWalletContract } from '../contracts/CryptoWalletContract';
import { OracleContract } from '../oracle/OracleContract';
import { expect } from 'chai';

// Set up contract instances
const walletWizardContract = new WalletWizardContract('WalletWizard', '0x1234567890abcdef');
const cryptoWalletContract = new CryptoWalletContract('CryptoWallet', '0xabcdef1234567890');
const oracleContract = new OracleContract('Oracle', '0x7890abcdef123456');

// Define test suite
describe('WalletWizard platform', () => {
  it('should deploy contracts successfully', async () => {
    await deployContracts();
    expect(true).to.be.true;
  });

  it('should allow users to invest', async () => {
    const user = '0x1234567890abcdef';
    const amount = 10;
    await walletWizardContract.invest(user, amount);
    const balance = await walletWizardContract.getBalance(user);
    expect(balance).to.equal(amount);
  });

  it('should allow users to withdraw', async () => {
    const user = '0x1234567890abcdef';
    const amount = 5;
    await cryptoWalletContract.withdraw(user, amount);
    const balance = await cryptoWalletContract.getBalance(user);
    expect(balance).to.equal(5);
  });

  it('should update oracle price feed', async () => {
    const price = 100;
    await oracleContract.updatePriceFeed(price);
    const latestPrice = await oracleContract.getLatestPrice();
    expect(latestPrice).to.equal(price);
  });
});

// Run tests
async function runTests() {
  try {
    await test();
    console.log('Tests passed!');
  } catch (error) {
    console.error('Tests failed:', error);
  }
}

runTests();
