import './shim';
import React from 'react';
import Main from './src/Main';
import Wallet from './src/Wallet';
import {
  AppRegistry,
  Text,
} from 'react-native';
import { TabNavigator } from 'react-navigation';

const SimpleApp = TabNavigator({
  Main: { screen: Main },
  Wallet: { screen: Wallet },
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wallet: null,
      address: null
    }
  }

  createWallet(wallet, address) {
    this.setState({ wallet, address });
  }

  setAccount(address) {
    console.log('address', address);
    this.setState({ address });
  }

  render() {
    const props = {
      address: this.state.address,
      wallet: this.state.wallet,
      createWalletCB: this.createWallet.bind(this),
      setAccount: this.setAccount.bind(this)
    }

    return <SimpleApp screenProps={props}/>;
  }
}
