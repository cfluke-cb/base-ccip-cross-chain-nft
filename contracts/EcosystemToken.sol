// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EcosystemToken is ERC20, Ownable {
    constructor(
        address initialOwner
    ) ERC20("EcosystemToken", "ETK") Ownable(initialOwner) {
        _mint(initialOwner, 10000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
