import React from 'react';
import getWeb3 from '../utils/getWeb3'
import { StyleSheet, Text, ScrollView, TextInput, Clipboard, Alert } from 'react-native';
import Web3 from 'web3';
import { StackNavigator } from 'react-navigation';
import { List, ListItem, Button, Card } from 'react-native-elements';

export default class Import extends React.Component {
  render() {
    const { transaction } = this.props.navigation.state.params;
    const { web3 } = this.props.screenProps;
    const timestamp = new Date(parseInt(transaction.timeStamp) * 1000);
    return (
        <ScrollView>
        <Card title="Transaction detail">
        <List>
        <ListItem hideChevron={true} onLongPress={ () => { Clipboard.setString(transaction.hash); Alert.alert('Copied to clipboard'); } } title="Transaction hash" subtitle={transaction.hash}/>
        </List>
        <ListItem hideChevron={true} title="Gas used" subtitle={transaction.gasUsed}/>
        <ListItem hideChevron={true} onLongPress={ () => { Clipboard.setString(transaction.from); Alert.alert('Copied to clipboard'); } } title="From" subtitle={transaction.from}/>
        <ListItem hideChevron={true} onLongPress={ () => { Clipboard.setString(transaction.to); Alert.alert('Copied to clipboard'); } } title="To" subtitle={transaction.to}/>
        <ListItem hideChevron={true} title="Block number" subtitle={transaction.blockNumber}/>
        <ListItem hideChevron={true} onLongPress={ () => { Clipboard.setString(transaction.blockHash); Alert.alert('Copied to clipboard'); } } title="Block hash" subtitle={transaction.blockHash}/>
        <ListItem hideChevron={true} title="Timestamp" subtitle={timestamp.toUTCString()}/>
        <ListItem hideChevron={true} title="Value" subtitle={web3.fromWei(transaction.value, 'ether')}/>
        </Card>
        </ScrollView>
    );
  }
}
