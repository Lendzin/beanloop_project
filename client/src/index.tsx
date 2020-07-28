import React from 'react'
import ReactDOM from 'react-dom'
import {AppWrapper} from './AppWrapper'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<AppWrapper />, document.getElementById('root'))

serviceWorker.unregister()
