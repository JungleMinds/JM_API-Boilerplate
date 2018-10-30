# JM API Node

[![CircleCI](https://circleci.com/gh/JungleMinds/JM_API-Boilerplate/tree/master.svg?style=shield&circle-token=296fc8427df847c138b554a24e0d06e8ece2d793)](https://circleci.com/gh/JungleMinds/JM_API-Boilerplate/tree/master)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-f3df49.svg?style=flat-square)](http://standardjs.com)
![Nodejs: version](https://img.shields.io/badge/node-%3E%3D8-brightgreen.svg?style=flat-square)
[![Blazing Fast](https://img.shields.io/badge/speed-blazing%20%F0%9F%94%A5-brightgreen.svg?style=flat-square)](https://twitter.com/acdlite/status/974390255393505280)

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
