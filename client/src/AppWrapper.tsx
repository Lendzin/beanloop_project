import React from 'react'

import App from './App'

import {Provider} from 'react-redux'
import store from './store'

export const AppWrapper = () =>  {
    return (
      <Provider store={store}>
    <App/>  
      </Provider>
    )
  }
