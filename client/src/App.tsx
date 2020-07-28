import React, {Component} from 'react'
import {LoginPage} from './components/pages/LoginPage'
import {Dashboard} from './components/pages/dashboard/Dashboard'
import {DashboardListPage} from './components/pages/DashboardListPage'
import {Navbar} from './components/shared/Navbar'
import {Notification} from './components/shared/Notification'
import {Router, Route, Switch, Redirect} from 'react-router-dom'

import history from './utils/history'

import {connect} from 'react-redux'

import './App.css'

interface Props {
  isAuthenticated: boolean
}

const ProtectedRoute = ({isAuthenticated, ...props}: any) =>
  isAuthenticated ? <Route {...props} /> : <Redirect to='/' />

class App extends Component<Props> {
  render() {
    const {isAuthenticated} = this.props

    return (
      <div className='App'>
        <Router history={history}>
          {isAuthenticated && <Navbar />}

          <Notification />

          <Switch>
            <Route exact path='/' render={() => <LoginPage />} />
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              exact
              path='/manage'
              render={() => <DashboardListPage />}
            />
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              exact
              path='/dashboard'
              render={() => <Dashboard />}
            />
          </Switch>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.user.isAuthenticated,
})

export default connect(mapStateToProps)(App)
