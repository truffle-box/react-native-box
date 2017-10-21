import React from 'react';
import getWeb3 from '../utils/getWeb3'
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Web3 from 'web3';
import { StackNavigator } from 'react-navigation';
import { List, ListItem, Button, Card } from 'react-native-elements';

export default class Send extends React.Component {
  constructor(props){
    super(props);
    this.send = this.send.bind(this);
  }

  send() {
    const { web3, account } = this.props.screenProps;
  }

  render() {
    return (
      <View>
      <Card title="Send transaction">
        <TextInput
          style={{height: 40}}
          placeholder="Recipient"
          onChangeText={(value) => this.setState({recipient: value})}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Amount"
          onChangeText={(value) => this.setState({amount: value})}
        />
        <Button
          onPress={this.send}
          title="Send" />

      </Card>
        </View>
    );
  }
}
