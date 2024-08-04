    function transfer(address _user, uint256 _amount) public {
        require(_amount > 0, "Invalid transfer amount");

        walletBalances[_user] = walletBalances[_user].add(_amount);
        emit Received(_user, _amount);
    }

    /**
     * @dev Returns the balance of a user's wallet
     * @param _user The address of the user's wallet
     */
    function balanceOf(address _user) public view returns (uint256) {
        return walletBalances[_user];
    }
}
