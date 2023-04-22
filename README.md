# NoSql Social Network API

[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Questions](#questions)
- [License](#license)

## Description

An API for managing users, their thoughts and reactions to those thoughts.

This API is a Node.js/Express.js app conncted to MongoDB via the Mongoose ODM.

## Usage

A video demonstrating the use of this application can be found [here](https://drive.google.com/file/d/1dzS4FDuPwBbf_AkolhX72wzf6ej9kvG0/view).

This application requires that you have MongoDB installed. Follow the instructions at https://www.mongodb.com/docs/manual/installation/ for your operating system.

Node.js is also required and can be installed at https://nodejs.org/en/download.

The application is started via the command-line with `npm start`. This will seed the database with dummy data for testing, as well as run the server. If you don't want data seeded, change the start script in package.json to read `node index.js`.

As there is no front-end for this application, to interact with it, you will need to use a tool like [Postman](https://www.postman.com/downloads/) or [Insomnia](https://insomnia.rest/download) to send HTTP requests.

By default, in the development environment, the API will run at `http://localhost:3001/`. The endpoints are:

- `/api/users`
- `/api/users/:userId/friends/:friendId`
- `/api/thoughts`
- `/api/thoughts/:thoughtId/reactions`

  <p align="center">
  <img src="https://github.com/craigrobertsdev/social-network-api/blob/main/assets/images/screenshot.jpg">
  </p>

## Contributing

To contribute, fork the repo and submit a pull request.

## Questions

View my other projects at [https://github.com/craigrobertsdev/](https://github.com/craigrobertsdev/).

If you would lke to contact me, I can be reached at [craig.roberts11@outlook.com](mailto:craig.roberts11@outlook.com).

## License

This project is licensed under the MIT license. See [here](https://opensource.org/licenses/MIT) for more info.
