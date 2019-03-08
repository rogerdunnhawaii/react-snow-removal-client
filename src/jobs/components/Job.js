import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { deleteJob, viewJob } from '../api'
import messages from '../messages'

class Job extends Component {
  constructor () {
    super()

    this.state = {
      Job: null,
      shouldRedirect: false,
      redirectMessage: 'Something went wrong'
    }
  }

  onDeleteJob = () => {
    const { alert, history } = this.props
    deleteJob(this.props.match.params.id, this.props.user)
      .then(() => alert(messages.deleteJobSuccess, 'success'))
      .then(() => history.push('/jobs'))
      .catch(() => this.setState({ shouldRedirect: true }))
  }

  componentDidMount () {
    const user = this.props.user
    const id = this.props.match.params.id
    viewJob(id, user)
      .then(response => this.setState({ job: response.data.job }))
      .catch(() => this.setState({ shouldRedirect: true }))
  }

  render () {
    const { job, shouldRedirect, redirectMessage } = this.state

    if (shouldRedirect) {
      return <Redirect to={{
        pathname: '/jobs',
        state: { message: redirectMessage }
      }} />
    }

    if (!job) {
      return <p>loading...</p>
    }

    const { Address, Customer, Worker, Price, Date, status } = job

    console.log('this.props', this.props)

    return (
      <article>
        <ul>
          <li>Address: {Address} </li>
          <li>Customer: {Customer}</li>
          <li>Worker: {Worker}</li>
          <li>Price: {Price}</li>
          <li>Date: {Date}</li>
          <li>Status: {status}</li>
        </ul>
        <button onClick={this.onDeleteJob}>Delete</button>
        <Link to={`/jobs/${this.props.match.params.id}/edit`}>
          <button>Edit</button>
        </Link>
      </article>
    )
  }
}

export default Job
