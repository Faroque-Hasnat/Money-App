import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../store/actions/authAction'

class Navbar extends React.Component{
   render() {
      
      return(
         <div className="bg-dark text-light mt-3 py-3">
            <div className="container text-center">
               <p className="lead mt-1 d-inline">Copyright 2019 &copy; <span className="text-info">Faroque Hasnat</span></p>
            </div>
         </div>
      )
   }
}

const mapStateToProps = state => ({
   auth: state.auth
})

export default connect(mapStateToProps, { logout })(withRouter(Navbar))