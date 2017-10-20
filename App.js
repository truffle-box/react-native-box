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
  render() {
    return <SimpleApp />;
  }
}

//AppRegistry.registerComponent('SimpleApp', () => SimpleApp);

