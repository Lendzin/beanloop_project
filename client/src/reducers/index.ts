import {combineReducers} from 'redux'
import userReducer from './userReducer'
import appReducer from './appReducer'
import dashboardReducer from './dashboardReducer'

export default combineReducers({
  user: userReducer,
  app: appReducer,
  dashboard: dashboardReducer,
})
