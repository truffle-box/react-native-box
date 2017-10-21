import NetworkList from './NetworkList';
import { connect } from 'react-redux'
import { networks } from '../utils/config';
import getWeb3 from '../utils/getWeb3';

const mapStateToProps = state => {
  return {
    networks: networks,
    currentNetwork: state.currentNetwork
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onNetworkClick: (network) => {
      const web3 = getWeb3(null, network.url);
      
      dispatch({ type: 'SET_NETWORK', network: network});
      dispatch({ type: 'SET_WEB3', web3: web3});
    }
  }
}

const Network = connect(
    mapStateToProps,
    mapDispatchToProps
)(NetworkList)
  
export default Network; 