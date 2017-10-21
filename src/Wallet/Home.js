import React from 'react';
import { FlatList, StyleSheet, Text, ScrollView, TextInput } from 'react-native';
import { List, ListItem, Button, Card, ButtonGroup } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import ModalPicker from 'react-native-modal-picker'

function truncateAddress(address) {
  return `${address.substring(0, 10)}...${address.substring(address.length-4)}`;
}

export default class Home extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Wallet',
  }

  initialState = {
    accounts: [],
    account: '',
    balance: 0,
    hasInstantiated: false,
    txnIn: [],
    txnOut: [],
    transactions: 0
  };

  constructor() {
    super();
    this.state = {...this.initialState};
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(props) {    
    if (props && props.screenProps && props.screenProps.web3) {
      this.setState({
        balance: 0,
        hasInstantiated: false,
        txnIn: [],
        txnOut: [],
        transactions: 0
      });
      this.instantiateAccountsWithBalances(props.screenProps.web3);
    }
  }

  async instantiateAccountsWithBalances (web3) {
    if (this.state.hasInstantiated) {
      return;
    }

    const accounts = await web3.eth.getAccountsPromise();
    const balance = await web3.eth.getBalancePromise(accounts[0]);
    const transactions = await web3.eth.getTransactionCountPromise(accounts[0]);
    let transactionList;
    let txnIn;
    let txnOut;
    try {
      transactionList = await fetch(`https://ropsten.etherscan.io/api?module=account&action=txlist&address=${accounts[0]}&sort=desc`);
      transactionList = await transactionList.json();
      transactionList = transactionList.result;
      txnIn = transactionList.filter(t => t.to === accounts[0]);
      txnOut = transactionList.filter(t => t.from === accounts[0]);
    } catch(e) {
      console.log('ERROR: ', e);
    }
    this.setState({
      accounts: accounts,
      account: accounts[0],
      balance: web3.fromWei(balance, 'ether'),
      transactions,
      hasInstantiated: true,
      txnIn,
      txnOut,
    });
    if (this.props.setAccount) {
      this.props.setAccount(accounts[0]);
    }
  }

  async onChange(option) {
    const account = option.key;
    if (this.props.setAccount) {
      this.props.setAccount(account);
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
    const { web3 } = this.props.screenProps;
    const {txnIn, txnOut, accounts, account, balance, transactions} = this.state;
    const data = accounts &&
          accounts.map((a) => ({ key: a, label: truncateAddress(a), }));
    return (
      <ScrollView>
        <Card title="Wallet">
          <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold' }}>
            Balance
          </Text>
          <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: 'green'}}>
            {balance.toString()}
          </Text>
          <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
            Number of transactions
          </Text>
          <Text style={{ textAlign: 'center', fontSize: 15 }}>
            {transactions}
          </Text>
          <ModalPicker
            initValue={truncateAddress(account)}
            data={data}
            onChange={this.onChange}
        />
        <Button
      onPress={() => this.props.navigation.navigate('Create')}
      title="Create wallet" />
        <Button
      onPress={() => this.props.navigation.navigate('Import')}
      title="Import wallet" />
        <Button
      onPress={() => this.props.navigation.navigate('Send')}
      title="Send ether" />
        </Card>
        <Card title="In">
          <List>
            {txnIn.map(t => (<ListItem key={t.hash} title={`${web3.fromWei(t.value, 'ether')} Ether`} subtitle={truncateAddress(t.from)} onPress={() => this.props.navigation.navigate('TransactionDetails', { transaction: t })}/>))}
          </List>
        </Card>
        <Card title="Out">
          <List>
        {txnOut.map(t => (<ListItem key={t.hash} title={`${web3.fromWei(t.value, 'ether')} Ether`} subtitle={truncateAddress(t.to)} onPress={() => this.props.navigation.navigate('TransactionDetails', { transaction: t })}/>))}
          </List>
        </Card>
      </ScrollView>
    );
  }
}
