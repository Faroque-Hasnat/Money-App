import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../store/actions/authAction'

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

   static getDerivedStateFromProps(nextProps, prevState) {
      if(JSON.stringify(nextProps.auth.error) !== JSON.stringify(prevState.error)) {
        return{
          error: nextProps.auth.error,
        }
      }
      return null
    }

   submitHandler = (event) => {
      event.preventDefault()
      let { email, password } = this.state
      this.props.login({ email, password }, this.props.history)
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
               {
                  error.message && 
                  <div className="alert alert-danger alert-dismissible" role="alert">
                     {error.message}
                  </div>
               }
                  <form onSubmit={this.submitHandler}>
                     <div className="form-group">
                        <label htmlFor="email" className="lead">Email : </label>
                        <input 
                           type="email" 
                           name="email" 
                           vlaue={email}
                           onChange={this.changeHandler}
                           placeholder="Enter Your Email "
                           className={error.email ? "form-control is-invalid" : "form-control"}
                           required
                        />
                        { error.email && <div className="invalid-feedback">
                              {error.email}
                           </div>
                        }
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

const mapStateToProps = state => ({
   auth: state.auth
})

export default connect(mapStateToProps, { login })(Login)