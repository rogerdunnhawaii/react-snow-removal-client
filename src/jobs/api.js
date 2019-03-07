import apiUrl from '../apiConfig'
import axios from 'axios'

export const createJob = (data, user) => {
  return axios({
    url: apiUrl + '/jobs',
    method: 'POST',
    headers: {
      Authorization: `Token token=${user.token}`
    },
    data: data
  })
}

export const viewJobs = (user) => {
  return axios({
    url: apiUrl + '/jobs',
    method: 'GET',
    headers: {
      Authorization: `Token token=${user.token}`
    }
  })
}

export const viewJob = (id, user) => {
  return axios({
    url: apiUrl + '/jobs/' + id,
    method: 'GET',
    headers: {
      Authorization: `Token token=${user.token}`
    }
  })
}

export const deleteJob = (id, user) => {
  return axios({
    url: apiUrl + '/jobs/' + id,
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${user.token}`
    }
  })
}

export const editJob = (id, data, user) => {
  return axios({
    url: apiUrl + '/jobs/' + id,
    method: 'PATCH',
    headers: {
      Authorization: `Token token=${user.token}`
    },
    data: data
  })
}
