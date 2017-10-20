import React from 'react';
import getWeb3 from '../utils/getWeb3'
import { Alert, StyleSheet, Text, View, TextInput } from 'react-native';
import Web3 from 'web3';
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

  componentWillMount() {
    let mnemonic = bip39.generateMnemonic();
    this.setState({ mnemonic });
  }

  createWallet() {
    let mnemonic = this.state.mnemonic;
    let hdwallet = hdKey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));
    let address_index = 0;
    let wallet_hdpath = "m/44'/60'/0'/0/";
    let wallet = hdwallet.derivePath(wallet_hdpath + address_index).getWallet();
    let address = `0x${wallet.getAddress().toString("hex")}`;

    this.props.screenProps.createWalletCB(wallet, address);
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


