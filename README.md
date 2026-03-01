# WTWR (What to Wear?): Back End Server

This repository contains the back end server for WTWR (What To Wear?), a weather-based clothing recommendation application. The server provides a RESTful API and database integration to support secure user authentication, management of clothing items, and associated user data for the WTWR system.

## Features

- RESTful API structure.
- User registration and authentication support.
- Endpoints for managing clothing items and user profiles.
- Database persistence using MongoDB.

## Technologies Used

The following technologies and techniques are used in this project:

- Node.js – JavaScript runtime for building the server.
- Express.js – Web framework for defining API routes.
- MongoDB – NoSQL database for data storage.
- Mongoose – ODM for modeling MongoDB data.
- ESLint & Prettier – Code quality and formatting tools.
- Postman (or similar) – API testing tool.

## API Endpoints (Example)

### Users

- POST /users – Create a new user.
- GET /users – Get a list of users

### Clothing Items

- GET /items – Get all clothing items.
- POST /items – Create a new clothing item.
- DELETE /items/:id – Delete a clothing item.

## Project Pitch Videos

Check out these videos, where I describe my project and some challenges I faced while building it:

- [WTWR - Stage 1](https://drive.google.com/file/d/1TrAKqJ1UKmjSwRedUUrPjz7s14-r_1b2/view?usp=drive_link)
- [WTWR - Stage 2](https://drive.google.com/file/d/182JGjBaPg92-KmaTfzDQRnBlXpzoJdsQ/view?usp=drive_link)
- [WTWR - Final Stage](https://drive.google.com/file/d/1NQTyT2wZVbWZHY7J1iQyuaOXmnHbI4CT/view?usp=drive_link)

## Live Website

Visit the live application deployed with Google Cloud - Full stack version:
👉 https://www.wearright.jumpingcrab.com/

## Frontend

https://github.com/IyadShobaki/se_project_react
