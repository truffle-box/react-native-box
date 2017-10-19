import './shim';
import React from 'react';
import SimpleStorageContract from './build/contracts/SimpleStorage.json';
import getWeb3 from './utils/getWeb3'
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Web3 from 'web3';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      storageValue: 0,
      web3: null,
      accounts: [],
    };
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
      .then(results => {
        this.setState({
          web3: results.web3
        });
        // Instantiate contract once web3 provided.
        this.instantiateContract();
      })
      .catch(() => {
        console.log('Error finding web3.');
      });
  }

  async instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract');
    const simpleStorage = contract(SimpleStorageContract);
    simpleStorage.setProvider(this.state.web3.currentProvider);

    // Declaring this for later so we can chain functions on SimpleStorage.
    let simpleStorageInstance;

    // Get accounts.
    this.state.web3.eth.getAccounts(async (error, accounts) => {
      this.setState({ accounts });

      simpleStorageInstance = await simpleStorage.deployed();

      // Stores a given value, 5 by default.
      await simpleStorageInstance.set(5, {from: accounts[0]});
        
      // Get the value from the contract to prove it worked.
      let storageValue = await simpleStorageInstance.get.call({from: accounts[0]});

      // Update state with the result.
      this.setState({ storageValue: storageValue.c[0] });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.storageValue}</Text>
        <Text>Good to Go!</Text>
        <Text>Your Truffle Box is installed and ready.</Text>
        <Text>Smart Contract Example</Text>
        <Text>If your contracts compiled and migrated successfully, below will show a stored value of 5 (by default).</Text>
        <Text>Try changing the value stored on line 56 of App.js.</Text>
        <Text>The stored value is: {this.state.storageValue}</Text>
        <Text>Here are your accounts ({this.state.accounts.length})</Text>
        <FlatList
          data={this.state.accounts}
          renderItem={({item}) => <Text>{item}</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
