import React from 'react';
import { Alert, StyleSheet, Text, View, TextInput } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Button, Card, ListItem } from 'react-native-elements';

const hdKey = require('ethereumjs-wallet/hdkey');
const bip39 = require('bip39');

const MINIMUM_PASSWORD_LENGTH = 8;

export default class Create extends React.Component {

  constructor(props) {
    super(props);
    this.state = { mnemonic: '' }

    this.createWallet = this.createWallet.bind(this);
  }

  async componentWillMount() {
    let mnemonic = bip39.generateMnemonic();
    this.setState({mnemonic});
  }

  createWallet() {
    let mnemonic = this.state.mnemonic;
    this.props.screenProps.setWallet(mnemonic);
    this.props.navigation.navigate('Main');
  }

  render() {
    return (
      <View style={{ padding: 20}}>
        <Card title="Mnemonic Words">
          <Text style={{ fontWeight: 'bold', color: 'red', textAlign: 'center'}}>
            These 12 words are the only way to restore your accounts. Save them somewhere safe and secret.
          </Text>
          <Text style={{ padding: 20}}>{this.state.mnemonic}</Text>
        </Card>
        <Button
          onPress={this.createWallet}
          title="I've saved my words safely. Create wallet"
        />
      </View>
    );
  }
}
