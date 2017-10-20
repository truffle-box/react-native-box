import React from 'react';
import getWeb3 from './utils/getWeb3'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Web3 from 'web3';
import { StackNavigator } from 'react-navigation';
import Home from './Main/Home';
import Network from './Main/Network';

const Main = StackNavigator({
  Main: {
    screen: Home,
    navigationOptions: {
      title: 'Main'
    }
  },
  Network: { screen: Network },
});
export default Main;
