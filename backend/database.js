// Import dependencies
import mongoose from 'ongoose';

// Define database schema
const userSchema = new mongoose.Schema({
  _id: String,
  investmentHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Investment' }],
  walletBalance: Number,
});

const investmentSchema = new mongoose.Schema({
  _id: String,
  amount: Number,
  date: Date,
});

// Create models
const User = mongoose.model('User', userSchema);
const Investment = mongoose.model('Investment', investmentSchema);

// Define database methods
async function getUser(id) {
  return User.findById(id);
}

async function getInvestmentHistory(id) {
  return User.findById(id).populate('investmentHistory');
}

async function addInvestment(id, amount) {
  const investment = new Investment({ amount, date: new Date() });
  await investment.save();
  await User.findByIdAndUpdate(id, { $push: { investmentHistory: investment._id } });
}

async function updateWalletBalance(id, balance) {
  await User.findByIdAndUpdate(id, { walletBalance: balance });
}

export default { getUser, getInvestmentHistory, addInvestment, updateWalletBalance };
