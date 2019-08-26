import React from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../store/actions/authAction'

class Navbar extends React.Component{
   render() {
      
      return(
         <div>
            <div className="">
               <nav  className="navbar navbar-expand-lg navbar-dark bg-dark py-3 mb-2">
                  <div className="container">
                     <Link to="/">
                        <span className="navbar-brand">Money App</span>
                     </Link>
                     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                     </button>
                     <div className="collapse navbar-collapse ml-3" id="navbarText">
                        <ul className="navbar-nav mr-auto">
                           {
                              this.props.auth.isAuthenticated ? 
                              <React.Fragment>
                                 <li className="nav-item active">
                                    <NavLink to="/" activeClassName="active" exact>
                                       <span className="nav-link">Home</span>
                                    </NavLink>
                                 </li>
                                 <li className="nav-item">
                                    <NavLink to="/dashboard" activeClassName="active" >
                                       <span className="nav-link">Dashboard</span>
                                    </NavLink>
                                 </li>
                              </React.Fragment> : 
                              <React.Fragment>
                                 <li className="nav-item active">
                                    <NavLink to="/login" activeClassName="active">
                                       <span className="nav-link">Login</span>
                                    </NavLink>
                                 </li>
                                 <li className="nav-item">
                                    <NavLink to="/register" activeClassName="active">
                                       <span className="nav-link">Register</span>
                                    </NavLink>
                                 </li>
                              </React.Fragment>
                           }
                        </ul>
                        
                        <React.Fragment>
                           {
                              this.props.auth.isAuthenticated ? 
                              <button 
                                 className="btn btn-outline-danger"
                                 onClick={() => this.props.logout(this.props.history)}
                              > Logout </button> : null
                           }
                        </React.Fragment>
                     </div>
                  </div>
               </nav>
            </div>
         </div>
      )
   }
}

const mapStateToProps = state => ({
   auth: state.auth
})

export default connect(mapStateToProps, { logout })(withRouter(Navbar))