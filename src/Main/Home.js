import React from 'react';
import SimpleStorageContract from '../../build/contracts/SimpleStorage.json';
import { ActivityIndicator, FlatList, StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements'

const contract = require('truffle-contract');
const simpleStorage = contract(SimpleStorageContract);

export default class Home extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Home',
  };
  constructor() {
    super();

    this.state = {
      storageValue: 0,
      pendingStorageValue: 0,
      accounts: [],
      simpleStorageInstance: null
    };

    this.updateStorageValue = this.updateStorageValue.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props && props.screenProps && props.screenProps.web3) {
      this.setState({
        storageValue: 0,
        pendingStorageValue: 0,
        simpleStorageInstance: null
      });

      this.instantiateContract(props.screenProps.web3);
    }
  }

  async instantiateContract(web3) {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */
    simpleStorage.setProvider(web3.currentProvider);

    // Declaring this for later so we can chain functions on SimpleStorage.
    let simpleStorageInstance;

    try {
      simpleStorageInstance = await simpleStorage.at('0x01dc2837360d57fe3b596d98e0ef56dbb945690c');
      let storageValue = await simpleStorageInstance.get.call();
      this.setState({ simpleStorageInstance, storageValue: storageValue.toString(10) });
    } catch(error) {
      console.log(error);
    }
  }

  async updateStorageValue() {
    this.setState({ loading: true });
    let { simpleStorageInstance, pendingStorageValue} = this.state;
    let { address } = this.props.screenProps;
    let storageValue = await simpleStorageInstance.get.call({from: address});
    this.setState({ storageValue: storageValue.c[0] });  

    await simpleStorageInstance.set(pendingStorageValue, {from: address});
    storageValue = await simpleStorageInstance.get.call({from: address});

    // Update state with the result.
    this.setState({ storageValue: storageValue.c[0], loading: false });  
  }

  render() {
    return (
      <ScrollView>
        <Card>
          <Text>Your Truffle Box is installed and ready.</Text>  
        </Card>
        <Card title="Simple storage">
          <Text>The stored value is: {this.state.storageValue}</Text>
          <Text>Current Address: {this.props.screenProps.address}</Text>
        </Card>
        <Card>
          <TextInput
          style={{height: 40}}
          placeholder="Enter the new storage value!"
          onChangeText={(value) => this.setState({pendingStorageValue: value})}
        />
        {
          this.state.loading ?
            (<ActivityIndicator
             animating = {this.state.loading}
             style = {styles.activityIndicator}/>) :
            (<Button
            onPress={this.updateStorageValue}
            title="Update Storage Value"
            accessibilityLabel="Update the storage value!"
            />)
        }
        </Card>
        <Card>
          <Text>Current network: {this.props.screenProps.network.name}</Text>
          <Text>URL: {this.props.screenProps.network.url}</Text>
          <Button
            onPress={() => this.props.navigation.navigate('Network')}
            title="Choose Network"
            /> 
        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40
  }
});
