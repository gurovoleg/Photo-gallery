import auth from './auth'
import remote from 'Components/Remote/reducers'
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  user: auth,
  remote
})

export default createRootReducer
