const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("PostModule", (m) => {
  const post = m.contract("Post", []);

  return { post };
});
