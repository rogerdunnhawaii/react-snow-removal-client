import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'

import CreateJob from './jobs/components/CreateJob'
import GrabJobs from './jobs/components/GrabJobs'
import UpdateJob from './jobs/components/UpdateJob'
import DeleteJob from './jobs/components/DeleteJob'

import Alert from 'react-bootstrap/Alert'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <Alert key={index} dismissible variant={alert.type}>
            <Alert.Heading>
              {alert.message}
            </Alert.Heading>
          </Alert>
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />

          <AuthenticatedRoute user={user} path='/jobs' render={() => (
            <CreateJob alert={this.alert} user={user} />
          )} />

          <AuthenticatedRoute user={user} path='/jobs' render={() => (
            <GrabJobs alert={this.alert} user={user} />
          )} />

          <AuthenticatedRoute user={user} path='/jobs/:id/edit' render={({ match }) => (
            <UpdateJob alert={this.alert} user={user} />
          )} />

          <AuthenticatedRoute user={user} path='/' render={() => (
            <DeleteJob alert={this.alert} user={user} />
          )} />
        </main>
      </React.Fragment>
    )
  }
}

export default App
