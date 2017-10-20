import React from 'react';
import { FlatList, StyleSheet, Text, View, TextInput } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import ModalPicker from 'react-native-modal-picker'

export default class Home extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Wallet',
  }

  constructor() {
    super();
    this.state = {
      accounts: [],
      account: '',
      balance: 0,
    };
    this.onChange = this.onChange.bind(this);
  }

  async instantiateAccountsWithBalances () {
    const accounts = await this.props.screenProps.web3.eth.getAccountsPromise();
    const balance = await this.props.screenProps.web3.eth.getBalancePromise(accounts[0]);
    const transactions = await this.props.screenProps.web3.eth.getTransactionCountPromise(accounts[0]);
    this.setState({
      accounts: accounts,
      account: accounts[0],
      balance: this.props.screenProps.web3.fromWei(balance, 'ether'),
      transactions,
    });
    if (this.props.screenProps.setAccount) {
      this.props.screenProps.setAccount(accounts[0]);
    }
  }

  async onChange(option) {
    const account = option.key;
    if (this.props.screenProps.setAccount) {
      this.props.screenProps.setAccount(account);
    }
    const balance = await this.props.screenProps.web3.eth.getBalancePromise(account);
    const transactions = await this.props.screenProps.web3.eth.getTransactionCountPromise(account)
    this.setState({
      account,
      balance: this.props.screenProps.web3.fromWei(balance, 'ether'),
      transactions,
    });
  }

  render() {
    const data = this.state.accounts &&
          this.state.accounts.map((a) => ({ key: a, label: a, }));
    return (
      <View>
        <Card title="Wallet">
          <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold' }}>
            Balance
          </Text>
          <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: 'green'}}>
            {this.state.balance.toString()}
          </Text>
          <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
            Number of transactions
          </Text>
          <Text style={{ textAlign: 'center', fontSize: 15 }}>
            {this.state.transactions}
          </Text>
          <ModalPicker
            initValue={this.state.account}
            data={data}
      style={{height: 100, padding: 50}}
            onChange={this.onChange}
          />
        </Card>
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
