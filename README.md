# E-Commerce Backend (Object-Relational Mapping)
![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)


## Description 
This project is the creation of the back end for an e-commerce site. This application used Express.js API and Sequelize to interact with a MySQL database. This application displays creation of database using mySQL with models and associations. Then demonstrates the API Routes to perform RESTful CRUD operations displayed in my walk through videos.


## Prerequisites
The user should clone the repository from GitHub. This application requires [MySQL2](https://www.npmjs.com/package/mysql2) and [Sequelize](https://www.npmjs.com/package/sequelize) packages to connect your Express.js API to a MySQL database and the [dotenv](https://www.npmjs.com/package/dotenv) package to use environment variables to store sensitive data. 

An API client such as Insomnia Core is needed to run this backend-based application. Insomnia Core can be installed from [this link](https://insomnia.rest/).


## Installation
Clone this repository. 
Repository Link: 

Install node.js and in the terminal run `npm i` to install `express`, `mysql2`, `dotenv`, and `sequelize` packages in the format of this example: `npm i express` for each package. Create a database using the `schema.sql` file.

In the terminal, run `mysql -u root -p < db/schema.sql`. Then enter your MySQL password. Then run `npm run seed` to populate the database with the provided sample data.


## Deployment/Demo
MySQL walkthrough: [Screencastify]()<br>
API routes walkthrough: [Screencastify]())<br>
Insomnia Core walkthrough: [Screencastify]()


## Built With
- Javascript
- MySQL


## Authors
- Cherry Lam 
    - [GitHub](https://github.com/c1am)
    - [Email](mailto:cherrylam.ny@gmail.com)