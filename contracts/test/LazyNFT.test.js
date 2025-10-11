const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LazyNFT", function () {
  let lazyNFT;
  let owner;
  let signer;
  let buyer;
  let addrs;

  const NAME = "Test NFT";
  const SYMBOL = "TNFT";
  const MINT_PRICE = ethers.parseEther("0.05");
  const MAX_SUPPLY = 100;

  beforeEach(async function () {
    [owner, signer, buyer, ...addrs] = await ethers.getSigners();

    const LazyNFT = await ethers.getContractFactory("LazyNFT");
    lazyNFT = await LazyNFT.deploy(
      NAME,
      SYMBOL,
      MINT_PRICE,
      MAX_SUPPLY,
      signer.address
    );
    await lazyNFT.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await lazyNFT.owner()).to.equal(owner.address);
    });

    it("Should set correct parameters", async function () {
      expect(await lazyNFT.name()).to.equal(NAME);
      expect(await lazyNFT.symbol()).to.equal(SYMBOL);
      expect(await lazyNFT.mintPrice()).to.equal(MINT_PRICE);
      expect(await lazyNFT.maxSupply()).to.equal(MAX_SUPPLY);
      expect(await lazyNFT.signerAddress()).to.equal(signer.address);
    });

    it("Should start with zero minted tokens", async function () {
      expect(await lazyNFT.totalMinted()).to.equal(0);
      expect(await lazyNFT.remainingSupply()).to.equal(MAX_SUPPLY);
    });
  });

  describe("Lazy Minting", function () {
    async function createVoucher(tokenId, price, tokenURI) {
      const hash = ethers.solidityPackedKeccak256(
        ["uint256", "uint256", "string"],
        [tokenId, price, tokenURI]
      );
      const signature = await signer.signMessage(ethers.getBytes(hash));
      
      return {
        tokenId,
        price,
        tokenURI,
        signature
      };
    }

    it("Should mint NFT with valid voucher", async function () {
      const voucher = await createVoucher(1, MINT_PRICE, "ipfs://test-uri");

      await expect(
        lazyNFT.connect(buyer).lazyMint(voucher, { value: MINT_PRICE })
      )
        .to.emit(lazyNFT, "NFTMinted")
        .withArgs(buyer.address, 1, MINT_PRICE);

      expect(await lazyNFT.ownerOf(1)).to.equal(buyer.address);
      expect(await lazyNFT.tokenURI(1)).to.equal("ipfs://test-uri");
      expect(await lazyNFT.totalMinted()).to.equal(1);
    });

    it("Should reject invalid signature", async function () {
      const voucher = await createVoucher(1, MINT_PRICE, "ipfs://test-uri");
      
      // Tamper with the voucher
      voucher.tokenId = 2;

      await expect(
        lazyNFT.connect(buyer).lazyMint(voucher, { value: MINT_PRICE })
      ).to.be.revertedWith("Invalid signature");
    });

    it("Should reject insufficient payment", async function () {
      const voucher = await createVoucher(1, MINT_PRICE, "ipfs://test-uri");

      await expect(
        lazyNFT.connect(buyer).lazyMint(voucher, { value: ethers.parseEther("0.01") })
      ).to.be.revertedWith("Insufficient payment");
    });

    it("Should prevent voucher reuse", async function () {
      const voucher = await createVoucher(1, MINT_PRICE, "ipfs://test-uri");

      await lazyNFT.connect(buyer).lazyMint(voucher, { value: MINT_PRICE });

      await expect(
        lazyNFT.connect(addrs[0]).lazyMint(voucher, { value: MINT_PRICE })
      ).to.be.revertedWith("Voucher already used");
    });

    it("Should refund excess payment", async function () {
      const voucher = await createVoucher(1, MINT_PRICE, "ipfs://test-uri");
      const overpayment = ethers.parseEther("0.1");

      const balanceBefore = await ethers.provider.getBalance(buyer.address);
      const tx = await lazyNFT.connect(buyer).lazyMint(voucher, { value: overpayment });
      const receipt = await tx.wait();
      const gasUsed = receipt.gasUsed * receipt.gasPrice;
      const balanceAfter = await ethers.provider.getBalance(buyer.address);

      const expectedBalance = balanceBefore - MINT_PRICE - gasUsed;
      expect(balanceAfter).to.be.closeTo(expectedBalance, ethers.parseEther("0.0001"));
    });

    it("Should respect max supply", async function () {
      // Mint max supply
      for (let i = 1; i <= MAX_SUPPLY; i++) {
        const voucher = await createVoucher(i, MINT_PRICE, `ipfs://token-${i}`);
        await lazyNFT.connect(buyer).lazyMint(voucher, { value: MINT_PRICE });
      }

      expect(await lazyNFT.totalMinted()).to.equal(MAX_SUPPLY);
      expect(await lazyNFT.remainingSupply()).to.equal(0);

      // Try to mint one more
      const voucher = await createVoucher(MAX_SUPPLY + 1, MINT_PRICE, "ipfs://extra");
      await expect(
        lazyNFT.connect(buyer).lazyMint(voucher, { value: MINT_PRICE })
      ).to.be.revertedWith("Max supply reached");
    });
  });

  describe("Owner Functions", function () {
    it("Should allow owner to mint", async function () {
      await lazyNFT.mint(buyer.address, "ipfs://owner-mint");
      
      expect(await lazyNFT.ownerOf(1)).to.equal(buyer.address);
      expect(await lazyNFT.tokenURI(1)).to.equal("ipfs://owner-mint");
    });

    it("Should allow owner to batch mint", async function () {
      const recipients = [buyer.address, addrs[0].address, addrs[1].address];
      const uris = ["ipfs://1", "ipfs://2", "ipfs://3"];

      await lazyNFT.batchMint(recipients, uris);

      expect(await lazyNFT.totalMinted()).to.equal(3);
      expect(await lazyNFT.ownerOf(1)).to.equal(buyer.address);
      expect(await lazyNFT.ownerOf(2)).to.equal(addrs[0].address);
      expect(await lazyNFT.ownerOf(3)).to.equal(addrs[1].address);
    });

    it("Should allow owner to update mint price", async function () {
      const newPrice = ethers.parseEther("0.1");
      await lazyNFT.setMintPrice(newPrice);
      expect(await lazyNFT.mintPrice()).to.equal(newPrice);
    });

    it("Should allow owner to update signer", async function () {
      await lazyNFT.setSignerAddress(addrs[0].address);
      expect(await lazyNFT.signerAddress()).to.equal(addrs[0].address);
    });

    it("Should allow owner to withdraw", async function () {
      // Mint an NFT to add balance
      async function createVoucher(tokenId, price, tokenURI) {
        const hash = ethers.solidityPackedKeccak256(
          ["uint256", "uint256", "string"],
          [tokenId, price, tokenURI]
        );
        const signature = await signer.signMessage(ethers.getBytes(hash));
        return { tokenId, price, tokenURI, signature };
      }

      const voucher = await createVoucher(1, MINT_PRICE, "ipfs://test");
      await lazyNFT.connect(buyer).lazyMint(voucher, { value: MINT_PRICE });

      const ownerBalanceBefore = await ethers.provider.getBalance(owner.address);
      const tx = await lazyNFT.withdraw();
      const receipt = await tx.wait();
      const gasUsed = receipt.gasUsed * receipt.gasPrice;
      const ownerBalanceAfter = await ethers.provider.getBalance(owner.address);

      expect(ownerBalanceAfter).to.equal(ownerBalanceBefore + MINT_PRICE - gasUsed);
    });

    it("Should prevent non-owner from calling owner functions", async function () {
      await expect(
        lazyNFT.connect(buyer).mint(buyer.address, "ipfs://test")
      ).to.be.reverted;

      await expect(
        lazyNFT.connect(buyer).setMintPrice(ethers.parseEther("0.1"))
      ).to.be.reverted;

      await expect(
        lazyNFT.connect(buyer).withdraw()
      ).to.be.reverted;
    });
  });
});
