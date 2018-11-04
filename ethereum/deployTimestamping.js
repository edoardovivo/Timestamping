const deploy = require('./deploy.js');
const compiledTimestamping = require('../ethereum/build/Timestamping.json');
const path = require('path');
const fs = require('fs-extra');
const linker = require('solc/linker')

//Retrieving address of stringUtils
const sUtilsAddressPath = path.resolve(__dirname, 'deployed', 'address_stringUtils.txt');
address = fs.readFileSync(sUtilsAddressPath, 'utf8')

//Linking
let tsByteCode = compiledTimestamping.bytecode;
tsByteCode =  linker.linkBytecode(tsByteCode, { 'stringUtils.sol:StringUtils': address  })
compiledTimestamping.bytecode = tsByteCode;

//Deploying timestamping
deploy.deploy(compiledTimestamping, "address_timestamping.txt");
