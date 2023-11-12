// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GameNFT is ERC721URIStorage, Ownable {
    string constant TOKEN_URI =
        "https://assets-global.website-files.com/5f6b7190899f41fb70882d08/5f760a499b56c47b8fa74fbb_chainlink-logo.svg";
    uint256 internal tokenId;

    constructor(
        address initialOwner
    ) ERC721("GameNFT", "GNFT") Ownable(initialOwner) {}

    function mint(address to) public onlyOwner {
        //check the erc20 transfer

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, TOKEN_URI);
        unchecked {
            tokenId++;
        }
    }
}
