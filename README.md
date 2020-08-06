# test-dennis-kingston

## Overview
This project contains a basic API for managing documents.


## Testing
You must have [Node.js](https://nodejs.org/) installed. With an npm version >= 5.0 (for `package-lock.json` usage).

To run the project:

* Clone the repo
* Install dependencies: `npm install`
* Create database: `source .testenv && npx sequelize db:create`
* Run migrations: `source .testenv && npx sequelize db:migrate`
* Start server: `source .testenv && npm start`
