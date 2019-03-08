import React, { Component, Fragment } from 'react'
import Alert from 'react-bootstrap/Alert'
import { Redirect } from 'react-router'
import JobForm from './JobForm'
import { viewJob, editJob } from '../api'
import messages from '../messages'

class JobEdit extends Component {
  constructor () {
    super()

    this.state = {
      status: '',
      message: null,
      shouldRedirect: false,
      redirectMessage: ''
    }
  }

  componentDidMount () {
    viewJob(this.props.match.params.id, this.props.user)
      .then(response => this.setState({
        Customer: response.data.job.Customer,
        Worker: response.data.job.Worker,
        Price: response.data.job.Price,
        Address: response.data.job.Address,
        Date: response.data.job.Date,
        status: response.data.job.status
      }))
      .catch(() => this.setState(
        { shouldRedirect: true, redirectMessage: 'Job not found' }
      ))
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { alert, history, user } = this.props

    editJob(this.props.match.params.id, this.state, user)
      .then(response => this.setState({ createdJobId: response.data.job.id }))
      .then(() => {
        alert(messages.updateJobSuccess, 'success')
      })
      .then(() => history.push('/jobs'))
      .catch(() => this.setState({ shouldRedirect: true }))
  }

  handleRadioButtons = event => {
    console.log(event.target.value)
    this.setState({
      status: event.target.value
    })
  }

  render () {
    const { handleChange, handleSubmit, handleRadioButtons } = this
    const { Customer, Worker, Price, Date, Address, message, shouldRedirect, redirectMessage, createdJobId } = this.state

    if (shouldRedirect) {
      return <Redirect to ={{
        pathname: '/jobs',
        state: { message: redirectMessage }
      }} />
    }

    if (createdJobId) {
      return <Redirect to={`/jobs/${createdJobId}`} />
    }

    return (
      <Fragment>
        { message && <Alert variant="danger">{message}</Alert> }
        <JobForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleRadioButtons={handleRadioButtons}
          job={{ Address, Customer, Worker, Price, Date, status }}
          CreateJobFormStatus={false}
        />
      </Fragment>
    )
  }
}

export default JobEdit
