import * as Types from '../actions/types'

const init = {
   isAuthenticated: false,
   user: {},
   error: {}
}

const authReducer = (state=init, action) => {
   switch(action.type) {
      case Types.USER_ERROR: {
         return {
            ...state,
            error: action.payload.error
         }
      }
      case Types.SET_USER: {
         return {
            message: action.payload.message,
            isAuthenticated: Object.keys(action.payload.user).length !== 0,
            user: action.payload.user,
            error: {}
         }
      }
      default: return state
   }
}

export default authReducer






