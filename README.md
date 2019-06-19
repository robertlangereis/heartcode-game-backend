# Heartcode Server
*NOTE: this game (and game logic) is still in development*
This is a server for playing the multiplayer card game "Heartcode", created by Edwin Hoenselaar & Robert Langereis. 

It has these endpoints:

* `POST /users`: sign up as new user
* `POST /logins`: log in and receive a JWT
* `POST /games`: create a new game
* `POST /games/:id/players`: join an existing game
* `PATCH /games/:id`: update an existing game
* `GET /games`: list all games
* `GET /users`: list all users

## Running

* You need a working Postgres database that is preferrably empty (drop all the tables) and running 
* Install the dependencies using `npm install`
* Compile the app (Typescript > Javascript) using `npm compile` (during development you can use `npm watch`)
* `npm run dev`
