import {AzureServerUrl} from './Config'
import { HubConnection } from '@aspnet/signalr';

const chatServerUrl = AzureServerUrl + '/chat'

let connection;

export const initChat = (token) => {

  connection = new HubConnection(chatServerUrl + '?token=' + token)
  return connection.start()
}

export const createChatGroup = (groupName, token) => {

  connection = new HubConnection(chatServerUrl + '?token=' + token)
  return connection.start({ withCredentials: false })
    .then((response) => {
      console.log(response)
      connection.invoke("joinGroup", groupName)
    })

}

export const addUserToChat = (name, group, token) => {

  connection = new HubConnection(chatServerUrl + '?token=' + token)
  return connection.on('userAddedToGroup', (name, group) => {
    //Code here
  })
}
