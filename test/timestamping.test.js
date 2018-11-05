const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const linker = require('solc/linker')

const compiledTimestamping = require('../ethereum/build/Timestamping.json');
const compiledsUtils = require('../ethereum/build/StringUtils.json');

let accounts;
let factory;
let campaignAddress;
let campaign;


beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  result_sUtils = await new web3.eth.Contract(JSON.parse(compiledsUtils.interface))
    .deploy({data: compiledsUtils.bytecode})
    .send({from: accounts[0], gas: 1000000});

  //Linking
  let tsByteCode = compiledTimestamping.bytecode;
  tsByteCode =  linker.linkBytecode(tsByteCode, { 'stringUtils.sol:StringUtils': result_sUtils.options.address  })
  compiledTimestamping.bytecode = tsByteCode;

  result = await new web3.eth.Contract(JSON.parse(compiledTimestamping.interface))
    .deploy({data: compiledTimestamping.bytecode})
    .send({from: accounts[0], gas: 1000000});

  timestamping = await new web3.eth.Contract(
    JSON.parse(compiledTimestamping.interface),
    result.options.address
  );
  /*
  await factory.methods.createCampaign('100').send({
    from: accounts[0],
    gas: '1000000'
  });

  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    campaignAddress
  );
  */
});



describe('Timestamping', () => {
  it('deploys a timestamping contract', () => {
    assert.ok(timestamping.options.address);
  });

  it('uploads a string from a user', async () => {
    const hash = "testHash";
    const uploadHash = await timestamping.methods.uploadHash(hash).send({from: accounts[1], gas: '1000000'});
    const uploadedHashProps = await timestamping.methods.getHashProperties(accounts[1],0).call({from: accounts[1], gas: '1000000'});
    assert.equal(uploadedHashProps[0], hash);
    assert(uploadedHashProps[1] != '0');
    assert(uploadedHashProps[2] != '0');
  });

  it('verifies a hash previously uploaded by a user', async () => {
    const hash = "testHash";
    const uploadHash = await timestamping.methods.uploadHash(hash).send({from: accounts[1], gas: '1000000'});
    const uploadedHashProps = await timestamping.methods.getHashProperties(accounts[1],0).call({from: accounts[1], gas: '1000000'});
    const verifiedHash = await timestamping.methods.verifyHash(accounts[1], hash).call({from: accounts[1], gas: '1000000'});
    assert.equal(verifiedHash[0], uploadedHashProps[1]);
    assert.equal(verifiedHash[1], uploadedHashProps[2]);
  });

  it('a second user verifies a hash previously uploaded by a user', async () => {
    const hash = "testHash";
    const uploadHash = await timestamping.methods.uploadHash(hash).send({from: accounts[1], gas: '1000000'});
    const uploadedHashProps = await timestamping.methods.getHashProperties(accounts[1],0).call({from: accounts[2], gas: '1000000'});
    const verifiedHash = await timestamping.methods.verifyHash(accounts[1],hash).call({from: accounts[2], gas: '1000000'});
    assert.equal(verifiedHash[0], uploadedHashProps[1]);
    assert.equal(verifiedHash[1], uploadedHashProps[2]);
  });

  it('uploads several messages and a second account retrieves the count', async () => {
    const hash = "testHash";
    const numHash = 5
    let uploadHash;
    for (let i=0; i<numHash; i++) {
        uploadHash = await timestamping.methods.uploadHash(hash + "_" + i.toString()).send({from: accounts[1], gas: '1000000'});
    }

    const hashCount = await timestamping.methods.getHashCount(accounts[1]).call({from: accounts[2], gas: '1000000'});
    assert.equal(hashCount, numHash);
  });



  /*
  it('marks caller as campaign manager', async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(accounts[0], manager);
  });

  it('allows people to contribute money and marks them as approvers', async () => {
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: '200'
    });
    const isContributor = await campaign.methods.approvers(accounts[1]).call();
    assert(isContributor);

  });

  it('requires a minimum contribution', async () => {
    try {
      await campaign.methods.contribute().send({
        from: accounts[1],
        value: '80'
      });
      assert(false);
    } catch(err) {
      assert(err);
    }

  });

  it('allows a manager to create a payment request', async () => {
    await campaign.methods
      .createRequest('Buy batteries', '100', accounts[1])
      .send({from: accounts[0], gas: '1000000'});
    const request = await campaign.methods.requests(0).call();
    assert.equal('Buy batteries', request.description);
  });


  it('processes requests', async () => {
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei('10', 'ether')
    });

    await campaign.methods
      .createRequest('Buy batteries', web3.utils.toWei('5', 'ether'), accounts[1])
      .send({from: accounts[0], gas: '1000000'});

    await campaign.methods.approveRequest(0).send({from: accounts[0], gas: '1000000'});

    await campaign.methods.finalizeRequest(0).send({from: accounts[0], gas: '1000000'});

    let balance = await web3.eth.getBalance(accounts[1]);
    balance = web3.utils.fromWei(balance, 'ether');
    balance = parseFloat(balance);
    console.log(balance);
    assert(balance > 104);

  });

  */

});
