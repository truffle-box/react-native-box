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

const accounts = (state = [], action) => {
  switch (action.type) { 
    case 'SET_ACCOUNTS':
      return [...action.accounts];
    default:
      return state;
  }
}

const balances = (state = {}, action) => {
  switch (action.type) {
    case 'SET_BALANCE':
      const newState = { ...state };
      newState[action.address] = action.balance;
      return newState;      
    default:
      return state;
  }
}

const transactionCounts = (state = {}, action) => {
  switch (action.type) {
    case 'SET_TRANSACTION_COUNT':
      const newState = { ...state };
      newState[action.address] = action.transactionCount;
      return newState;  
    default:
      return state;
  }
}

const transactions = (state = { incoming: [], outgoing: [] }, action) => {
  switch (action.type) {
    case 'SET_INCOMING_TRANSACTIONS':
      return { ...state, incoming: [...action.transactions] }
    case 'SET_OUTGOING_TRANSACTIONS':
      return { ...state, outgoing: [...action.transactions] }    
    default:
      return  state;
  }
}

const reducer = combineReducers({
  currentNetwork: network,
  account: account,
  accounts: accounts,
  web3: web3,
  wallet: wallet,
  balances: balances,
  transactionCounts: transactionCounts,
  transactions: transactions
});
  
export default reducer;
