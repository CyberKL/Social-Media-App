const { expect } = require("chai");

describe("User Contract", function () {
  let User;
  let user;
  let owner;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    User = await ethers.getContractFactory("User");
    [owner] = await ethers.getSigners(); // The owner should be a signer

    // Deploy the contract
    user = await User.deploy();
  });

  it("should register a user", async function () {
    // The 'register' function should be called by a signer
    await user.register("alice", "I love blockchain!");

    // Fetch user data
    const userData = await user.getUser(owner.address); // Ensure owner.address is valid

    expect(userData.username).to.equal("alice");
    expect(userData.bio).to.equal("I love blockchain!");
  });
});
