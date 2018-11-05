const deploy = require('./deploy.js');
const linkedTimestamping = require('../ethereum/build/Timestamping_linked.json');
const path = require('path');
const fs = require('fs-extra');
const linker = require('solc/linker')


//Deploying timestamping
deploy.deploy(linkedTimestamping, "address_timestamping.txt");
