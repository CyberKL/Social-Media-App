// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

interface IUser {
    function getUser(address _userAddress) external view returns (bool, string memory, string memory);
}

contract Post {
    struct PostData {
        address author;
        string authorUsername;
        string content;
        uint timestamp;
    }

    PostData[] public posts;
    IUser public userContract;

    // Set the User contract address in the constructor
    constructor(address _userContractAddress) {
        userContract = IUser(_userContractAddress);
    }

    function createPost(string memory _content) public {
        string memory authorUsername = userContract.getUser(msg.sender).username;
        posts.push(PostData(msg.sender, authorUsername, _content, block.timestamp));
    }

    function getPosts() public view returns (PostData[] memory) {
        return posts;
    }
}