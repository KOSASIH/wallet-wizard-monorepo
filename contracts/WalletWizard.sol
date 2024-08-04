// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./ProfitGenerator.sol";
import "./CryptoWallet.sol";

contract WalletWizard {
    using SafeMath for uint256;

    // Mapping of user addresses to their profit balances
    mapping (address => uint256) public userBalances;

    // Mapping of user addresses to their investment amounts
    mapping (address => uint256) public userInvestments;

    // ProfitGenerator contract instance
    ProfitGenerator public profitGenerator;

    // CryptoWallet contract instance
    CryptoWallet public cryptoWallet;

    // Event emitted when a user invests in the platform
    event Invested(address indexed user, uint256 amount);

    // Event emitted when a user withdraws their profits
    event Withdrawn(address indexed user, uint256 amount);

    /**
     * @dev Initializes the WalletWizard contract
     */
    constructor() public {
        profitGenerator = new ProfitGenerator();
        cryptoWallet = new CryptoWallet();
    }

    /**
     * @dev Allows users to invest in the platform
     * @param _amount The amount of Ether to invest
     */
    function invest(uint256 _amount) public {
        require(_amount > 0, "Invalid investment amount");

        userInvestments[msg.sender] = userInvestments[msg.sender].add(_amount);
        emit Invested(msg.sender, _amount);
    }

    /**
     * @dev Generates daily profits and distributes them to users
     */
    function generateProfits() public {
        uint256 totalProfits = profitGenerator.calculateProfits();
        distributeProfits(totalProfits);
    }

    /**
     * @dev Distributes profits to users based on their investment amounts
     * @param _totalProfits The total profits to distribute
     */
    function distributeProfits(uint256 _totalProfits) internal {
        for (address user in userInvestments) {
            uint256 userProfit = _totalProfits.mul(userInvestments[user]).div(totalInvestments());
            userBalances[user] = userBalances[user].add(userProfit);
        }
    }

    /**
     * @dev Allows users to withdraw their profits
     */
    function withdraw() public {
        uint256 userBalance = userBalances[msg.sender];
        require(userBalance > 0, "Insufficient balance");

        cryptoWallet.transfer(msg.sender, userBalance);
        userBalances[msg.sender] = 0;
        emit Withdrawn(msg.sender, userBalance);
    }

    /**
     * @dev Returns the total investments in the platform
     */
    function totalInvestments() public view returns (uint256) {
        uint256 total = 0;
        for (address user in userInvestments) {
            total = total.add(userInvestments[user]);
        }
        return total;
    }
}
