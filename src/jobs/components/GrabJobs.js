import React, { Component, Fragment } from 'react'
// import axios from 'axios'
import { Link } from 'react-router-dom'
// import apiUrl from '../../apiConfig'
import { viewJobs } from '../api'

class Jobs extends Component {
  constructor (props) {
    super(props)
    this.state = {
      jobs: null
    }
  }

  componentDidMount () {
    const { user } = this.props

    viewJobs(user)
      .then(response => {
        console.log(response)
        this.setState({ jobs: response.data.jobs })
      })
  }

  render () {
    if (!this.state.jobs) {
      return <p>loading...</p>
    }

    return (
      <Fragment>
        <h3> Jobs:</h3>
        <Link onClick={this.props.toggleCreateJobForm} to="/job-create">Create a Job</Link>
        <ul>
          {this.state.jobs.map(job => (
            <div key={job.id} className="jumbotron mx-4">
              Address:
              <h2>
                <Link to={`/jobs/${job.id}`}>{job.Address}</Link>
              </h2>
              <li>Customer: {job.Customer}</li>
              <li>Worker: {job.Worker}</li>
              <li>Price: {job.Price}</li>
              <li>Date: {job.Date}</li>
              <li>Status: {job.status}</li>
            </div>
          ))}
        </ul>
      </Fragment>
    )
  }
}

export default Jobs
