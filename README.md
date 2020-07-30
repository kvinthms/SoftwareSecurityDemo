# Intro

This project demonstrates how common software vulnerabilities can be exploited by XSS Attacks, SQL Injection, CSRF, and IDOR in order to breach security.
The master branch contains the secure version of the example site and the Vulnerable bracnh contains the insecure one.

### NOTE: 
These deployments are currently NOT live. A personal demo can be conducted by running the project on a local server by following the directions below. The Report section below highlights how to perform each attack and how they were mitigated.

# [Google Cloud Platform Deployment - Secure](https://minip1-272004.appspot.com/Home)

[Insecure Site](https://minip1-vulnerable-272103.appspot.com/home)  
[Insecure Site Repo](https://github.com/kvinthms/SoftwareSecurityDemo/tree/Vulnerable)  

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Started

Since this project will hold both the client application and the server application there will be node modules in two different places. First run `npm install` from the root. After this you will run `npm run-script install-all` from the root. From now on run this command anytime you want to install all modules again. This is a script 
have defined in package.json .

## File structure
#### `client` - Holds the client application
- #### `public` - This holds all of our static files
- #### `src`
    - #### `assets` - This folder holds assets such as images, docs, and fonts
    - #### `components` - This folder holds all of the different components that will make up our views
    - #### `views` - These represent a unique page on the website i.e. Home or About. These are still normal react components.
    - #### `App.js` - This is what renders all of our browser routes and different views
    - #### `index.js` - This is what renders the react app by rendering App.js, should not change
- #### `package.json` - Defines npm behaviors and packages for the client
#### `server` - Holds the server application
- #### `config` - This holds our configuration files, like mongoDB uri
- #### `controllers` - These hold all of the callback functions that each route will call
- #### `models` - This holds all of our data models
- #### `routes` - This holds all of our HTTP to URL path associations for each unique url
- #### `tests` - This holds all of our server tests that we have defined
- #### `server.js` - Defines npm behaviors and packages for the client
#### `package.json` - Defines npm behaviors like the scripts defined in the next section of the README
#### `.gitignore` - Tells git which files to ignore
#### `README` - This file!


## Available Scripts

In the project directory, you can run:

### `npm run-script dev`

Runs both the client app and the server app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.

### `npm run-script client`

Runs just the client app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.


### `npm run-script server`

Runs just the server in development mode.<br>


### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

If deploying to heroku this does not need to be run since it is handled by the heroku-postbuild script<br>

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

# Report

There are four types of vulnerabilities in the insecure version of the site. How to initiate each exploit and how they were mitigated is as follows:

### XSS
To initiate this exploit, a payload such as ```<a onclick=alert(1)>xxs link</a>``` is inserted in the comment field or javascript:alert(1) in the link field when adding a comment to a flower. This allows the abuser to run javascript code, like an alert when regular users click the comment or link. The exploit in the comment field is mitigated by not using innerHTML, which allows React’s built in XSS protection to sanitize the input. The link field is checked to make sure it is a valid link and the input is sanitized, ensuring both fields of a comment don’t allow XSS.

### IDOR
This exploit allows a regular user to access the full list of the site’s usernames which would otherwise only be accessible by the site’s admin user. To initiate this exploit from the dashboard, replace /dashboard in the url to /admin (ex: http://localhost:3000/admin ). This attack was mitigated by adding a check in the admin dashboard page to see if the user is actually an admin.

### CSRF
This exploit allows a user to falsify their session and pretend to be another user. This allows them to add sightings and comments as a username they do not have access to. To initiate this exploit, change the locally saved token to the desired username. This attack was mitigated by creating a JSON web token that has a header, payload/body, and signature section. The payload has user information and expiration date. The signature section is a HMACSHA256 hash of the header, payload and a secret key. This makes it extremely hard for a regular user to replicate the token without the secret key.

### SQL Injection
This exploit allows for a regular user searching for a flower to inject SQL to display the full list of users. To initiate this exploit, inject the SQL code to the search bar in Flower Search (ex: ```Lovage" UNION SELECT password FROM Users; -- ```). This attack was mitigated by using prepared statements for SQL queries to the database which sanitizes all user inputs as a string, preventing malicious SQL execution.

## Credits

This project made in conjunction with: Mustafa Mohamed, Pedro Sicilia, and Nicholas Tateo
