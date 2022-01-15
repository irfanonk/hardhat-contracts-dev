// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.4.22;
import "hardhat/console.sol";

contract CampaignFactory {
    address[] public deployedCampaigns;
    event NewCampaign(address indexed _owner,string indexed _name,string _description,uint256 _minimum );

    function createCampaign(
        string _name,
        string _description,
        uint256 _minimum
    ) public {
        address newCampaign = new Campaign(
            _name,
            _description,
            _minimum,
            msg.sender
        );
        deployedCampaigns.push(newCampaign);
        emit NewCampaign(msg.sender, _name, _description, _minimum);
    }

    function getDeployedCampaign() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint256 value;
        address recipient;
        bool completed;
        uint256 approvalCount;
        mapping(address => bool) approvals; //referance type
    }
    Request[] public requests;
    string public name;
    string public description;
    uint256 public minimunContribution;
    address public manager;
    mapping(address => bool) public approvers;
    uint256 public approversCount;

    event RequestEvents(
        address indexed creator,
        string indexed description,
        address indexed recipient,
        uint256 _value
    );
    event NewContribution(address indexed _approver,uint256 _amount );
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(
        string _name,
        string _description,
        uint256 _minimum,
        address _campaignCreator
    ) public {
        (name, description, minimunContribution, manager) = (
            _name,
            _description,
            _minimum,
            _campaignCreator
        );
    }

    function contribute() public payable {
        console.log("msg", msg.sender, msg.value);
        require(
            msg.value >= minimunContribution,
            "value should be minimun contribution"
        );
        approvers[msg.sender] = true;
        approversCount++;
        emit NewContribution(msg.sender, msg.value);
    }

    function createRequest(
        string _description,
        uint256 _value,
        address _recipient
    ) public restricted {
        Request memory newRequest = Request({
            completed: false,
            description: _description,
            value: _value,
            recipient: _recipient,
            approvalCount: 0
        });
        requests.push(newRequest);
        emit RequestEvents(msg.sender, _description, _recipient, _value);
    }

    function approveRequest(uint256 index) public {
        require(approvers[msg.sender]);

        Request storage request = requests[index];
        require(request.approvals[msg.sender] == false);
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finilazeRequest(uint256 index) public restricted {
        Request storage request = requests[index];
        require(!request.completed);
        require(request.approvalCount > (approversCount / 2));

        request.completed = true;
        request.recipient.transfer(request.value);
    }

    function getSummary()
        public
        view
        returns (
            string,
            string,
            uint256,
            uint256,
            uint256,
            uint256,
            address
        )
    {
        return (
            name,
            description,
            minimunContribution,
            address(this).balance,
            requests.length,
            approversCount,
            manager
        );
    }
}
