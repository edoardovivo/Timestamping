const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');


const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const timestampingPath = path.resolve(__dirname, 'contracts', 'Timestamping.sol');
const importPath = path.resolve(__dirname, 'contracts/import', 'stringUtils.sol');

var input = {
  'Timestamping.sol': fs.readFileSync(timestampingPath, 'utf8'),
  'stringUtils.sol': fs.readFileSync(importPath, 'utf8')
}
//const source = fs.readFileSync(timestampingPath, 'utf8');

const compiledContracts = solc.compile({sources: input}, 1).contracts;
fs.ensureDirSync(buildPath);

//console.log(compiledContracts);

//console.log(output);

for (let contract in compiledContracts) {

  fs.outputJsonSync(
    path.resolve(buildPath, contract.split(":")[1] + '.json'),
    compiledContracts[contract]
  );

}
