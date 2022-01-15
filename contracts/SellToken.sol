pragma solidity ^0.4.22;
import "hardhat/console.sol";

import "./CreateToken.sol";

contract SellToken {
    address public admin;
    Token public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokensSold;
    uint public balance = address(this).balance;
    event Sell(address _buyer, uint256 _amount);

    constructor(Token _tokenContract, uint256 _tokenPrice)
        public
    {
        require(_tokenContract.tokenOwner() == msg.sender,"only token owner");
        admin = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
        tokenContract.setSellerContract(address(this));
    }
    function multiply(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require(y == 0 || (z = x * y) / y == x);
    }

    function buyTokens(uint256 _numberOfTokens) public payable {
        console.log(tokenContract.balanceOf(admin),_numberOfTokens);
        require(msg.value == multiply(_numberOfTokens, tokenPrice),"1");
        require(tokenContract.balanceOf(this) >= _numberOfTokens,"2");
        //require(tokenContract.balanceOf(admin) >= _numberOfTokens,"2");
        
        // require(tokenContract.transferFrom(admin,msg.sender, _numberOfTokens),"3");

        tokensSold += _numberOfTokens;
        balance =balance + msg.value ;
        require(tokenContract.transfer(msg.sender, _numberOfTokens),"3");
       emit Sell(msg.sender, _numberOfTokens);
    }

    function endSale() public {
        require(msg.sender == admin,"only token owner");
        admin.transfer(address(this).balance);//transfer ether
        tokenContract.setSellerContract(address(0));
        tokenContract.transfer(admin,tokenContract.balanceOf(this));//transfer token
    }
    function getSummary()
        public
        view
        returns (
            uint256,
            uint256,
            address
        )
    {
        return (
            tokenPrice,
            tokensSold,
            admin
        );
    }
}
