import store from './store';

export const setIncomingTransactions = (txnIn) => {
    return {
        type: 'SET_INCOMING_TRANSACTIONS',
        transactions: txnIn
    }
}

export const setOutgoingTransactions = (txnOut) => {
    return {
        type: 'SET_OUTGOING_TRANSACTIONS',
        transactions: txnOut
    }
}

export const setNetwork = (network) => {
    return (dispatch) => {       
        return dispatch({ type: 'SET_NETWORK', network: network});
    }
}

export const setWeb3 = (web3) => {
    return { type: 'SET_WEB3', web3: web3 }
}

export const getAccounts = () => {
    return (dispatch, getState) => {
      const web3 = getState().web3;
      return web3.eth.getAccountsPromise()
          .then(accounts => {
              dispatch(setAccounts(accounts));
              dispatch(setAccount(accounts[0]));
            });    
    }
}

export const getTransactionCount = (address) => {
    return (dispatch, getState) => {
        const web3 = getState().web3;       
        
        return web3.eth.getTransactionCountPromise(address)
            .then(transactionCount => dispatch(setTransactionCount(address, transactionCount.toString())))
    }
}

export const setAccounts = (accounts) => {
    return { 
        type: 'SET_ACCOUNTS', 
        accounts: accounts 
    };
}
export const setTransactionCount = (address, transactionCount) => {
    return { 
        type: 'SET_TRANSACTION_COUNT', 
        address: address,
        transactionCount: transactionCount
    };
}
  
export const getAccount = () => {
    return (dispatch, getState) => {
      const web3 = getState().web3;
      return web3.eth.getAccountsPromise()
        .then(accounts => {
            return dispatch(setAccount(accounts[0]))
        });        
    }
}

export const setAccount = (account) => {
    return (dispatch) => {
        return dispatch({ 
            type: 'SET_ACCOUNT', 
            account: account 
        });
    }
}

export const getBalance = (address) => {
    return (dispatch, getState) => {
        const web3 = getState().web3;   
        return web3.eth.getBalancePromise(address)
            .then(balance => {
                dispatch(setBalance(address, balance.toString()))
            });
    }
}

export const setBalance = (address, balance) => {
    return {
        type: 'SET_BALANCE',
        address: address,
        balance: balance
    }
}

export const getTransactions = (address) => {
    return (dispatch) => {
        return fetch(`https://ropsten.etherscan.io/api?module=account&action=txlist&address=${address}&sort=desc`)
            .then(transactionList => transactionList.json())
            .then(transactionList => {
                transactionList = transactionList.result;
                const txnIn = transactionList.filter(t => t.to === address);
                const txnOut = transactionList.filter(t => t.from === address);
                dispatch(setIncomingTransactions(txnIn));
                dispatch(setOutgoingTransactions(txnOut));
            });      
    }
}