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

const mapDispatchToProps = dispatch => {
  return {    
    setWallet: (mnemonic) => { 
        dispatch({ type: 'SET_WALLET', wallet: mnemonic })
    },
    setAccount: (account) => { 
        dispatch({ type: 'SET_ACCOUNT', account: account })    
    }
  }
}

const SimpleApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(SimpleAppNav)

export default SimpleApp;