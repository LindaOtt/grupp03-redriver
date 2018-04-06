import { HubConnection } from '@aspnet/signalr';

const deployUrl = '';
const localUrl = 'http://localhost:5000/videochat';

const signalR = () => {

    return new HubConnection(localUrl + queryString);
};

export default signalR;