# customer-feedback-service
User(application owner) can use this service to send emails to customers. User will need to deposit some credit to use this service.

# To run the project
- `clone`
- `npm install`
- `npm run dev`

## Tech Stack: NodeJS, React, Redux, Heroku, MongoDB, Google OAuth, Express
### other packages: concurrently, cookie-session, mongoose, nodemon, passport, passport-google-oath20
## The client folder is the front end. Outside the folder is the back end.

## `npm run build` will take care of `dev` and `prod`
- we only need to worry about dev, so we can just use relative path
- when running build, all `href` will be replaced by production version automatically

### concurrently package
- with this code, the `npm run dev` can run both server and client
```
  "scripts": {
    "start": "node index.js",
    "server": "nodemon index.js",
    "client": "npm run start --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\""
  },
```

### Accessing MongoDB will always be async operation.
- Returns a Promise.

### [Error: listen EADDRINUSE](https://stackoverflow.com/a/30163868/8328220)
- You should try killing the process that is listening on the port.
  1. To see the PID of the process what is using this port.
      - `lsof -i tcp:<portNumber>`
        - for example: `lsof -i tcp:5000`
  2. then kill the process
      - `kill -15 PID`
        - for example: `kill -15 57385`

### express-session vs. cookie session
- express-session stores things outside cookie.
  - so we can store as much info as we want.
  - but it has compatibility requirement need to be set up.
- cookie-session stores things inside cookie.
  - has a limit of 4kb.

### AJAX pattern
- copy paste following code in a modern browser console that supports `fetch`
- `res` means `request` object which is a `Promise`
```
function fetchInfo() {
  fetch('https://rallycoding.herokuapp.com/api/music_albums')
    .then(res => res.json())
    .then(json => console.log(json));
}

fetchInfo();
```
- fetch() returns a Promise
- .then(res => res.json()) will call the Promise.json() if the Promise is successfully resolved
  - .json() also returns a Promise
- .then(json => console.log(json)) will call console.log() if the Promise is resolved
