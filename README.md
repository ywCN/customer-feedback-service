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

# Common Mistakes
## forget exporting components
## forget putting {} in some importing situation
## forget putting mapStateToProps or mapDispatchToProps in connect()()
## typo

# On front-end we can use `Babel` and `Webpack` which enables more features. While on back-end we can only use `CommonJS` module.
## An example is we use `require` in back-end and use `import` in front-end.

## Tech Stack: Node.js(tool), React(tool), Redux(state management), Heroku(deployment), MongoDB(data storage), Google OAuth(authentication), Express.js(build server), Stripe(for accepting payment)
### other packages: concurrently(run both backend and frontend), cookie-session, mongoose(communication with mongoDB), nodemon, passport(middleware), passport-google-oath20, materialize-css(style), axios(make AJAX request), redux-thunk(handles async request by using function), stripe(payments), body-parser(middleware that helps parsing Express reques)
## The client folder is the front end. Outside the folder is the back end.
- index.js is the data layer control(Redux)
- App.js renders layer control
## For full-stack project, only work on one side at a time.
## `Webpack` is a module loader. It concatenate files.

## `npm run build` will take care of `dev` and `prod`
- we only need to worry about dev, so we can just use relative path
- when running build, all `href` will be replaced by production version automatically

## git fetch -prune
- removes deleted branches that are still displaying in VSCode.

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

## <a> vs <Link>
- <a> is normally used for login or any situation that we need to navigate user to a completely different HTML document.
- <Link> is normally for let user navigate **insider** our application.
  - <Link> tells React Router to update some of the components.

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

## [mapStateToProps](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)
- It means map some pieces of state from the one centralized state of Redux to the current component's props.
```
function mapStateToProps(state) {
  return { foo: state.a, bar: state.b };
}
```
- can be shortened with ES6 syntax sugar
```
function mapStateToProps({ a, b }) {
  return { a, b };
}
```
- `mapStateToProps(state, [ownProps]): stateProps`: If this argument is specified, the new component will subscribe to Redux store updates. This means that any time the store is updated, `mapStateToProps` will be called. The results of `mapStateToProps` must be a plain object, which will be merged into the component’s props. If you don't want to subscribe to store updates, pass `null` or `undefined` in place of `mapStateToProps`. 
