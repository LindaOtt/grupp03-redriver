import {AzureServerUrl, LocalServerUrl} from './Config'
import { HubConnection } from '@aspnet/signalr'

const chatServerUrl = AzureServerUrl + '/chat'

let connection

export const createSignalR = (token) => {
  console.log('Connect to signalr')
  let tokenUrl = (chatServerUrl + '?token=' + token)
  connection = new HubConnection(tokenUrl)
  return connection
}

export const initChat = (token) => {

  let tokenUrl = (chatServerUrl + '?token=' + token)
  connection = new HubConnection(tokenUrl)

  let messages = [];
  let key = 123;

  connection.on('send', data => {
    console.log(data);
    messages.push(data);
    key = Math.random();
  });

  connection.on('messageSentToGroup', (group,senderName,message) => {
    messages.push("Group "+group+": "+"Sender: "+senderName+" Message: "+message);
    key = Math.random();
  });

  connection.on('addInfoMessageFromGroup', (group, message) => {
    messages.push("Group "+group+": "+"Message: "+message);
    key = Math.random();
  });

  connection.on('alterFriendStatus', (name, group, status) => {
    messages.push(name + " in group:"+group+": "+"is now "+status);
    key = Math.random();
  });

  connection.on('messageSentToSpecificUser', (name, message) => {
    messages.push(name + ":"+ message);
    key = Math.random();
  });

  connection.on('messageSentToAllConnectedUsers', (name, message) => {
    messages.push(name + ":"+ message);
    key = Math.random();
  });


  connection.on('userAddedToGroup', (name, group) => {
    messages.push(name + "added to:"+ group);
    key = Math.random();
  });

  connection.on('userLeftGroup', (name, group) => {
    messages.push(name + "left:"+ group);
    key = Math.random();
  });



  connection.start()
    .then((response) => {
      console.log(response)
    })
    .catch((err) => {
      console.log(err)
    });
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
