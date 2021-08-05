import { expect } from 'chai';
import { artifacts, network, patract } from 'redspot';

const { getContractFactory, getRandomSigner, Contract } = patract;

const { api, getAddresses, getSigners } = network;

let signer: string;
let bob: string;
let erc20: typeof Contract;
let air_drop: typeof Contract;

describe('Air_drop', () => {
  after(() => {
    return api.disconnect();
  });

  before(async () => {
    await api.isReady;
    const signerAddresses = await getAddresses();
    signer = signerAddresses[0];
    bob = signerAddresses[2]
  });

/*
  erc20 contract test
*/

  it('deploy erc20', async () => {
    const erc20Factory = await getContractFactory('erc20', signer);
    erc20 = await erc20Factory.deploy('new', 'SubDAO Token', 'SDT', '10000000000', '4', signer);

    expect(erc20.address).to.exist;
  });

  /*
  it('erc20 balances of alice', async () => {
    expect((await erc20.query.balanceOf(signer)).output).to.equal(10000000000);
  });

  it('erc20 transfer No1', async () => {
    await expect(() => erc20.tx.transfer(bob, 1000000000)).to.changeTokenBalance(erc20, bob, 1000000000);
  });

  it('erc20 transfer No2 and alice, bob balances', async () => {
    await erc20.tx.transfer(bob, 1000000000)
    expect((await erc20.query.balanceOf(bob)).output).to.equal(2000000000);
    expect((await erc20.query.balanceOf(signer)).output).to.equal(8000000000);
  });
*/

/*
  air_drop contract test 
*/


  it('deploy air_drop', async () => {
    // Salt for adder,subber,accumulator deployment
    const randomVersion = Math.floor(Math.random() * 10000);

    const delegatorFactory = await getContractFactory('air_drop', signer);
    air_drop = await delegatorFactory.deploy(
      'new',
      'erc20',
      erc20.abi.project.source.wasmHash,
      'gov token',
      'gov',
      '10000000000',
      '4',
      signer,
    );

    expect(air_drop.address).to.exist;
  });


  it('air_drop get and invoke', async () => {
    //expect((await air_drop.query.get(signer)).output).to.equal(10000000000);
    expect((await air_drop.query.get(signer)).output).to.equal(0);
    /*
    await air_drop.tx.invoke('erc20', bob, 1000000000);
    expect((await air_drop.query.get(bob)).output).to.equal(0);
    */
    // await delegator.tx.change(-2);
    // expect((await delegator.query.get()).output).to.equal(999);
    // await delegator.tx.switch();
    // await delegator.tx.change(-2);
    // expect((await delegator.query.get()).output).to.equal(1001);
  });
});
