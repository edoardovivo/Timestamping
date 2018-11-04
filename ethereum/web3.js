import Web3 from 'web3';

let provider;
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // We are in the browser and metamask has injected web3
  provider = window.web3.currentProvider;
} else {
  //We are on the server or the user is not running metamask
  provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/Szn8SoFY1YK7oguBOTFy'
  );
}
const web3 = new Web3(provider);

export default web3;
