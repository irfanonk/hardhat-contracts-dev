
// SPDX-License-Identifier: MIT


pragma solidity ^0.8.0;

/**
 * @title Roles
 * @dev Library for managing addresses assigned to a Role.
 */
library Roles {
    struct Role {
        mapping (address => bool) bearer;
    }

    /**
     * @dev Give an account access to this role.
     */
    function add(Role storage role, address account) internal {
        require(!has(role, account), "Roles: account already has role");
        role.bearer[account] = true;
    }

    /**
     * @dev Remove an account's access to this role.
     */
    function remove(Role storage role, address account) internal {
        require(has(role, account), "Roles: account does not have role");
        role.bearer[account] = false;
    }

    /**
     * @dev Check if an account has this role.
     * @return bool
     */
    function has(Role storage role, address account) internal view returns (bool) {
        require(account != address(0), "Roles: account is the zero address");
        return role.bearer[account];
    }
}
// File: contracts/DrugAuthenticity.sol


pragma solidity ^0.8.0;

contract DrugAuthenticity {
    using Roles for Roles.Role;
    Roles.Role private drugRegisterer;
    Roles.Role private pharmaceutical;

    struct Drug {
        string drugCode;
        string drugName;
        string producedBy;
    }

    struct Companies {
        string companyName;
        Drug[] drugs;
        //mapping (string => Drugs) drugs;
    }

    mapping (address => Companies) public companies;
    address[] public companyAccounts;
    //string[] public drugCodes;
    mapping(string => bool) drugCodes;
    

    constructor(){
        drugRegisterer.add(msg.sender);
    }

    function setCompany(address _companyAddress, string memory _companyName) public returns(bool) {
        require(drugRegisterer.has(msg.sender),"only drug registerer");
        Companies storage company = companies[_companyAddress];
        company.companyName = _companyName;
        pharmaceutical.add(_companyAddress);
        companyAccounts.push(_companyAddress);
        return true;
    }

    function getCompanies() view public returns(address[] memory){
        return companyAccounts;
    }

    function addDrug(string memory _drugCode,string memory _drugName,string memory _producedBy) public returns(bool){
        require(pharmaceutical.has(msg.sender),"only registered pharmaceutical");
        require(!drugCodes[_drugCode],"drug code already added");
        //require(companies[msg.sender].isCompany,"company not registered");
        Drug memory newDrug = Drug({
            drugCode:_drugCode,
            drugName:_drugName,
            producedBy:_producedBy
        });
        //companies[msg.sender].drugs[_drugCode] = newDrug;
        companies[msg.sender].drugs.push(newDrug);
        drugCodes[_drugCode]=true;
        return true;
    }
    function getDrugs(address _companyAddress) public view returns(Drug[] memory ){
        require(pharmaceutical.has(_companyAddress),"only registered pharmaceutical");
        return companies[_companyAddress].drugs;
    }
}