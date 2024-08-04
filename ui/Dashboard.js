// Import dependencies
import React from 'eact';

// Define Dashboard component
function Dashboard({ dailyProfits, investmentHistory, walletBalance }) {
  return (
    <div>
      <h2>Daily Profits: {dailyProfits} ETH</h2>
      <h2>Investment History:</h2>
      <ul>
        {investmentHistory.map((investment, index) => (
          <li key={index}>{investment.amount} ETH invested on {investment.date}</li>
        ))}
      </ul>
      <h2>Crypto Wallet Balance: {walletBalance} ETH</h2>
    </div>
  );
}

export default Dashboard;
