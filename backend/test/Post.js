// test/Post.js
const { expect } = require("chai");

describe("Post", function () {
  it("Should create a post", async function () {
    const Post = await ethers.getContractFactory("Post");
    const post = await Post.deploy();

    await post.createPost("Hello, world!");

    let posts = await post.getPosts();
    expect(posts.length).to.equal(1);
    expect(posts[0].content).to.equal("Hello, world!");
  });
});
