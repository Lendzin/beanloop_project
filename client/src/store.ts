import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import {loadState, saveState} from './utils/localStorage'
import throttle from 'lodash.throttle'

const persistedState = loadState()

const middlewares = [thunk]

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancers(applyMiddleware(...middlewares))
)

store.subscribe(
  throttle(() => {
    saveState(store.getState())

    const {isAuthenticated} = store.getState().user

    if (!isAuthenticated) {
      localStorage.removeItem('state')
    }
  }, 1000)
)

export default store
