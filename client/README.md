# RedRiver Client

This is an React implementation for the RedRiver chat app. 

The system itself is designed from a client/server architectural perspective, and the client and server are designed to run separately. See the [README.md in the server folder](https://github.com/jimmybengtsson/grupp03-redriver/blob/master/server/README.md) for instructions on how to run the server. 


## Installation

Make sure you have Node.js and NPM installed.

In this directory:

```
npm install
```

Start a development server and then open [http://localhost:3000](http://localhost:3000) to see the app: 

```
npm start
```

At last commit before merge to master or deployment, run this command to create a React build version that will be used for deployment.

```
npm run build
```


## Testing

To run the automated tests:

```
npm test
```


## Linting
[StandardJS](https://standardjs.com/) is used to check for linting errors and to fix them.

Run StandardJS to check for lint errors:

```
npm run lint
```

Fix lint errors:

```
npm run lint-fix
```

Check for lint errors in test-files:

```
npm run test-lint
```

Fix lint errors in test-files:

```
npm run test-lint-fix
```


## Hosting
During this project we have used Microsoft Azure for hosting client, server and database. Continuous integration to Azure has worked well and we recommend its use also in a full production environment.  

![Azure Screen Shot](https://github.com/jimmybengtsson/grupp03-redriver/blob/master/documentation/img/wiki/AzureScreenShot.PNG)

Our code runs as a Azure web app (found under app services).

![Azure Server Screen Shot](https://github.com/jimmybengtsson/grupp03-redriver/blob/master/documentation/img/wiki/azure-server.PNG)

### Azure Settings

Basic settings used for the client app on Azure are shown below.

![Azure Screen Shot](https://github.com/jimmybengtsson/grupp03-redriver/blob/master/documentation/img/wiki/azure-client-1.PNG)

![Azure Screen Shot](https://github.com/jimmybengtsson/grupp03-redriver/blob/master/documentation/img/wiki/azure-client-2.PNG)
