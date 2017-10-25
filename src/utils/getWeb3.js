import Web3 from 'web3';
import { Platform } from 'react-native';
import Promise from 'bluebird';
import HDWalletProvider from 'truffle-hdwallet-provider';
import { ROPSTEN_RPC_URL } from './config';

const getWeb3 = (mnemonic, rpcUrl) => {
  if (!mnemonic) {
    mnemonic = 'knee violin certain rebuild rival couch wonder bind bridge delay tourist poet';
  }

  if(!rpcUrl) {
    rpcUrl = ROPSTEN_RPC_URL;
  }
  
  // iOS and Android have different host computer hostnames.
  var testRpcUrl = '10.0.2.2';

  if (Platform.OS === 'ios') {
    testRpcUrl = 'localhost';
  }

  //var provider = new Web3.providers.HttpProvider(rpcUrl);
  // var provider = new HDWalletProvider('knee violin certain rebuild rival couch wonder bind bridge delay tourist poet', 'https://ropsten.infura.io/');
  const provider = new HDWalletProvider(mnemonic, rpcUrl);

  const web3 = new Web3(provider);

  if (typeof web3.eth.getAccountsPromise === "undefined") {
    Promise.promisifyAll(web3.eth, { suffix: "Promise" });
  }
  return web3;
};

export default getWeb3;
