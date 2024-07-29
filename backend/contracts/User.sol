// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract User {
    struct UserData {
        bool isRegistered;
        string username;
        string bio;
    }

    mapping (address=>UserData) public users;

    function register(string memory _username, string memory _bio) public {
        require(!users[msg.sender].isRegistered, "User already registered");
        users[msg.sender] = UserData(true, _username, _bio);
    }

    function getUser(address _userAddress) public view returns (bool, string memory, string memory) {
        require(users[_userAddress].isRegistered, "User not registered");
        UserData memory userData = users[_userAddress];
        return (userData.isRegistered, userData.username, userData.bio);
    }
}