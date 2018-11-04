import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xAB419f8485AD809BD59896966eA0a516c88D6a3d'
);

export default instance;
