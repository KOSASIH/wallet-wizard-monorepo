// Import dependencies
import axios from 'axios';

// Define MarketData class
class MarketData {
  async fetchMarketData() {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
    return response.data;
  }

  async processMarketData(data) {
    const { ethereum } = data;
    const price = ethereum.usd;
    return price;
  }
}

export default MarketData;
