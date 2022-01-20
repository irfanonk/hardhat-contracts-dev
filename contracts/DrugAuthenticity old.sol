
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

    struct Companies{
        string companyName;
    }
    mapping(address => Companies) public companies;
    address[] public companyAccounts;

    struct Drugs {
        string drugName;
        string producedBy;
    }
    mapping(string => Drugs) drugs;
    string[] public drugCodes;

    constructor(){
        drugRegisterer.add(msg.sender);
    }

    function setCompany(address _companyAddress, string memory _companyName) public returns(bool) {
        require(drugRegisterer.has(msg.sender),"only drug registerer");
        Companies memory newCompany = Companies({
            companyName:_companyName
        });
        companies[_companyAddress] = newCompany;
        pharmaceutical.add(_companyAddress);
        companyAccounts.push(_companyAddress);
        return true;
    }

    function getCompanies() view public returns(address[] memory){
        return companyAccounts;
    }

    function addDrug(string memory _drugCode,string memory _drugName,string memory _producedBy) public returns(bool){
        require(pharmaceutical.has(msg.sender),"only registered pharmaceutical");
        Drugs memory newDrug = Drugs({
            drugName:_drugName,
            producedBy:_producedBy
        });
        drugs[_drugCode] = newDrug;
        drugCodes.push(_drugCode);
        return true;
    }

    function getDrug(string memory _drugCode)view public returns(Drugs memory){
        return drugs[_drugCode];
    }
}