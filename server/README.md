# RedRiver Server.

This is an ASP.Net Core 2 api implementation for the RedRiver chat app. 

The system itself is designed from a client/server architectural perspective, and the client and server are designed to run separately. The client is *not* served from the ASP.NET server and must therefore be run separately. See the [README.md in the client folder](https://github.com/jimmybengtsson/grupp03-redriver/blob/master/client/README.md) for instructions on how to run the client. 

## Installation(Windows)

In a development environment, the Windows version of the server will attempt to use a local SQL Server Express database and prepopulate this with a number of users. (If the development environment is set to Production the live database will instead be used.)

+ Make sure that [ASP.NET Core 2.0](https://www.microsoft.com/net/download) is installed.
+ Clone or download the repo and use the console to go to the server\RedRiverChatServer folder.
+ Type dotnet run

## Installation(Linux/Mac OsX)

Unlike on Windows, on Linux and Mac OsX there is no SQL Server Express database on which to run the system locally. This means that the server can only be run against the live database. To do so, the server must be started with ASPNETCORE_ENVIRONMENT set to Production.

+ Make sure that [ASP.NET Core 2.0](https://www.microsoft.com/net/download) is installed.
+ Clone or download the repo and use the console to go to the server\RedRiverChatServer folder.
+ Go to Properties/lauchSettings.json and change RedRiverChatServer.environmentVariables.ASPNETCORE_ENVIRONMENT to Production.
+ Save launchSettings.json.
+ Type dotnet run

## Running

The server has only api routes which are utilized by the client. It has no routes at its root. Accessing this will return a 404. However, one route is available for testing purposes:

/api/routetest/tryunprotectedroute

This route should return 200 Ok.

For other available api routes, see the [api documentation.](https://documenter.getpostman.com/view/1600195/redriverserver-api-documentation-v21/RW86L9vn)

## Hosting
During this project we have used Microsoft Azure for hosting client, server and database. Continuous integration to Azure has worked well and we recommend its use also in a full production environment.  

![Azure Screen Shot](https://github.com/jimmybengtsson/grupp03-redriver/blob/master/documentation/img/wiki/AzureScreenShot.PNG)

Our code runs as a Azure web app (found under app services).

![Azure Server Screen Shot](https://github.com/jimmybengtsson/grupp03-redriver/blob/master/documentation/img/wiki/azure-server.PNG)

## CORS

The server code has its on CORS allowing requests from certain sources. It is important that these are prioritized over the CORS settings which Azure tries to add through its own settings. Make sure that NO CORS settings are added to the Azure CORS settings for the web app, as shown in the picture below. 

![Azure Screen Shot](https://github.com/jimmybengtsson/grupp03-redriver/blob/master/documentation/img/wiki/azure-cors.PNG)
