import React from 'react';
import getWeb3 from '../utils/getWeb3'
import { Text, View, TextInput, Button, Modal } from 'react-native';
import Web3 from 'web3';
import { StackNavigator } from 'react-navigation';

export default class Import extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mnemonic: '',
      passwordPromptVisible: false
    };
  }

  onChangeTextMnemonic(text) {
    this.setState({mnemonic: text});
  }

  onPressImport() {
    // Import Wallet
    let mnemonic = this.state.mnemonic;
    this.props.screenProps.setWallet(mnemonic);

    // Navigate to Wallet screen
    this.props.navigation.navigate('Main');
  }

  render() {
    return (
        <View style={{padding: 20}}>
          <Text style={{fontWeight: 'bold'}}>Import Wallet</Text>
          <Text>Input your 12 word mnemonic:</Text>
          <TextInput
            multiline={true}
            numberOfLines={3}
            editable={true}
            value={this.state.mnemonic}
            onChangeText={this.onChangeTextMnemonic.bind(this)}
          />
          <Button
            onPress={this.onPressImport.bind(this)}
            title="Import"
          />
        </View>
    );
  }
}
