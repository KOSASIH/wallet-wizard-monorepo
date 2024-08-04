// Import dependencies
import React, { useState, useEffect } from 'eact';
import { WalletWizardSDK } from '../sdk/walletWizardSDK';
import { CryptoWalletSDK } from '../sdk/cryptoWalletSDK';
import Dashboard from './Dashboard';

// Initialize SDKs
const walletWizardSDK = new WalletWizardSDK();
const cryptoWalletSDK = new CryptoWalletSDK();

// Define App component
function App() {
  const [dailyProfits, setDailyProfits] = useState(0);
  const [investmentHistory, setInvestmentHistory] = useState([]);
  const [walletBalance, setWalletBalance] = useState(0);
  const [investAmount, setInvestAmount] = useState(0);

  useEffect(() => {
    // Fetch daily profits on mount
    walletWizardSDK.getDailyProfits().then((profits) => setDailyProfits(profits));
  }, []);

  const handleInvest = async () => {
    // Invest in WalletWizard
    await walletWizardSDK.invest(investAmount);
    setInvestAmount(0);
  };

  const handleWithdraw = async () => {
    // Withdraw profits from WalletWizard
    await walletWizardSDK.withdraw(dailyProfits);
  };

  const handleDeposit = async () => {
    // Deposit funds into CryptoWallet
    await cryptoWalletSDK.deposit(investAmount);
    setInvestAmount(0);
  };

  const handleWithdrawWallet = async () => {
    // Withdraw funds from CryptoWallet
    await cryptoWalletSDK.withdraw(walletBalance);
  };

  return (
    <div>
      <h1>WalletWizard</h1>
      <Dashboard
        dailyProfits={dailyProfits}
        investmentHistory={investmentHistory}
        walletBalance={walletBalance}
      />
      <form>
        <label>Invest Amount:</label>
        <input
          type="number"
          value={investAmount}
          onChange={(e) => setInvestAmount(e.target.value)}
        />
        <button onClick={handleInvest}>Invest</button>
        <button onClick={handleWithdraw}>Withdraw Profits</button>
        <button onClick={handleDeposit}>Deposit Funds</button>
        <button onClick={handleWithdrawWallet}>Withdraw Wallet Funds</button>
      </form>
    </div>
  );
}

export default App;
