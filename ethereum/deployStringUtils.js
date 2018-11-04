const deploy = require('./deploy.js');
const compiledsUtils = require('../ethereum/build/StringUtils.json');
const path = require('path');
const fs = require('fs-extra');

deploy.deploy(compiledsUtils, "address_stringUtils.txt");
