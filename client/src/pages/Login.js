import React from 'react'
import { Link } from 'react-router-dom'

class Login extends React.Component{
   state = {
      email: '',
      password: '',
      error: {}
   }

   changeHandler = (event) => {
      this.setState({
         [event.target.name] : event.target.value
      })
   }

   render() {
      let { email, password, error } = this.state

      return (
         <div className="mt-3">
            <div className="row">
               <div className="text-center my-3 col-12">
                  <h2 className="display-4">Login Form</h2>
               </div>
            </div>
            <div className="row">
               <div className="col-md-6 offset-md-3">
                  <form>
                     <div className="form-group">
                        <label htmlFor="email" className="lead">Email : </label>
                        <input 
                           type="email" 
                           name="email" 
                           vlaue={email}
                           onChange={this.changeHandler}
                           placeholder="Enter Your Email "
                           className="form-control"
                           required
                        />
                     </div>
                     <div className="form-group">
                        <label htmlFor="password" className="lead">Password : </label>
                        <input 
                           type="password" 
                           name="password" 
                           vlaue={password}
                           onChange={this.changeHandler}
                           placeholder="Enter Your Password "
                           className="form-control"
                           required
                        />
                     </div>
                     <Link to="/register">Don't Have Any Account? Register Here...</Link>
                     <button className="btn btn-primary mt-2 d-block"> Submit </button>
                  </form>
               </div>
            </div>
         </div>
      )
   }
}

export default Login