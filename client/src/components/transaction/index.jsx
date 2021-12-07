import React, { Component } from 'react';
import NavBar from '../NavBar';
import TransactionComponent from './transactionComponent';
import { setup } from '../../setup';

class Index extends Component {
    state = {  web3: null, accounts: [], contract: null, transactions: [] }

    componentDidMount = async () => {
        const { web3, accounts, instance } = await setup();
        this.setState({ web3, accounts, contract: instance });
        instance.getPastEvents('allEvents',{
            fromBlock: 0,
            toBlock: 'latest'
        }, (error, events) => { 
          
          if(error)alert("An unknown error occured");
            this.setState({transactions: events});
        });
      };
    
    render() { 
        if (!this.state.web3) {
            return (
              <div>
                <div className="loading">Loading&#8230;</div>
              </div>
            );
          }
      const { transactions, accounts } = this.state;
        return ( 
            <React.Fragment> 
                 <NavBar home={false}/>
                 <br/><br/><br/>
                 <h2>Transactions</h2>
                 <div className="list-group container">
                     {transactions.map(event => (
                       <TransactionComponent key={transactions.indexOf(event)} user={accounts[0]} event={event}/>
                     ))}
                 </div>
            </React.Fragment>
         );
    }
}
 
export default Index;