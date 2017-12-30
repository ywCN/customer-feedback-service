# customer-feedback-service
User(application owner) can use this service to send emails to customers. User will need to deposit some credit to use this service.

## Tech Stack: NodeJS, React, Redux, Heroku, MongoDB, Google OAuth, Express

### Accessing MongoDB will always be async operation.
- Returns a Promise.

### [Error: listen EADDRINUSE](https://stackoverflow.com/a/30163868/8328220)
- You should try killing the process that is listening on the port.
- To see the PID of the process what is using this port.
    - `lsof -i tcp:<portNumber>`
        - for example: `lsof -i tcp:5000`
    - then kill the process
        - `kill -15 PID`
            - for example: `kill -15 57385`
