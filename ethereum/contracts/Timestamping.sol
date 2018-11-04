pragma solidity ^0.4.17;

import "stringUtils.sol";

//import "github.com/ethereum/dapp-bin/library/stringUtils.sol";

contract Timestamping {

	address public owner;

	event Upload(address _sender, string h);
	event Verify(address _verifier, address _toverify, string h);

	struct dataProperties {
		uint blockNumber;
		uint blockTimestamp;
		string data;
	}

	mapping (address => dataProperties[]) userdata;


	constructor() public payable {

		owner = msg.sender;

	}

	function uploadHash(string h) public {
		dataProperties dataprop;
		dataprop.blockNumber = block.number;
		dataprop.blockTimestamp = block.timestamp;
		dataprop.data = h;
		userdata[msg.sender].push(dataprop);

	}

	function getHashProperties(uint index) public returns (uint, uint) {
	    dataProperties[] storage dataprop = userdata[msg.sender];
	    return (dataprop[index].blockNumber, dataprop[index].blockTimestamp);
	}

	function verifyHash(string providedHash) public returns (uint, uint) {
		dataProperties[] storage dataprop = userdata[msg.sender];
		for (uint i=0; i < dataprop.length; i++) {
			if (StringUtils.equal(dataprop[i].data,providedHash) ) {
				return (dataprop[i].blockNumber, dataprop[i].blockTimestamp);
			}

		}
		return (0, 0);

	}

	function killTimestamping() {
		if (msg.sender == owner) {
			suicide(owner);
		}
	}

}
