import './shim';
import getWeb3 from './src/utils/getWeb3';
import React from 'react';
import SimpleApp from './src/SimpleApp';
import {
  AppRegistry,
  Text,
} from 'react-native';
import { createStore } from 'redux';
import reducer from './src/reducers';
import { Provider } from 'react-redux'

const store = createStore(reducer);

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const web3 = getWeb3();

    store.dispatch({ type: 'SET_WEB3', web3: web3 });
    
    web3.eth.getAccountsPromise().then((accounts) => {
      store.dispatch({ type: 'SET_ACCOUNT', account: accounts[0] })
    });
  }

  render() {
    return (
      <Provider store={store}>      
        <SimpleApp />
      </Provider>
    );
  }
}
