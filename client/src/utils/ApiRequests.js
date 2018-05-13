import {AzureServerUrl, LocalServerUrl} from './Config'
import axios from 'axios/index'

const localOrAzureUrl = AzureServerUrl

export const verifyJWT = (token) => {
  return axios({
    method: 'get',
    url: localOrAzureUrl + '/api/user/getuserinfo',
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
    url: localOrAzureUrl + '/api/account/login',
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
    url: localOrAzureUrl + '/api/account/register',
    data: JSON.stringify(tempObj),
    headers: {'Content-Type': 'application/json'}
  })
}

export const getFriends = (token) => {
  return axios({
    method: 'get',
    url: localOrAzureUrl + '/api/user/getfriends',
    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}
  })
}

export const addFriend = (data, token) => {
  let tempObj = {
    username: data
  }

  return axios({
    method: 'post',
    url: localOrAzureUrl + '/api/user/addfriend',
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
    url: localOrAzureUrl + '/api/user/deletefriend',
    data: JSON.stringify(tempObj),
    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}
  })
}

export const uploadProfilePicture = (data, token) => {
  return axios({
    method: 'post',
    url: localOrAzureUrl + '/api/user/uploadimage',
    data: data,
    headers: {'Content-Type': 'multipart/form-data', 'Authorization': 'Bearer ' + token}
  })
}

export const getGroups = (token) => {
  return axios({
    method: 'get',
    url: localOrAzureUrl + '/api/user/groups',
    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}
  })
}

export const getGroupInfo = (token, ) => {
  return axios({
    method: 'get',
    url: localOrAzureUrl + '/api/user/groups',
    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}
  })
}

export const getChatMessages = (token, group) => {
  let tempObj = {
    GroupName: group
  }
  return axios({
    method: 'post',
    url: localOrAzureUrl + '/api/user/grouplogs',
    data: JSON.stringify(tempObj),
    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}
  })
}
