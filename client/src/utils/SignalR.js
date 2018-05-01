import {AzureServerUrl} from './Config'
import { HubConnection } from '@aspnet/signalr'

const chatServerUrl = AzureServerUrl + '/chat'

let connection

export const createSignalR = (token) => {
  connection = new HubConnection(chatServerUrl + '?token=' + token)
  return connection
}

export const initChat = (connection) => {
  return connection.start({ withCredentials: true })
}

export const createChatGroup = (connection, groupName) => {
  return connection.start({ withCredentials: true })
    .then((response) => {
      console.log(response)
      connection.invoke('joinGroup', groupName)
    })
}

export const addUserToChat = (connection, name, group) => {
  return connection.on('userAddedToGroup', (name, group) => {
    // Code here
  })
}
