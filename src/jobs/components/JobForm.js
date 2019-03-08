import React from 'react'
import CurrencyFormat from 'react-currency-format'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const JobForm = ({ handleRadioButtons, handleChange, handleSubmit, job, CreateJobFormStatus }) => (
  <form className='create-job' onSubmit={handleSubmit}>
    <label htmlFor="Address">Address:</label>
    <input
      type="text"
      name="Address"
      value={job.Address}
      placeholder="Address"
      required
      onChange={handleChange}
    />
    <br />
    <label htmlFor="Customer">Customer Name:</label>
    <input
      type="text"
      name="Customer"
      value={job.Customer}
      placeholder="Customer Name" onChange={handleChange}
      required
    />
    <br />
    <label htmlFor="Worker">Worker Name:</label>
    <input
      type="text"
      name="Worker"
      value={job.Worker}
      placeholder="Worker Name"
      onChange={handleChange}
      required
    />
    <br />
    <label htmlFor="Price">Price:</label>
    <CurrencyFormat
      thousandSeparator={true}
      prefix={'$'}
      name="Price"
      placeholder="Price of Job"
      required
      value={job.Price}
      maxLength = "10"
      onChange={handleChange}
    />
    <br />
    <label htmlFor="Date">Date:</label>
    <input
      type="string"
      min="2018-01-01"
      max="2021-12-31"
      name="Date"
      value={job.Date}
      onChange={handleChange}
      placeholder="Date and Time"
      required
    />
    <br />
    <fieldset>
      <Form.Group onChange={handleRadioButtons} as={Row} name="job.status">
        <Form.Label as="legend" column sm={2}>
          Status
        </Form.Label>
        <Col sm={10}>
          <Form.Check
            type="radio"
            label="open"
            name="status"
            id="formHorizontalRadios1"
            value="open"
          />
          <Form.Check
            type="radio"
            label="closed"
            name="status"
            id="formHorizontalRadios2"
            value="closed"
          />
          <Form.Check
            type="radio"
            label="in-progress"
            name="status"
            id="formHorizontalRadios3"
            value="in-progress"
          />
        </Col>
      </Form.Group>
    </fieldset>
    <button type="submit">{CreateJobFormStatus ? 'Create Job' : 'Update Job'}</button>
  </form>
)

export default JobForm
