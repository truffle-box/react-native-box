import React from 'react'
import PropTypes from 'prop-types'
import { TouchableHighlight, Text } from 'react-native';

const NetworkItem = ({ id, name, item, onPress }) => (
    <TouchableHighlight onPress={() => onPress(item)}>
        <Text>{name}</Text>
    </TouchableHighlight>
);

NetworkItem.propTypes = {
    onPress: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
}

export default NetworkItem;