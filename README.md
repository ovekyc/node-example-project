# example-project
[wiki](https://github.com/ovekyc/node-example-project/wiki)

## Quick Start

    npm install
    npm run watch (development)
    npm start (production)
    npm test (test)

## Stack

    Node.js
    React (or React-Native)

* Language: [ES6](https://babeljs.io/docs/learn-es2015/)+
* Backend Framework: [Express](https://expressjs.com/)
* Frontend Framework: [React](https://facebook.github.io/react/)
* Mobile Framework: [React Native](https://facebook.github.io/react-native/)
* General Unit Test: [Tape](https://github.com/substack/tape)
* React Unit Test: [Jest](http://facebook.github.io/jest/) + [Enzyme](https://github.com/airbnb/enzyme)
* Test Coverage: [Istanbul](https://github.com/gotwarlost/istanbul)
* Code Style: [ESLint](http://eslint.org/)
* Build: [Gulp](http://gulpjs.com/) or [Webpack](https://webpack.github.io/)

###### Style Guides
[ES6](<https://github.com/airbnb/javascript>) / [React](<https://github.com/airbnb/javascript/tree/master/react>)

## Project structure

    config                  // configuration files. should be json format.
    dist*
    src
      ├─client
      │   ├-javascripts     // bundle.js
      │   ├-static          // static files to serve
      │   └─index.html      // client entry html
      ├─server
      │   ├-controllers     // controllers, core part to process requests
      │   ├-models          // data classes
      │   ├-services        // logic classes which are used in controllers
      │   ├-api-route.js    // backend api routes
      │   └─index.js        // backend main server
      ├─front               // client-view files
      │   ├-components
      │   ├-containers
      │   ├-utils           // helper classes
      │   └─routes.js       // main react-router
      └─test                // unit-test
    gulpfile.babel.js       // gulp(with babel) config file
    server.js               // entry js file
