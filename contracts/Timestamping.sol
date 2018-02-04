pragma solidity ^0.4.17;

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


	function Timestamping() public payable {

		owner = msg.sender;

	}

	function uploadHash(string h) public {
		dataProperties dataprop; 
		dataprop.blockNumber = block.number();
		dataprop.blockTimestamp = block.timestamp();
		dataprop.data = h;
		userdata[msg.sender].push(dataprop);

	}

	function verifyHash(address toverify, string providedHash) public returns (uint, uint) {
		dataProperties[] dataprop = userdata[toverify];
		for (uint i=0; i < dataprop.lenght; i++) {
			if (dataprop[i].data == providedHash) {
				return (dataprop[i].blockNumber, dataprop[i].blockTimestamp)
			}

		}
		return (0, 0)

	}



}
