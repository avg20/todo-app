## TodoApp [![Build Status](https://travis-ci.org/avg20/todo-app.svg?branch=master)](https://travis-ci.org/avg20/todo-app)

This app allow user to create new account, login with username and password and have it's own task list.

User can add, edit, delete tasks.

Also sorting and filtering functions available.

User can add priority and due date for each task, if task is overdue, user will be notified and task will be marked as "overdue".

You can test app with this link. [https://vast-garden-11249.herokuapp.com/](https://vast-garden-11249.herokuapp.com/)

## Usage

__Install the dependencies:__

`npm install`

__Config App:__

`
export PORT=3000
export DB_HOST='mongodb://localhost:27017'
`


__Test:__

`npm run test`

`npm run lint`

__Development mode:__

`npm run watch`

__When you are done, create a production ready version of the JS bundle:__

`npm run build`

__To run just server:__

`npm run run-server`

__Open App__

[http://localhost:3000/](http://localhost:3000/)