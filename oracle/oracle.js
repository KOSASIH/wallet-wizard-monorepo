// Import dependencies
import Web3 from 'web3';
import { AggregatorV3Interface } from '@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface';

// Define Oracle class
class Oracle {
  constructor(web3, aggregatorAddress) {
    this.web3 = web3;
    this.aggregator = new AggregatorV3Interface(aggregatorAddress);
  }

  async getLatestPrice() {
    const { answer } = await this.aggregator.latestRoundData();
    return answer;
  }
}

export default Oracle;
