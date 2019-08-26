import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logout } from '../store/actions/authAction'

import Information from '../components/DesignHome/Information'

class Home extends React.Component{

   render() {
      if(!this.props.auth.isAuthenticated) {
         return <Redirect to='/login' />
      }

      let { name, email } = this.props.auth.user
      return (
         <div id="minHeight">
            <div className="container text-center">
               {
                  this.props.auth.message && 
                  <div className="alert alert-success alert-dismissible" role="alert">
                     <strong>{this.props.auth.message} !!</strong>
                     <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                     </button>
                  </div>
               }
               <div className="py-5 my-5">
                  <h1 className=""> Welcome <strong  className="text-success">{ name }</strong></h1>
                  <p className=""> Your Eamil is : <strong  className="text-success">{ email }</strong></p>
                  <div className="text-light d-inline">
                     <p className="lead bg-dark d-inline p-2 px-4"><em>we provide the best money managment app for you</em></p>
                  </div>
               </div>
            </div>
            <Information />
         </div>
      )
   }
}

const mapStateToProps = state => ({
   auth: state.auth
})

export default connect(mapStateToProps, { logout })(Home)