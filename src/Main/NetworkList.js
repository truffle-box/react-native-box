import React from 'react'
import PropTypes from 'prop-types'
import { Alert, StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import NetworkItem from './NetworkItem';

const NetworkList = ({ networks, currentNetwork, onNetworkClick }) => (
    <View>
        <Text>Choose Network!</Text>
        <Text>Selected Network ID: { currentNetwork.id }</Text>       
        <Text>Selected Network URL: { currentNetwork.url }</Text>         
        <List>
            {networks.map(t => (
                <ListItem 
                    key={t.id} 
                    title={t.name} 
                    onPress={() => onNetworkClick(t)}
                />)
            )}
        </List>         
    </View>
);

NetworkList.propTypes = {
    networks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired
        })
    ).isRequired,
    onNetworkClick: PropTypes.func.isRequired
}

export default NetworkList;