import React from 'react';
import PropTypes from 'prop-types'
import { FlatList, StyleSheet, Text, ScrollView, TextInput } from 'react-native';
import { List, ListItem, Button, Card, ButtonGroup } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import ModalPicker from 'react-native-modal-picker'
import { truncateAddress } from '../utils/helpers';

const Wallet = ({ 
    web3,
    navigation,
    address, 
    balance,
    transactionCount, 
    accountsList,
    incomingTransactions,
    outgoingTransactions,
    onAccountSelectChange
}) => (
    <ScrollView>
        <Card title="Wallet">
            <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold' }}>
                Balance
            </Text>
            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: 'green'}}>
                {balance}
            </Text>
            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
                Number of transactions
            </Text>
            <Text style={{ textAlign: 'center', fontSize: 15 }}>
                {transactionCount}
            </Text>
            <ModalPicker
                initValue={truncateAddress(address)}
                data={accountsList}
                onChange={onAccountSelectChange}
            />
            <Button
                onPress={() => navigation.navigate("Create")}
                title="Create wallet" />
            <Button
                onPress={() => navigation.navigate("Import")}
                title="Import wallet" />
            <Button
                onPress={() => navigation.navigate("Send")}
                title="Send ether" />
        </Card>
        <Card title="In">
            <List>
                {incomingTransactions.map(t => (<ListItem key={t.hash} title={`${t.valueInEther} Ether`} subtitle={truncateAddress(t.from)} onPress={() => navigation.navigate('TransactionDetails', { transaction: t })}/>))}
            </List>
        </Card>
        <Card title="Out">
            <List>
                {outgoingTransactions.map(t => (<ListItem key={t.hash} title={`${t.valueInEther} Ether`} subtitle={truncateAddress(t.to)} onPress={() => navigation.navigate('TransactionDetails', { transaction: t })}/>))}
            </List>
        </Card>
  </ScrollView>
)

Wallet.propTypes = {
    address: PropTypes.string,
    balance: PropTypes.string
}

export default Wallet;