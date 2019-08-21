import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { register } from '../store/actions/authAction'

class Register extends React.Component{
   state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
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
      let { name, email, password, confirmPassword } = this.state
      this.props.register({name, email, password, confirmPassword}, this.props.history)
   }

   render() {
      let { name, email, password, confirmPassword, error } = this.state

      return (
         <div className="mt-3">
            <div className="row">
               <div className="text-center my-3 col-12">
                  <h2 className="display-4">Register Form</h2>
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
                        <label htmlFor="name" className="lead">Name : </label>
                        <input 
                           type="text" 
                           name="name" 
                           vlaue={name}
                           onChange={this.changeHandler}
                           placeholder="Enter Your Name "
                           className="form-control"
                           required
                        />
                     </div>
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
                           className={error.password ? "form-control is-invalid" : "form-control"}
                           required
                        />
                        { error.password && <div className="invalid-feedback">
                              {error.password}
                           </div>
                        }
                     </div>
                     <div className="form-group">
                        <label htmlFor="confirmPassword" className="lead">Confirm Password : </label>
                        <input 
                           type="password" 
                           name="confirmPassword" 
                           vlaue={confirmPassword}
                           onChange={this.changeHandler}
                           placeholder="Enter Confirm Password "
                           className={error.confirmPassword ? "form-control is-invalid" : "form-control"}
                           required
                        />
                        { error.confirmPassword && <div className="invalid-feedback">
                              {error.confirmPassword}
                           </div>
                        }
                     </div>
                     <Link to="/login">Already Have An Account? Login Here...</Link>
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

export default connect(mapStateToProps, {register})(Register)