import React from 'react'
// import { Link, NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { addNewTransaction } from '../../store/actions/transActions'

class CreateTransaction extends React.Component{
   state = {
      amount: 0,
      type: '',
      note: ''
   }

   changeHandler = event => {
      this.setState({
         [event.target.name] : event.target.value
      })
   }

   submitHandler = event => {
      event.preventDefault()
      this.props.addNewTransaction(this.state)
      this.setState({
         amount: 0,
         type: '',
         note: ''
      })
   }
   
   render() {
      let { amount, type, note } = this.state

      return(
         <div className="">
            <div className="modal fade" id="exampleModal"aria-hidden="true">
               <div className="modal-dialog" role="document">
                  <div className="modal-content">
                     <div className="modal-header">
                     <h5 
                        className="modal-title" 
                        id="exampleModalLabel"
                     >Create New Trasaction
                     </h5>
                     <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                     </button>
                     </div>
                     <div className="modal-body">
                     <form onSubmit={this.submitHandler}>
                        <div className="form-group">
                           <label 
                              htmlFor="amount" 
                              className="col-form-label">Amount:
                           </label>
                           <input 
                              type="number" 
                              className="form-control" 
                              name="amount"
                              value={amount}
                              onChange={this.changeHandler}
                              required
                           />
                        </div>
                        <div className="form-group">
                           <label 
                              htmlFor="type" 
                              className="col-form-label">Amount:
                           </label>
                           <select 
                              className="form-control"
                              onChange={this.changeHandler}
                              name="type"
                              value={type}
                              required
                           >
                              <option value="">Select A Type...</option>
                              <option value="income">Income</option>
                              <option value="expense">Expense</option>
                           </select>
                        </div>
                        <div className="form-group">
                           <label htmlFor="note" className="col-form-label">Note :</label>
                           <textarea 
                              className="form-control" 
                              id="note" 
                              name="note" 
                              value={note}
                              onChange={this.changeHandler}
                              required
                           ></textarea>
                        </div>
                        <div className="modal-footer">
                           <button 
                              type="button" 
                              className="btn btn-secondary" 
                              data-dismiss="modal"
                           >Close</button>
                           <button 
                              type="submit" 
                              className="btn btn-primary"
                           >Submit</button>
                        </div>
                     </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

const mapStateToProps = state => ({
   auth: state.auth
})

export default connect(mapStateToProps, { addNewTransaction })(CreateTransaction)