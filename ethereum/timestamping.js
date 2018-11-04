import web3 from './web3';
import Timestamping from './build/Timestamping.json';

const timestampingAddressPath = path.resolve(__dirname, 'deployed', 'address_timestamping.txt');
address = fs.readFileSync(timestampingAddressPath, 'utf8')

const instance = new web3.eth.Contract(
  JSON.parse(Timestamping.interface),
  address
);

export default instance;
