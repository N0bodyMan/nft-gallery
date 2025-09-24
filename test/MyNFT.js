const { expect } = require("chai");

describe("MyNFT", function () {
  it("Should mint NFT with URI", async function () {
    const [owner, addr1] = await ethers.getSigners();
    const MyNFT = await ethers.getContractFactory("MyNFT");
    const myNFT = await MyNFT.deploy();

    const tokenURI = "ipfs://QmExampleMetadata";
    await myNFT.mint(addr1.address, tokenURI);

    expect(await myNFT.tokenURI(0)).to.equal(tokenURI);
  });
});
