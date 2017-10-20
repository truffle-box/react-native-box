import React from 'react';
import getWeb3 from '../utils/getWeb3';
import { FlatList, StyleSheet, Text, View, TextInput } from 'react-native';
import { Button, Card } from 'react-native-elements';
import Web3 from 'web3';
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

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.
    getWeb3
      .then(results => {
        this.setState({
          web3: results.web3
        });
        this.instantiateAccountsWithBalances();
      })
      .catch(() => {
        console.log('Error finding web3.');
      });
  }

  async instantiateAccountsWithBalances () {
    const accounts = await this.state.web3.eth.getAccountsPromise();
    const balance = await this.state.web3.eth.getBalancePromise(accounts[0]);
    const transactions = await this.state.web3.eth.getTransactionCountPromise(accounts[0]);
    this.setState({
      accounts: accounts,
      account: accounts[0],
      balance: this.state.web3.fromWei(balance, 'ether'),
      transactions,
    });
  }

  async onChange(option) {
    const account = option.key;
    const balance = await this.state.web3.eth.getBalancePromise(account);
    const transactions = await this.state.web3.eth.getTransactionCountPromise(account)
    this.setState({
      account,
      balance: this.state.web3.fromWei(balance, 'ether'),
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
