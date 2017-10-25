import NetworkList from './NetworkList';
import { connect } from 'react-redux'
import { networks } from '../utils/config';
import { getAccounts, setNetwork, networkChanged } from '../actions';

const mapStateToProps = state => {
  return {
    networks: networks,
    currentNetwork: state.currentNetwork
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onNetworkClick: (network) => {
      dispatch(setNetwork(network));
    }
  }
}

const Network = connect(
    mapStateToProps,
    mapDispatchToProps
)(NetworkList)
  
export default Network; 