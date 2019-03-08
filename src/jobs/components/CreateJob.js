// code taken from Sign In

import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import JobForm from './JobForm'
import { createJob } from '../api'
import messages from '../messages'

class CreateJob extends Component {
  constructor () {
    super()

    this.state = {
      Customer: '',
      Worker: '',
      Price: '',
      Address: '',
      Date: '',
      status: '',
      shouldRedirect: false
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleRadioButtons = event => {
    console.log(event.target.value)
    this.setState({
      status: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { alert, history, user } = this.props

    createJob(this.state, user)
      .then(response => this.setState({ createdJobId: response.data.job.id }))
      .then(() => {
        alert(messages.createJobSuccess, 'success')
      })
      .then(() => history.push(`/jobs/${this.state.createdJobId}`))
      .catch(error => {
        console.error(error)
        this.setState({ Customer: '', Worker: '', Price: '', Address: '', DateTime: '', status: '' })
        alert(messages.createJobFailure, 'danger')
      })
  }

  render () {
    const { Customer, Worker, Price, Date, Address } = this.state

    const { handleChange, handleSubmit, handleRadioButtons } = this

    // if (shouldRedirect) {
    //   return <Redirect to ={{
    //     pathname: '/jobs/',
    //     state: { message: redirectMessage }
    //   }} />
    // }

    return (
      <Fragment>
        <h3> Create a new job</h3>
        <Link to="/jobs">Back to all Jobs</Link>
        <br />

        <JobForm handleChange={handleChange} handleSubmit={handleSubmit} handleRadioButtons={handleRadioButtons} job={{ Address, Customer, Worker, Price, Date, status }} CreateJobFormStatus={true} />
      </Fragment>
    )
  }
}

export default withRouter(CreateJob)
