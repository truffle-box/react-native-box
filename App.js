import './shim';
import getWeb3 from './src/utils/getWeb3';
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
      address: null,
      web3: getWeb3()
    };
  }

  componentWillMount() {
    this.state.web3.eth.getAccountsPromise().then((accounts) => {
      this.setState({
        address: accounts[0],
      });
    });
  }

  async setWallet(mnemonic) {
    const web3 = getWeb3(mnemonic);
    const accounts = await web3.eth.getAccountsPromise();
    this.setState({
      web3,
      address: accounts[0],
    });
  }

  setAccount(address) {
    this.setState({ address });
  }

  render() {
    const props = {
      address: this.state.address,
      setAccount: this.setAccount.bind(this),
      web3: this.state.web3,
      setWallet: this.setWallet.bind(this)
    };

    return <SimpleApp screenProps={props}/>;
  }
}
