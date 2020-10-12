# Weather-app

## Table of contents
* [Description](#Description)
* [Instructions](#Instructions)
* [Notes](#Notes)

## Description
React & Express weather app using OpenWeatherMap API & Firebase & SSE notification.
Here an example [HerokuWeatherAPP](https://test22224123.herokuapp.com/).

Server side exports a rest [API](apidoc/index.html).

## Instructions

First clone this repository.
```bash
$ git clone https://github.com/JRA-ZGZ/WeatherAPP.git
```

Install dependencies. Make sure you already have [`nodejs`](https://nodejs.org/en/) & [`npm`](https://www.npmjs.com/) installed in your system.
```bash
$ npm install 
```
Create a build.
```bash
$ npm run build 
```

Run it
```bash
$ npm run start 
```

## Notes
If you want to use firebase remember to config with your own credentials the [FirebaseClient](server/datasources/FirebaseClient.js) 
```bash
const firebaseConfig = {
  apiKey: "api-key",
  authDomain: "project-id.firebaseapp.com",
  databaseURL: "https://project-id.firebaseio.com",
  projectId: "project-id",
  storageBucket: "project-id.appspot.com",
  messagingSenderId: "sender-id",
  appID: "app-id",
};
```