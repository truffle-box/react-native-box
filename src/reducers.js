import { combineReducers } from 'redux';
import { networks } from './utils/config';

const network = (state = networks[1], action) => {
    switch (action.type) {
      case 'SET_NETWORK':
        return { ...action.network };
      default:
        return state
    }
}

const account = (state = null, action) => {
  switch (action.type) {
    case 'SET_ACCOUNT':
      return action.account;
    default:
      return state;
  }
}

const web3 = (state = null, action) => {
  switch (action.type) {
    case 'SET_WEB3':
      return action.web3;
    default:
      return state;
  }
}

const wallet = (state = null, action) => {
  switch (action.type) {
    case 'SET_WALLET':
      return action.wallet;
    default:
      return state;
  }
}

const reducer = combineReducers({
  currentNetwork: network,
  account: account,
  web3: web3,
  wallet: wallet
});
  
export default reducer;
