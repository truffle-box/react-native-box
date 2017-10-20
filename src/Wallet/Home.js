import React from 'react';
import getWeb3 from '../utils/getWeb3'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Web3 from 'web3';
import { StackNavigator } from 'react-navigation';

export default class Home extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Wallet',
  }
  render() {
    return (
        <View>
        <Text>Hello wallet</Text>
        <Button
          onPress={() => this.props.navigation.navigate('Create')}
          title="Create wallet" />
        <Button
          onPress={() => this.props.navigation.navigate('Import')}
          title="Import wallet" />
        </View>
    );
  }
}
