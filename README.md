# JM API Node

[![CircleCI](https://circleci.com/gh/JungleMinds/JM_API-Boilerplate/tree/master.svg?style=shield&circle-token=296fc8427df847c138b554a24e0d06e8ece2d793)](https://circleci.com/gh/JungleMinds/JM_API-Boilerplate/tree/master)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-f3df49.svg)](http://standardjs.com)
![Nodejs: version](https://img.shields.io/badge/node-%3E%3D8-brightgreen.svg)
[![Blazing Fast](https://img.shields.io/badge/speed-blazing%20%F0%9F%94%A5-brightgreen.svg)](https://twitter.com/acdlite/status/974390255393505280)
[![dependencies Status](https://david-dm.org/JungleMinds/JM_API-Boilerplate/status.svg)](https://david-dm.org/JungleMinds/JM_API-Boilerplate)
[![devDependencies Status](https://david-dm.org/JungleMinds/JM_API-Boilerplate/dev-status.svg)](https://david-dm.org/JungleMinds/JM_API-Boilerplate?type=dev)
[![Maintainability](https://api.codeclimate.com/v1/badges/6650af2ec672c4005480/maintainability)](https://codeclimate.com/github/JungleMinds/JM_API-Boilerplate/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/6650af2ec672c4005480/test_coverage)](https://codeclimate.com/github/JungleMinds/JM_API-Boilerplate/test_coverage)

A boilerplate for web APIs using NodeJS

the boilerplate follows an architecture inspired by Domain Driven Design and Clean Architecture. It implies in some patterns and methodologies having to be followed to ensure separation of concerns and make the codebase more maintainable.

## Features

---

## Folder structure

This boilerplate uses a folder structure and logical architecture focused on separation of concerns based in Domain-driven design and Clean architecture. Instead of the classical controllers/models/services folders, we now have layers inside the src folder. Each of the folder layers is scoped by a namespace regarding the concern it is about (like user, errors, logging and so on):

### Application layer (app folder)

The application layer defines the actual behaviour of our application, thus being responsible for performing interactions among units of the domain layer.

### Domain layer (domain folder)

In this layer, we may define units which play the role of entities and business rules and have a direct relationship to our domain
This is the most isolated and important layer of our software, and it may be used by the application layer to define use cases.

### Infrastructure layer (infrastructure folder)

This is the lowest layer of all, and it’s the boundary to whatever is external to our application: the database, email services, etc.

### Input interfaces layer (interfaces folder)

This layer holds all the entry points of our application, such as controllers, websockets, etc.
It should not have any knowledge about business rules, use cases, persistence technologies, and not even about other kinds of logic!
It should only receive user input (like URL parameters), pass it on to the use case and finally return a response to the user.

    ├── app
    ├── config
    │   └── environments
    ├── domain
    ├── infrastructure
    │   └── logging
    └── interfaces
        └── http
            ├── controllers
            ├── errors
            ├── logging
            └── utils

## Prerequisites

#### Docker

Install [Docker](https://www.docker.com/) on your system.

- [Install instructions](https://docs.docker.com/installation/mac/) for Mac OS X
- [Install instructions](https://docs.docker.com/installation/ubuntulinux/) for Ubuntu Linux
- [Install instructions](https://docs.docker.com/installation/) for other platforms

#### Environment Variables

The initial (default) environment variables have been set for you in the `.env` file. If you need to have custom variables in your dev process you can use a `.env.local` file to override those. The application will use the following files in the following order to create a final set of variables:

1. `.env`
2. `.env.local`
3. `.env.<environment>`
4. `.env.<environment>.local`

A server (via docker container) will **ONLY** read the `.env` file, so server specific variables should either be passed along in the build command (`ENV_VAR=value <build command>`) or in the server configuration.

## Setup

1. Run `npm i`. It will install all dependencies.

2. Run `docker-compose build`. It will pull a base images from the Docker registry.

3. Run `docker-compose up`. This will bootstrap a new app in your container optionaly add optionaly `-d` Detached mode: Run containers in the background.

4. Run `docker-compose down` It will Stops containers and removes containers, networks, volumes, and images created by `up`.

The app should then be running on your docker daemon on the port you specified in your `.env` file (default: `4050`) or override (see Prerequisites > Environment Variables)

## Scripts

This boilerplate comes with a collection of npm scripts to make your life easier, you'll run them with `npm run <script name>`

`npm run start` run the application

`npm run start:watch` run the application in watch mood on every file change

`npm run test` run all unit tests for the appliction

`npm run test:watch` run all unit tests for the appliction in watch mood on every file change

`npm run test:coverage` Create a coverage report for your code and determine whether your coverage is high enough

`npm run lint` Run linting on the application codebase
