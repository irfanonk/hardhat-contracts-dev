pragma solidity ^0.4.22;
import "hardhat/console.sol";

contract TokenFactory{
    address[] public deployedTokens;
    address public admin;

    constructor() public {
        admin=msg.sender;
    }
    function createToken(string _name,string _symbol, string _standard, uint256 _initialSupply) public{
        
        address newToken = new Token( _name, _symbol,  _standard,  _initialSupply, msg.sender);
        deployedTokens.push(newToken);
    }
    function getDeployedToken() public view returns(address[]){
        return deployedTokens;
    }
}
contract Token {
    string  public name;
    string  public symbol;
    string  public standard;
    uint256 public totalSupply;
    address public tokenOwner;
    address public sellerContract;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor (string _name,string _symbol, string _standard, uint256 _initialSupply,address _tokenOwner) public {
        (name,symbol,standard,totalSupply)=(_name,_symbol,_standard,_initialSupply);
        tokenOwner=_tokenOwner;
        balanceOf[_tokenOwner]= _initialSupply;
    }

    function setSellerContract(address _sellerContract)external returns(bool) {
        sellerContract = _sellerContract;
        return true;
    }
    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value,"not enough balance");

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

       emit Transfer(msg.sender, _to, _value);

        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        console.log("here");
        allowance[msg.sender][_spender] = _value;

       emit Approval(msg.sender, _spender, _value);

        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        allowance[_from][msg.sender] -= _value;

      emit  Transfer(_from, _to, _value);

        return true;
    }
        function getSummary()
        public
        view
        returns (
            string,
            string,
            string,
            uint256,
            address,
            address
        )
    {
        return (
            name,
            symbol,
            standard,
            totalSupply,
            tokenOwner,
            sellerContract
        );
    }
}
