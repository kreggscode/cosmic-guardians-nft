// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title LazyNFT
 * @dev ERC721 NFT with lazy minting - NFTs are minted only when purchased
 * This saves gas for the creator and allows gasless minting
 */
contract LazyNFT is ERC721URIStorage, Ownable, ReentrancyGuard {
    using ECDSA for bytes32;

    // Counter for token IDs
    uint256 private _tokenIdCounter;

    // Price per NFT in wei
    uint256 public mintPrice;

    // Maximum supply
    uint256 public maxSupply;

    // Signer address for voucher verification
    address public signerAddress;

    // Track used vouchers to prevent replay attacks
    mapping(bytes32 => bool) private _usedVouchers;

    // Struct for lazy minting voucher
    struct NFTVoucher {
        uint256 tokenId;
        uint256 price;
        string tokenURI;
        bytes signature;
    }

    // Events
    event NFTMinted(address indexed minter, uint256 indexed tokenId, uint256 price);
    event PriceUpdated(uint256 newPrice);
    event SignerUpdated(address newSigner);

    constructor(
        string memory name,
        string memory symbol,
        uint256 _mintPrice,
        uint256 _maxSupply,
        address _signerAddress
    ) ERC721(name, symbol) {
        mintPrice = _mintPrice;
        maxSupply = _maxSupply;
        signerAddress = _signerAddress;
    }

    /**
     * @dev Lazy mint an NFT using a signed voucher
     * @param voucher The NFT voucher containing tokenId, price, tokenURI, and signature
     */
    function lazyMint(NFTVoucher calldata voucher) external payable nonReentrant {
        // Verify the voucher hasn't been used
        bytes32 voucherHash = _hashVoucher(voucher);
        require(!_usedVouchers[voucherHash], "Voucher already used");

        // Verify the signature
        require(_verifyVoucher(voucher), "Invalid signature");

        // Verify payment
        require(msg.value >= voucher.price, "Insufficient payment");

        // Verify supply
        require(_tokenIdCounter < maxSupply, "Max supply reached");

        // Mark voucher as used
        _usedVouchers[voucherHash] = true;

        // Mint the NFT
        _tokenIdCounter++;
        uint256 tokenId = _tokenIdCounter;
        
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, voucher.tokenURI);

        emit NFTMinted(msg.sender, tokenId, voucher.price);

        // Refund excess payment
        if (msg.value > voucher.price) {
            payable(msg.sender).transfer(msg.value - voucher.price);
        }
    }

    /**
     * @dev Regular mint function (owner only, for airdrops/giveaways)
     */
    function mint(address to, string memory tokenURI) external onlyOwner {
        require(_tokenIdCounter < maxSupply, "Max supply reached");
        
        _tokenIdCounter++;
        uint256 tokenId = _tokenIdCounter;
        
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);

        emit NFTMinted(to, tokenId, 0);
    }

    /**
     * @dev Batch mint (owner only)
     */
    function batchMint(address[] calldata recipients, string[] calldata tokenURIs) external onlyOwner {
        require(recipients.length == tokenURIs.length, "Arrays length mismatch");
        require(_tokenIdCounter + recipients.length <= maxSupply, "Exceeds max supply");

        for (uint256 i = 0; i < recipients.length; i++) {
            _tokenIdCounter++;
            uint256 tokenId = _tokenIdCounter;
            
            _safeMint(recipients[i], tokenId);
            _setTokenURI(tokenId, tokenURIs[i]);

            emit NFTMinted(recipients[i], tokenId, 0);
        }
    }

    /**
     * @dev Verify the voucher signature
     */
    function _verifyVoucher(NFTVoucher calldata voucher) internal view returns (bool) {
        bytes32 digest = _hashVoucher(voucher);
        address recoveredSigner = digest.toEthSignedMessageHash().recover(voucher.signature);
        return recoveredSigner == signerAddress;
    }

    /**
     * @dev Hash the voucher data
     */
    function _hashVoucher(NFTVoucher calldata voucher) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(
            voucher.tokenId,
            voucher.price,
            voucher.tokenURI
        ));
    }

    /**
     * @dev Update mint price (owner only)
     */
    function setMintPrice(uint256 _newPrice) external onlyOwner {
        mintPrice = _newPrice;
        emit PriceUpdated(_newPrice);
    }

    /**
     * @dev Update signer address (owner only)
     */
    function setSignerAddress(address _newSigner) external onlyOwner {
        require(_newSigner != address(0), "Invalid signer address");
        signerAddress = _newSigner;
        emit SignerUpdated(_newSigner);
    }

    /**
     * @dev Withdraw contract balance (owner only)
     */
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");
        payable(owner()).transfer(balance);
    }

    /**
     * @dev Get total minted count
     */
    function totalMinted() external view returns (uint256) {
        return _tokenIdCounter;
    }

    /**
     * @dev Check if voucher has been used
     */
    function isVoucherUsed(NFTVoucher calldata voucher) external view returns (bool) {
        return _usedVouchers[_hashVoucher(voucher)];
    }

    /**
     * @dev Get remaining supply
     */
    function remainingSupply() external view returns (uint256) {
        return maxSupply - _tokenIdCounter;
    }
}
