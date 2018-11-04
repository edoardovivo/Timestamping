const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const path = require('path');
const fs = require('fs-extra');

const deployedPath = path.resolve(__dirname, 'deployed');

const provider = new HDWalletProvider(
	'manual weather expose vibrant affair trick creek copper mansion toy borrow secret',
	'https://rinkeby.infura.io/Szn8SoFY1YK7oguBOTFy'
);
const web3 = new Web3(provider);

//const INITIAL_STRING = 'Hi there!';
const deploy = async () => {
	// Get a list of all accounts
	const accounts = await web3.eth.getAccounts();

	console.log('Attempting to deploy from account ', accounts[0]);
	//Use one of those accounts to deploy contract
	const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
		.deploy({data: compiledFactory.bytecode})
		.send({from: accounts[0], gas: 1000000});

	console.log("Contract deployed to: ", result.options.address);

  fs.writeFile(
    path.resolve(deployedPath, 'address.txt'),
    result.options.address,
    'utf-8',
    function(err) {
     if(err) {
         return console.log(err);
     }

     console.log("The file was saved!");
   });
};

deploy();
