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
        require(!users[_userAddress].isRegistered, "User already registered");
        users[msg.sender] = UserData(_username, _bio, true);
    }

    function getUser(address _userAddress) public view returns (UserData memory) {
        require(users[_userAddress].isRegistered, "User not registered");
        return users[_userAddress];
    }
}