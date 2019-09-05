import React from 'react'
import { connect } from 'react-redux'
import CreateTransaction from '../components/Transaction.js/CreateTransaction';
import { loadTransactions, deleteTransaction } from '../store/actions/transActions'

class Dashboard extends React.Component{

   componentDidMount() {
      this.props.loadTransactions()
   }

   cahngHandler = event => {
      this.setState({
         [event.target.name] : event.target.value
      })
   }
   
   render() {
      if(!this.props.auth.isAuthenticated) {
         return <Redirect to='/login' />
      }

      let { balance, transactions } = this.props.transaction

      return (
         <div className="container" id="minHeight">
            {
               this.props.transaction.message && 
               <div className="alert alert-warning alert-dismissible text-center" role="alert">
                  <strong>{this.props.transaction.message} !!</strong>
                  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                     <span aria-hidden="true">&times;</span>
                  </button>
               </div>
            }
            <div className="row border-bottom pb-2">
               <div className="col-md-6">
                  <h3 className=""> Your Balance : <strong className={ balance >= 0 ? "text-success" : "text-danger" }>{balance} TK</strong> </h3>
               </div>
               <div className="col-md-6 text-right">
                  <button 
                     className="btn btn-primary mt-1 mt-md-0" 
                     data-toggle="modal" 
                     data-target="#exampleModal" 
                  > Create New Transaction </button>
               </div>
            </div>

            {/* Modal goes here */}
               <CreateTransaction />
            {/* Modal end here */}

            <div className="row mt-2">

               {
                  this.props.transaction.transactions.length > 0 ? 
                  <table className="table">
                     <thead className="thead-dark">
                        <tr>
                           <th >Amount</th>
                           <th >Type</th>
                           <th >Time</th>
                           <th >Note</th>
                           <th className="text-right pr-4">Actions</th>
                        </tr>
                     </thead>
                     <tbody className="">

                        {
                           transactions.map(transaction => (
                              <tr key={transaction._id}>
                                 <td> { transaction.amount } </td>
                                 <td> { transaction.type } </td>
                                 <td> { transaction.updatedAt } </td>
                                 <td> { transaction.note } </td>
                                 <td className="text-right">
                                    <button 
                                       className="btn btn-danger ml-2  mt-1  mt-lg-0"
                                       onClick={ () => this.props.deleteTransaction(transaction._id) }
                                    >Delete</button>
                                 </td>
                              </tr>
                           ))
                        }

                     </tbody>
                  </table>   : 
                  <div className="col">
                     <div className="text-center p-5">
                        <p className="lead text-danger">There is No Transaction....</p>
                     </div>
                  </div>
               }
               
            </div>
         </div>
      )
   }
}

const mapStateToProps = state => ({
   auth: state.auth,
   transaction: state.transaction
})

export default connect(mapStateToProps, { loadTransactions, deleteTransaction })(Dashboard)
