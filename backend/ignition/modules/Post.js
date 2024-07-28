const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const fs = require('fs');

module.exports = buildModule("PostModule", (m) => {
  const userAddress = JSON.parse(fs.readFileSync("./deployedAddress.json")).userAddress;

  const post = m.contract("Post", [userAddress]);

  return { post };
});
