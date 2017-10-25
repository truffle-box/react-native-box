import React from 'react';
import Wallet from './Wallet';
import { connect } from 'react-redux'
import store from '../store';
import { truncateAddress } from '../utils/helpers';
import { getAccounts, getBalance, setAccount, getTransactionCount, getTransactions } from '../actions';

class WalletContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getAccounts();

        if (this.props.address) {
            this.props.getBalance(this.props.address);
            this.props.getTransactionCount(this.props.address);
            this.props.getTransactions(this.props.address);            
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.address != this.props.address) {
            console.log("Loading wallet data: " + nextProps.address);
            this.props.getBalance(nextProps.address);
            this.props.getTransactionCount(nextProps.address);
            this.props.getTransactions(nextProps.address);
        }
    }

    onAccountSelectChange(option) {
        this.props.setAccount(option.key);
    }

    render() {
        const { 
            web3, navigation, address, balance, transactionCount, accountsList, 
            incomingTransactions, outgoingTransactions
        } = this.props;

        return (
            <Wallet
                web3={web3}
                navigation={navigation}
                address={address}
                balance={balance}
                transactionCount={transactionCount}
                accountsList={accountsList}
                incomingTransactions={incomingTransactions}
                outgoingTransactions={outgoingTransactions}
                onAccountSelectChange={(option) => this.onAccountSelectChange(option)}       
            />
        )
    }
}

const mapStateToProps = state => {
    const web3 = state.web3;
    
    return {
        web3: state.web3,
        address: state.account,
        accountsList: state.accounts.map((a) => ({ key: a, label: truncateAddress(a), })),
        balance: state.balances[state.account],
        transactionCount: state.transactionCounts[state.account] || 0,
        incomingTransactions: state.transactions.incoming.map(t => {
            t.valueInEther = web3.fromWei(t.value, 'ether');
            return t;
        }),
        outgoingTransactions: state.transactions.outgoing.map(t => {
            t.valueInEther = web3.fromWei(t.value, 'ether');
            return t;
        })
    }
}

export default connect(
    mapStateToProps,
    {
        getAccounts,
        getBalance,
        getTransactionCount,
        getTransactions,
        setAccount,
    }
)(WalletContainer);