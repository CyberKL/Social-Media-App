// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Post {
    struct PostData {
        address author;
        string content;
        uint timestamp;
    }

    PostData[] public posts;

    function createPost(string memory _content) public {
        posts.push(PostData(msg.sender, _content, block.timestamp));
    }

    function getPosts() public view returns (PostData[] memory) {
        return posts;
    }
}