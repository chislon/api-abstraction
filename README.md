# api-abstraction server app 
A proof-of-concept hosting provider agnostic abstraction of the API end-points, where an end-user is able to access the LCBO API without entering their own API keys after being authenticated via their Google accounts. 

To run this in a Docker container, check out https://github.com/chislon/api-abstraction-docker

Originally written for Node 4.x

## Supported API Endpoints 
* [LCBO API](https://lcboapi.com)

## Supported Authentication Methods 
* [Google OAuth](https://console.developers.google.com/apis/credentials), configure a web application Oauth client ID with Google+ API access enabled

## Configuration File
The configuration file 'default.json' shall contain: 
* "clientId" from Google Developers Console, typically ends in ".apps.googleusercontent.com"
* "clientSecret" from Google Developers Console
* "callback" the full callback URL, should point to /callback/ for the application, such as http://127.0.0.1/callback if running on localhost port 80
* "cookieSecret" a secret to encrypt session cookies with
* "key" LCBO API key

This file also dictates the API endpoints which are accessible to access from LCBO API using a list. 

## Instructions

1. Build the project with 'npm install'

1. Create the file named 'default.json', modelled after the template provided in 'default.sample.json', saving it into the 'config' folder. 

1. Run with 'npm start', or 'pm2 start process.json' for a production based environment. The port number can be specified with the node environment variable PORT, also set in 'process.json'. 

1. After the application is running, navigate to /login/ to initiate the Google login, you will need to have your Google and LCBO API keys setup. 

1. Navigate to /api/products or other configured endpoints

1. Navigate to /logout when done to logout

## Caveats
* uses cookie session, data persistence layer not implemented
* missing SSL support
* Google may prompt for authentication may come up unexpectedly to ask for offline access when logging in again

## References
* Express Google OAuth implementation https://scotch.io/tutorials/easy-node-authentication-google
* Dockerizing Node application https://semaphoreci.com/community/tutorials/dockerizing-a-node-js-web-application

## Contributions
This is a practice application, so I don't really expect pull requests or contributions. Email is the best way to reach me, my first name at Gmail.  
