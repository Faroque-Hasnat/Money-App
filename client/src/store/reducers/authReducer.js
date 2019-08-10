import * as Types from '../actions/types'

const init = {
   isAuthentication: false,
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
      default: return state
   }
}

export default authReducer