import React from 'react';
import getWeb3 from './utils/getWeb3'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Web3 from 'web3';
import { StackNavigator } from 'react-navigation';
import Home from './Wallet/Home';
import Create from './Wallet/Create';
import Import from './Wallet/Import';
import Send from './Wallet/Send';
import TransactionDetails from './Wallet/TransactionDetails';

const Wallet = StackNavigator({
  WalletHome: {
    screen: Home,
    navigationOptions: {
      title: 'Wallet'
    }
  },
  Create: { screen: Create },
  Import: { screen: Import },
  Send: { screen: Send },
  TransactionDetails: { screen: TransactionDetails },
});
export default Wallet;
