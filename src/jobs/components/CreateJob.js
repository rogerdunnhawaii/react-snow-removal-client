// code taken from Sign In

import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import CurrencyFormat from 'react-currency-format'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { createJob } from '../api'
import messages from '../messages'

class CreateJob extends Component {
  constructor () {
    super()

    this.state = {
      job: {
        Customer: '',
        Worker: '',
        Price: '',
        Address: '',
        Date: '',
        status: ''
      }
    }
  }

  handleRadioButtons = event => {
    this.setState({
      [status]: event.target.value
    })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onCreateJob = event => {
    event.preventDefault()
    console.log('event in onCreateJob', event)
    const { alert, history, user } = this.props

    createJob(this.state, user)
      .then(() => alert(messages.createJobSuccess, 'success'))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ Customer: '', Worker: '', Price: '', Address: '', DateTime: '', status: '' })
        alert(messages.createJobFailure, 'danger')
      })
  }

  render () {
    const { Customer, Worker, Price, datetime, Address } = this.state

    return (
      <Fragment>
        <form className='create-job' onSubmit={this.onCreateJob}>

          <h3> Create a new job</h3>
          <br />
          <label htmlFor="Customer">Customer Name:</label>
          <input
            type="text"
            name="job[Customer]"
            value={Customer}
            placeholder="Customer Name" onChange={this.handleChange}
            required
          />
          <br />
          <label htmlFor="Worker">Worker Name:</label>
          <input
            type="text"
            name="job[Worker]"
            value={Worker}
            placeholder="Worker Name"
            onChange={this.handleChange}
            required
          />
          <br />
          <label htmlFor="Price">Price:</label>
          <CurrencyFormat
            thousandSeparator={true}
            prefix={'$'}
            name="job[Price]"
            placeholder="Price of Job"
            required
            value={Price}
            maxLength = "10"
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="Address">Address:</label>
          <input
            type="text"
            name="job[Address]"
            value={Address}
            placeholder="Address"
            required
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="datetime">Date/Time:</label>
          <input
            type="datetime-local"
            min="2018-01-01"
            max="2021-12-31"
            name="job[Date]"
            value={datetime}
            onChange={this.handleChange}
            placeholder="Date and Time"
            required
          />
          <br />
          <fieldset>
            <Form.Group onChange={this.handleRadioButtons} as={Row} name="job[status]">
              <Form.Label as="legend" column sm={2}>
                Status
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  type="radio"
                  label="open"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios1"
                  value="open"
                />
                <Form.Check
                  type="radio"
                  label="closed"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios2"
                  value="closed"
                />
                <Form.Check
                  type="radio"
                  label="in-progress"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios3"
                  value="in-progress"
                />
              </Col>
            </Form.Group>
          </fieldset>
          <button type="submit">Create Job</button>
        </form>
      </Fragment>
    )
  }
}

export default withRouter(CreateJob)
