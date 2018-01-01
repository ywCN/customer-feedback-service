# customer-feedback-service
User(application owner) can use this service to send emails to customers. User will need to deposit some credit to use this service.

# To run the project
- `git clone`
- `npm install`
- `npm run dev`

# To open diagrams for this project
- download zip of this [repo](https://github.com/StephenGrider/FullstackReactCode)
- open [draw.io](https://www.draw.io/)
- `File` -> `Open from` -> `Device`
- navigate to the unzipped folder and open `.xml` files in `diagrams` folder

# Do not forget exporting components!!!!

# On front-end we can use Babel and Webpack which enables more features. While on back-end we can only use CommonJS module.
- `require` vs. `import`

## Tech Stack: NodeJS, React, Redux, Heroku, MongoDB, Google OAuth, Express
### other packages: concurrently, cookie-session, mongoose, nodemon, passport, passport-google-oath20, materialize-css, axios, redux-thunk
## The client folder is the front end. Outside the folder is the back end.
- index.js is the data layer control(Redux)
- App.js renders layer control
## For full-stack project, only work on one side at a time.
## `Webpack` is a module loader. It concatenate files.

## `npm run build` will take care of `dev` and `prod`
- we only need to worry about dev, so we can just use relative path
- when running build, all `href` will be replaced by production version automatically

## [Redux Thunk](https://github.com/gaearon/redux-thunk#motivation)
- `Redux Thunk` gives user the full control of the `dispatch` function.
- User can decide the correct time to `dispatch` the `action`.
  - A common use case is that user wants to `dispatch` a **resolved** AJAX request.
- The code structure is normall returning a function.
```
const actionCreator1 = () => {
  return function(dispatch) {
    axios
      .get('/api/current_user')
      .then(res => dispatch({ type: FETCH_USER, payload: res }));
  };
};
```

## concurrently package
- with this code, the `npm run dev` can run both server and client
```
  "scripts": {
    "start": "node index.js",
    "server": "nodemon index.js",
    "client": "npm run start --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\""
  },
```

## Accessing MongoDB will always be async operation.
- Returns a Promise.

## [Error: listen EADDRINUSE](https://stackoverflow.com/a/30163868/8328220)
- You should try killing the process that is listening on the port.
  1. To see the PID of the process what is using this port.
      - `lsof -i tcp:<portNumber>`
        - for example: `lsof -i tcp:5000`
  2. then kill the process
      - `kill -15 PID`
        - for example: `kill -15 57385`

## express-session vs. cookie session
- express-session stores things outside cookie.
  - so we can store as much info as we want.
  - but it has compatibility requirement need to be set up.
- cookie-session stores things inside cookie.
  - has a limit of 4kb.

## AJAX pattern
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

## If a file is exporting a class component, we make first letter upper case.
