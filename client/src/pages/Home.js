import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logout } from '../store/actions/authAction'

class Home extends React.Component{

   render() {
      if(!this.props.auth.isAuthenticated) {
         return <Redirect to='/login' />
      }
      return (
         <div>
            {
               this.props.auth.message && 
               <div className="alert alert-success alert-dismissible" role="alert">
                  {this.props.auth.message} !!
                  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                     <span aria-hidden="true">&times;</span>
                  </button>
               </div>
            }
            <h2>Home from</h2>
            <button 
               className="btn btn-danger"
               onClick={() => this.props.logout(this.props.history)}
            > Logout </button>
         </div>
      )
   }
}

const mapStateToProps = state => ({
   auth: state.auth
})

export default connect(mapStateToProps, { logout })(Home)