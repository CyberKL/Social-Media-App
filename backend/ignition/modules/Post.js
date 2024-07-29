const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("PostModule", (m) => {
  const userAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

  const post = m.contract("Post", [userAddress]);

  return { post };
});
