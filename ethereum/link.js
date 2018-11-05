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

const buildPath = path.resolve(__dirname, 'build');
fs.ensureDirSync(buildPath);
fs.outputJsonSync(
  path.resolve(buildPath, "Timestamping_linked" + '.json'),
  compiledTimestamping
);
