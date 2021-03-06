import {AzureServerUrl, LocalServerUrl} from './Config'
import { HubConnection } from '@aspnet/signalr'

const chatServerUrl = AzureServerUrl + '/chat'

export const createSignalR = (token) => {
  console.log('Connect to signalr')
  let tokenUrl = (chatServerUrl + '?token=' + token)
  let connection = new HubConnection(tokenUrl)
  return connection
}

export const initChat = (token) => {
  let tokenUrl = (chatServerUrl + '?token=' + token)
  let connection = new HubConnection(tokenUrl)

  let messages = []

  connection.on('send', data => {
    console.log(data)
    messages.push(data)
  })

  connection.on('messageSentToGroup', (group, senderName, message) => {
    messages.push('Group ' + group + ': ' + 'Sender: ' + senderName + ' Message: ' + message)
    console.log(message)
  })

  connection.on('addInfoMessageFromGroup', (group, message) => {
    messages.push('Group ' + group + ': ' + 'Message: ' + message)
    console.log(message)
  })

  connection.on('alterFriendStatus', (name, group, status) => {

  })

  connection.on('messageSentToSpecificUser', (name, message) => {
    messages.push(name + ':' + message)
    console.log(message)
  })

  connection.on('messageSentToAllConnectedUsers', (name, message) => {
    messages.push(name + ':' + message)
    console.log(message)
  })

  connection.on('userAddedToGroup', (name, group) => {
    messages.push(name + 'added to:' + group)
    console.log(name)
  })

  connection.on('userLeftGroup', (name, group) => {
    messages.push(name + 'left:' + group)
    console.log(name)
  })

  connection.on('videoCallRequest', (name) => {
    console.log(name)
  })

  connection.start()
    .catch((err) => {
      console.log(err)
    })

  return connection
}

export const createChatGroup = (groupName, connection) => {
  return connection.invoke('joinGroup', groupName)
}

export const addUserToChat = (connection, group, name) => {
  return connection.invoke('addClientToGroup', group, name)
}

export const deleteUserFromChat = (connection, group) => {
  return connection.invoke('leaveGroup', group)
}

export const createChatGroupWithUsers = (connection, names) => {
  console.log(names)
  return connection.invoke('startGroupChatWithMultipleClients', names)
}

export const sendMessageToGroup = (connection, group, message) => {
  return connection.invoke('sendMessageToGroup', group, message)
}

export const requestVideoCall = (connection, name) => {
  return connection.invoke('requestVideoCall', name)
}

export const endVideoCall = (connection, name) => {
  return connection.invoke('endVideoCall', name)
}

export const closeSignalR = (connection) => {
  return connection.stop()
    .catch((err) => {
      console.log(err)
    })
}
