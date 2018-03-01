# Credit Carma

My solution to a coding test.

## Setup

### Compatibility

* node 9.6.1
* npm 5.6.0
* body-parser 1.0.0
* cookie-parser 1.0.1
* debug 0.7.4
* ejs 0.8.5
* express 4.0.0
* knex 0.14.4
* morgan 1.0.0
* pg 7.4.1
* static-favicon 1.0.0
* bcrypt 1.0.3
* chai 4.1.2"
* chai-http 3.0.0"
* mocha 5.0.1

### Install packages

```
cd credit-carma/server
npm install
```

### Run server

```
npm start
```

Now visit `http://localhost:3000` in a browser of your choice.

### Run tests

```
npm test
```

## Reasoning

**Luhn Algorithm**

The version I chose to implement was found after researching the algorithm itself, and after working out an implementation of my own
I stumbled on the one I ended up using due to its status as the best performing implementation.
Original code is here: https://gist.github.com/ShirtlessKirk/2134376.

**Encryption**

I have chosen to use bcrypt, reinforced by a salt, because this is a proven technology that secures many web applications I have
seen and developed in the past, and also secures the Linux operating system.
The salt prevents brute-forcing attacks to a certain extend, but since they are stored in the same table as the encrypted strings,
any exploitation of the database itself negates this security layer.

**Styling**

I chose not to concern myself with the look of the application, in favor of writing tests.
I believe tests will give a better example of my work, and styling is something any developer can find a solution for.
Besides that I am not a designer, and have no eye for design, so I would prefer to get a design delivered to me by someone who does/is.

### Future

* Write a more comprehensive test suite, and from there on develop test-driven (tests first).
* Move the code into a proper MVC structure.
* Allow the end-user a choice whether or not to store credit card details for future payments.
* Implement a proper CSS framework, or at the very least develop a better looking app with in-house CSS styles.
