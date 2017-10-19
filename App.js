import './shim';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Web3 from 'web3';
import SimpleStorageContract from './build/contracts/SimpleStorage.json';

export default class App extends React.Component {
  constructor() {
    super();

    const contract = require('truffle-contract');
    const simpleStorage = contract(SimpleStorageContract);
    const provider = new Web3.providers.HttpProvider('http://localhost:8545');
    console.log(provider);
    const web3 = new Web3(provider);
    simpleStorage.setProvider(web3.currentProvider);
    this.state = {
      storageValue: 'Loading balance...',
      accounts: [0],
      instance: '',
    };
    let simpleStorageInstance;
    web3.eth.getAccounts((error, accounts) => {
      this.setState({
        accounts
      });
      simpleStorage.deployed().then((instance) => {
        simpleStorageInstance = instance;
        this.setState({
          instance: instance.address,
        });
        // Stores a given value, 5 by default.
        console.log('test1');
        return simpleStorageInstance.set(5, {from: accounts[0]});
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        console.log('test2');
        return simpleStorageInstance.get.call({from: accounts[0]});
      }).then((result) => {
        // Update state with the result.
        console.log('test1');
        return this.setState({ storageValue: result.c[0] });
      });
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.storageValue}</Text>
        <Text>{this.state.instance}</Text>
        <Text>{this.state.accounts[0]}</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
