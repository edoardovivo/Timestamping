const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledTimestamping = require('../ethereum/build/Timestamping.json');
const compiledsUtils = require('../ethereum/build/StringUtils.json');
const path = require('path');
const fs = require('fs-extra');

const deployedPath = path.resolve(__dirname, 'deployed');

const provider = new HDWalletProvider(
	'manual weather expose vibrant affair trick creek copper mansion toy borrow secret',
	'https://rinkeby.infura.io/Szn8SoFY1YK7oguBOTFy'
);
const web3 = new Web3(provider);


module.exports = {

	deploy: async (compiledContract, fname) => {
			// Get a list of all accounts
			const accounts = await web3.eth.getAccounts();

			console.log('Attempting to deploy from account ', accounts[0]);
			//Use one of those accounts to deploy contract
			const result = await new web3.eth.Contract(JSON.parse(compiledContract.interface))
				.deploy({data: compiledContract.bytecode})
				.send({from: accounts[0], gas: 1000000});

			console.log("Contract deployed to: ", result.options.address);

		  fs.writeFile(
		    path.resolve(deployedPath, fname),
		    result.options.address,
		    'utf-8',
		    function(err) {
		     if(err) {
		         return console.log(err);
		     }

		     console.log("The file was saved!");
		   });

		}
}
/*
const deploy = async (compiledContract, fname) => {
	// Get a list of all accounts
	const accounts = await web3.eth.getAccounts();

	console.log('Attempting to deploy from account ', accounts[0]);
	//Use one of those accounts to deploy contract
	const result = await new web3.eth.Contract(JSON.parse(compiledContract.interface))
		.deploy({data: compiledContract.bytecode})
		.send({from: accounts[0], gas: 1000000});

	console.log("Contract deployed to: ", result.options.address);

  fs.writeFile(
    path.resolve(deployedPath, fname),
    result.options.address,
    'utf-8',
    function(err) {
     if(err) {
         return console.log(err);
     }

     console.log("The file was saved!");
   });

};

//export default deploy;

//First, we have to deploy stringUtils and retrieve the address
/*
deploy(compiledsUtils, "address_stringUtils.txt");
const sUtilsAddressPath = path.resolve(__dirname, 'deployed', 'address_stringUtils.txt');
address = fs.readFileSync(sUtilsAddressPath, 'utf8')
console.log(address);
*/
//Then, we link the address in the bytecode for timestamping.sol

//Finally, we deploy Timestamping

//deploy();
