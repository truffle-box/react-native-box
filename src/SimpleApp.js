import Main from './Main';
import Wallet from './Wallet';
import { TabNavigator } from 'react-navigation';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const SimpleAppNav = TabNavigator({
    Main: { screen: Main },
    Wallet: { screen: Wallet },
});

SimpleAppNav.propTypes = {
    screenProps: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    screenProps: {
        address: state.account,
        web3: state.web3,
        network: state.currentNetwork
    }
  }
}

const SimpleApp = connect(
    mapStateToProps,
    null
)(SimpleAppNav)

export default SimpleApp;
