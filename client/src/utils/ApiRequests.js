import {AzureServerUrl} from './Config'
import axios from 'axios/index'

export const verifyJWT = (token) => {
  return axios({
    method: 'get',
    url: AzureServerUrl + '/api/user/getuserinfo',
    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}
  })
}

export const userLogin = (data) => {
  let tempObj = {
    username: data.userName,
    password: data.password
  }

  return axios({
    method: 'post',
    url: AzureServerUrl + '/api/account/login',
    data: JSON.stringify(tempObj),
    headers: {'Content-Type': 'application/json'}
  })
}

export const userRegister = (data) => {
  let tempObj = {
    username: data.userName,
    firstName: data.firstName,
    surname: data.surname,
    email: data.email,
    password: data.password,
    streetAddress: data.streetAddress,
    postcode: data.zipCode,
    city: data.city,
    socialSecurity: data.socialSecurity,
    telephoneNumber: data.telephoneNumber
    /* relativeUsername: data.relativeUsername, */
  }

  return axios({
    method: 'post',
    url: AzureServerUrl + '/api/account/register',
    data: JSON.stringify(tempObj),
    headers: {'Content-Type': 'application/json'}
  })
}

export const getFriends = (token) => {
  return axios({
    method: 'get',
    url: AzureServerUrl + '/api/user/getfriends',
    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}
  })
}

export const addFriend = (data, token) => {
  let tempObj = {
    username: data
  }

  return axios({
    method: 'post',
    url: AzureServerUrl + '/api/user/addfriend',
    data: JSON.stringify(tempObj),
    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}
  })
}

export const deleteFriend = (data, token) => {
  let tempObj = {
    username: data
  }

  return axios({
    method: 'post',
    url: AzureServerUrl + '/api/user/deletefriend',
    data: JSON.stringify(tempObj),
    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}
  })
}