# Customizeable Personal Portfolio
This is a customizeable portfolio program built with Angular-Node-PostgreSQL. Currently this app only allows for the customization of the portfolio's project section. 

![Screenshot 2023-11-16 11 05 38 AM](https://github.com/shamiguel/hackathon/assets/146030630/1fdd2abb-d4ba-4710-bdaa-b2a080d0a77a)

![Screenshot 2023-11-29 9 10 33 AM](https://github.com/shamiguel/hackathon/assets/146030630/ed2605c5-d581-4f79-9794-e8113399746f)

## Project BreakDown 
### Root
Holds the dependencies for the server, the server.js file itself, and the server directory under "app" and the client directory under "client"
### app 
The backend for the project which utilizes Node, Express, PG + Sequelize 
### client 
The frontend for the project which utilizes Angular and Material UI 


## Setup 
To get this project running be sure to fork and clone it. Once set up on your editor of choice: 
1. Run ```bash npm run build```
2. Log into psql and create your database, be sure to configure the db.config.js file under app/config to match your local postgres information.
3. To start ```bash npm run start```

### Resources 
List of resources and tutorials I used to aid in the production of this app:
- [User Authentication with JWT and Postgres](https://www.bezkoder.com/node-js-jwt-authentication-postgresql/)
- [Enablig CORS Client and Server Side](https://www.stackhawk.com/blog/angular-cors-guide-examples-and-how-to-enable-it/)
- [Setting up Postgres with Node](https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql/)
- [Scroll Into View Example](https://stackblitz.com/edit/scrolling-types-5kwd8v?embed=1&file=src/app/app.component.html)
- [Responsive Navbar](https://codepen.io/iarman/pen/GRJEwqP)
