import './shim';
import getWeb3 from './src/utils/getWeb3';
import React from 'react';
import SimpleApp from './src/SimpleApp';
import {
  AppRegistry,
  Text,
} from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store';
import { setWeb3, getAccount, getAccounts, getBalance, getTransactionCount } from './src/actions';

const web3 = getWeb3();

store.dispatch(setWeb3(web3));

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    store.dispatch(getAccount());
  }

  render() {
    return (
      <Provider store={store}>
        <SimpleApp />
      </Provider>
    );
  }
}
