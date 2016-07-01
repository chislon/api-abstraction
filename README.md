# api-abstraction server app 
A proof-of-concept hosting provider agnostic abstraction of the API end-points, where an end-user is able to access the LCBO API entering their own API key.

User becomes authenticated by Google login to this application.

To run this in a Docker container, check out https://github.com/chislon/api-abstraction-docker

## Supported API Endpoints 
* [LCBO API](https://lcboapi.com)

## Supported Authentication Methods 
* [Google OAuth](https://console.developers.google.com/apis/credentials), configure a web application Oauth client ID with Google+ API access enabled

## Known Limitations
* User authentication will expire after some time

## Instructions to Use
Originally written with Node 4.x

Create a file named 'default.json', modelled after the template provided of 'default.sample.json', containing:

* "clientId" from Google Developers Console, typically ends in ".apps.googleusercontent.com"
* "clientSecret" from Google Developers Console
* "callback" the full callback URL, such as http://127.0.0.1/callback
* "cookieSecret" a secret to encrypt session cookies with
* "key" LCBO API key

This file also dictates the API endpoints which are accessible. 

Run with 'npm start' or 'pm2 start process.json'

After the application is running, navigate to /auth/ to initiate the Google login, you will need to have your Google and LCBO API keys setup. 

## Caveats
* uses cookie session, not necessarily designed to scale horizontally
* missing SSL support
* Google may prompt for authentication may come up unexpectedly more than one time asking for offline access
* application sessions may not be in sync with Google authentication sessions
* the Google Oauth token shall expire after some time, default values are used for token expiry

## References
* Express Google OAuth referencing https://scotch.io/tutorials/easy-node-authentication-google
* Dockerizing Node application https://semaphoreci.com/community/tutorials/dockerizing-a-node-js-web-application

## Contributions
This is a practice application, so I don't really expect pull requests or contributions. Email is the best way to reach me, my first name at Gmail.  
