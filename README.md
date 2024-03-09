### Appointment Manager Backend

###### Tattoo Shop

<img style="border-radius:15px; padding:1px; width:100%;"  src="./src/img/tatooShop0.jpeg">

Thank you very much for your interest in my project. It's the fourth project with Geekshubs Academyof of the Full Stack Development Bootcamp 🚀.

<div>

[![GITHUB]][github-url][![DOCKER]][docker-url][![MYSQL]][MYSQL-url][![Node][Node.JS]][Node.JS-url][![Express][Express.js]][Express.js-url]<a href="https://www.typescriptlang.org/"><img src= "https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/></a>[![js]][js-url][![JWT]][JWT-url]

[JWT]: https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens
[JWT-url]: https://jwt.io/
[Express.js]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[Express.js-url]: https://expressjs.com/
[Node.JS]: https://img.shields.io/badge/node.js-026E00?style=for-the-badge&logo=node.js&logoColor=white
[Node.JS-url]: https://nextjs.org/
[MYSQL]: https://img.shields.io/badge/mysql-3E6E93?style=for-the-badge&logo=mysql&logoColor=white
[MYSQL-url]: https://www.mysql.com/
[GITHUB]: https://img.shields.io/badge/github-24292F?style=for-the-badge&logo=github&logoColor=white
[github-url]: https://www.github.com/
[GIT]: https://img.shields.io/badge/git-F54D27?style=for-the-badge&logo=git&logoColor=white
[git-url]: https://git-scm.com/
[LINKEDIN]: https://img.shields.io/badge/linkedin-0274B3?style=for-the-badge&logo=linkedin&logoColor=white
[LINKEDIN-url]: https://www.linkedin.com/
[JS]: https://img.shields.io/badge/javascipt-EFD81D?style=for-the-badge&logo=javascript&logoColor=black
[js-url]: https://developer.mozilla.org/es/docs/Web/JavaScript
[DOCKER]: https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white
[docker-url]: https://www.docker.com/
[sequelize-url]: https://www.sequelize.org/
[gmail-url]: https://www.gmail.com/

 </div>
<details>
  <summary style="font-weight:bolder" >Contents 🗂️</summary>
  <ol>
    <li><a href="#Full Description">Full Description</a></li>
    <li><a href="#Data Base diagram">Data Base diagram</a></li>
    <li><a href="#Tasks">Tasks</a></li>
    <li><a href="#instalation & Develop">Instalation & Develop</a></li>
    <li><a href="#author">Author / Contact </a></li>
  </ol>
</details>

###### The product department has asked us to develop the backend for the appointment management system for a tattoo studio.

<details>
  <summary style="font-weight:bolder">Full Description 📝</summary>
  <ol>
The users can register in the application, log in and access their personal area.
area. Within their area, they will be able to view a list of scheduled appointments for tattoo and piercing services, as well as create new appointments for
tattoo and piercing services, as well as create new appointments for different services offered by the
services offered by the studio,
  </ol>
</details>

##### Data Base Diagram

<img src="./src/img/databaseDiagram.png" style="border-radius:15px">

#### Tasks 📝

 <li> Create a Data Base</li>
<li> Migrations & Seeders for all tables.
<li>Create a Endpoints</li>
<details>
  <summary style="padding-left:15px; color:darkgray"> </summary>
<ol>

---

<ol style="color:green;font-weight:bolder"> Authentication</ol>

---

<li > Register</li>

POST `https://localhost:4500/api/auth/register`

<img src="./src/img/register.png" "/>

<li> Login</li>

POST `https://localhost:4500/api/auth/login/`

<img src="./src/img/login.png" "/>

---

<ol style="color:green;font-weight:bolder"> Users</ol>

---

<li> Get All Users ></li>

GET `http://localhost:4500/api/users`

<img src="./src/img/getAllUsers.png" "/>

<li> Get User Profile</li>

GET `http://localhost:4500/api/users/profile`

<img src="./src/img/getProfile.png" "/>

<li> Create Service </li>

POST `http://localhost:4500/api/services`

<img src="./src/img/createNewService.png" "/>

<li> Update Profile Data</li>

PUT `http://localhost:4500/api/users/profile`

<img src="./src/img/updateProfile.png" "/>

<li> Delete User by Id</li>

DELETE `http:localhost:4500/api/users/6`

<img src="./src/img/DeleteUserbyId.png" "/>

<li> Update Role </li>

PUT `http://localhost:4500/api/users/1/role`

<img src="./src/img/updateRoleUserbyId.png" "/>

---

 <ol style="color:green;font-weight:bolder"> Appointments </ol>

---

<li> Create Appointments </li>

POST `http://localhost:4500/api/appointments`

<img src="./src/img/CreateNewAppointment.png" "/>

<li> Update Appointments </li>

POST `http://localhost:4500/api/appointments`

<img src="./src/img/updateAppointmentByToken.png" "/>

<li> Get Appointment by Id </li>

GET `http://localhost:4500/api/appointments/109`

<img src="./src/img/getAppointmenById.png" "/>

<li> Appointment Retrieved </li>

GET `http://localhost:4500/api/appointments`

---

<ol style="color:green;font-weight:bolder"> Services </ol>

---

<li> Get all Services</li>

GET `localhost:4500/api/services`

<img src="./src/img/getAllServices.png" "/>

<li>  Create new Service</li>

POST `http://localhost:4500/api/services`

<img src="./src/img/createNewService.png" "/>

<li> Update Service </li>

POST `http://localhost:4500/api/services`

<img src="./src/img/updateService.png" "/>

<li> Delete Service </li>

DELETE `localhost:4500/api/services/7`

<img src="./src/img/deleteService.png" "/>

<div>

---

`All non-public endpoints with corresponding middlewares`

<ol>We can find here the collection of all endpoints in Thunder Client:
You have to open Thunder Client
Go to collections
Import this file:
</ol>
</div>
<br>

`./HTTP/thunder-collection_TATTOO_SHOP.json`

---

</ol>

</details>
<br>

#### Instalation & Develop ⛏️

<!-- End previously item -->
<ol>
 <details>
  <summary style="padding-left:1px; font-weight:bolder">1. INSTALL DOCKER

![DOCKER]</summary>

  <ol>
   <li> Install docker and run this command to get a container</li>

`$ docker run --name mysql-appointments -p 3309:3306 -e MYSQL_ROOT_PASSWORD=1234 -d mysql`

<li>Example</li>

`$ mysql -h localhost -P 3306 -u root -p you will need -h (host), -P (port), -u(username) and -p (password)`

   </ol>
</details>
<!-- End previously item -->

<details>
<summary style="font-weight:bolder;margin-top:-20px" >2. INSTALL EXPRESS

![Express][Express.js]

</summary>
<ol>

`$ npm init `

<li>Run follow command to create "package-lock.json" install node_modules</li>

`$ npm install express --save`

<li>
  Create .gitignore in root and add "./node_modules" , ".env" and ".dist" to
  avoid upload to github repository
</li>
<li>
  <img
    src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"
    style="margin-top: 15px; padding-left: 3px"
  />
</li>

`$ npm install typescript -D`

<li>Create the 'tsconfig.json' file</li>

`$ npx tsc --init`

<li>Install types/express & node</li>

`$ npm install @types/express @types/node -D`

<li>Install dependencies to compile TS (nodemon)</li>

` $ npm install ts-node nodemon -D`

<li style="color:gray;font-weight:thin">
  Create ".env" and ".env.example" file The .env file has the key & value
  credentials to access to the data base. It should not be visible, for this
  reason we add it to .gitingnore. The ".env.example" files have the same
  structure to build your ".env" file on your local
</li>
<li>Put the follow keys in .env file.</li>

```js

PORT =4500
#conexion a bd
DB_USER=root
DB_PASSWORD=1234
DB_PORT=3309
DB_HOST=localhost
DB_DATABASE=appointmentApi

# JWT
JWT_SECRET=secreto

```

<br />
<li>
  Install 'dotenv' to added th depencencies and will grab data from the .env
  file
</li>

` $ npm install dotenv`

<li>
  DOTENV - Create the folder "src" with "server.ts" file inside. This the code
  to connect to the server.
</li>

```js
import "dotenv/config" import { app } from"./app"
import { AppDataSource } from "./database/db"

  // sets up the connection
port const PORT = process.env.PORT || 4500

const startServer = () => {

AppDataSource.initialize() .then(() => {
   console.log("Database Appointment API connected")

app.listen(PORT, () => {
  console.log(`Server is running at PORT:${PORT}`)

    })
 }).catch((error) => {
       console.log(error)
  })
  }

 startServer()
```

<!-- End previously item -->
<li>We create app.ts file</li>

```js
// links to .env file
import "dotenv/config"
import express, { Application } from "express"
// export app function export
const app: Application = express()
// parses response to .json
app.use(express.json())
// testing request
app.get("/healthy", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  })
})
```

<!-- End previously item -->

</ol>
<!-- End previously item -->
</details>
<!-- End previously item -->

<details>
<summary style="font-weight:bolder; margin-top:-20px" >3. CREATE MYSQL

![MYSQL]</summary>

<ol>
<li>Think and rethink the database, avoid redundancy between keys and related tables. Identify primary keys (PK) and foreign keys (FK). Choose the type of value, if it is 'NULL' (not required) or can be 'UNIQUE' fields.</li>
 <li>Open Mysql Workbench and set up new dataBase connection
</li>

<li>

<img style="border-radius:12px; padding:1px; width:90%; ; " src="./src/img/workbench0.png">

 <li>Click on plus icon and put in the field "Connection Name" the data base name.
 Add the port 3309 like we was defined when we start the docker container. Then you can test connection to check if it's all right.
 </li>
<img style="border-radius:12px; padding:1px; width:90%; ; " src="./src/img/workbench1.png">

 <li >It's possible that's appear a warning message. It's doesn't matter, press "Continue Anyway".</li>
 <img style="border-radius:12px; padding:1px; width:90%; ; " src="./src/img/workbench2.png">

 <li>The next step is create a new schema. Press right button mouse and choose "Create schema"</li>
 <img style="border-radius:12px; padding:1px; width:90%; ; " src="./src/img/workbench3.png">

 <li>Write in the field the new schema name. "appointmentApi" and press apply </li>
<img style="border-radius:12px; padding:1px; width:90%; ; " src="./src/img/workbench4.png">

<li>It's will appear this window and press apply again.</li>
<img style="border-radius:12px; padding:1px; width:90%; ; " src="./src/img/workbench5.png">

 <li>The new schema it was created. Press close.</li>
<img style="border-radius:12px; padding:1px; width:90%; ; " src="./src/img/workbench6.png">

<li>You can see in the left corner the element created</li>
<img style="border-radius:12px; padding:1px; width:90%; ; " src="./src/img/workbench7.png">
<li>Run the previusly shorcut created to connect to the server.</li>

`$ npm run dev `

 </ol>
</details>
<!-- End previously item -->
<details>
  <summary style="font-weight:bolder; margin-top:-5px" >4. MIGRATIONS & MODELS</summary>

- Creating MIGRATIONS [Data Definition Language (DDL): with typeorm]:
  `$ npm run run-migrations`
  `./src/database/migrations`

  <li>It's possible that's need populate with one basic table before continue with the migrations
  go to the point <a href="#11.run--project">11.Run Project</a></li>

- Adding them to `DataSource.migrations` in the `db.ts` file: `Role, User, Service, Appointment`
  <img src="./src/img/migrations.png/" style="border-radius:15px; width:50%">
- Creating MODELS (entities) [Data Manipulation Language (DML)]
  <img src="./src/img/models.png/" style="border-radius:15px;width:50%">

- Adding them to `DataSource.entities` in the `db.ts` file: `Roles, Users, Services, Appointments`

</details>

<details>
  <summary style="font-weight:bolder" >5. CONTROLLERS</summary>

- We create controllers (in a folder on the same level with `package.json`): > `auth, roles, users, services, appointments`
<img src="./src/img/Controllers.png/" style="border-radius:15px; width:50%">
</details>

<details>
  <summary style="font-weight:bolder" >6. ROUTES</summary>

- We create routes (in `app.ts`) for CRUD (create, read, update and delete) database records.
  <img src="./src/img/CRUD.png/" style="border-radius:15px; width:50%">

</details>

<details>
  <summary style="font-weight:bolder" >7. MIDDLEWARE: auth( )</summary>
  
  - Additionally we need to control access to our data. We will use 'middleware' functions.
  <img src="./src/img/middlewares.png/" style="border-radius:15px;width:50%">

- Auth`(authorization system based on TOKENs) will block anything that should not be seen by the general public. In our case, it only does not affect`register`, `login`and`getServices` (since those are the endpoints accessible without logging in).
- The `auth()` function verifies an encrypted TOKEN created automatically at login. With an active token we have access to other data.
</details>

<details>
  <summary style="font-weight:bolder" >8. MIDDLEWARE: isSuperAdmin()</summary>
  
- We also want to grant special administrative access. With another middleware, the `isSuperAdmin()` function, we control PERMISSIONS.
- The 'superadmin' role would be able to reach all data, while Users would have a more limited reach. More levels can be implemented
</details>

<details>
  <summary style="font-weight:bolder" >9. TOKENDATA</summary>

- For the TOKEN to work, we create a new file `./types/index.d.ts` with the following lines:

      ```js
      export type tokenData = {
          userId: number;
          roleName: string;
      };

      declare global {
          namespace Express {
              export interface Request {
                  tokenData: tokenData;
              }
          }
      }
      ```

  </details>

<details>
  <summary style="font-weight:bolder" >10. SEEDERS</summary>

- In order to check out this project, you'll need to populate the database.

`$ npm run seed`

<li> Roles Seeder</li>
<img src="./src/img/RolesSeeder.png"/>
<li> User Seeder</li>
<img src="./src/img/UsersSeeder.png"/>
<li> Service Seeder</li>
<img src="./src/img/ServiceSeeder.png"/>
<li> Appointment Seeder</li>
<img src="./src/img/AppointmentsSeeder.png"/>

</details>

<details>
  <summary style="font-weight:bolder" >11. RUN PROJECT</summary>
  <ol>
  <li>Clone this repository
  </li>
  <li>Run in terminal
  </li>

`$ npm install`

  <li> Conect repository with database</li>

  <li>Run migrations:</li>

`$ npm run run-migrations`

  <li> Run seeders:</li>

`$ npm run seed`

  <li>Start server:</li>

`$ npm run dev`

<li>To populate the data base you must add the follow data in this way:</li>
<li>You can select and copy ALL TEXT from the `"data.sql"` file
- Paste it into MySQL 
- Execute it (⚡ button) to populate a smaller example of the database
    >file route:</li> 
    
    ` ./src/database/seeders/data.sql  ` 
    
  </ol>

  <li> - super_admin, admin & random user - Credentials</li>

``

{
"first_name": "Super",
"last_name": "Super"
"email": "super@super.com"
"password": 123456,
"role_id": 3
}
{
"first_name": "Admin",
"last_name": "Admin"
"email": "admin@admin.com"
"password": 123456,
"role_id": 2
}
{
"first_name": "XXXX",
"last_name": "XXXX"
"email": "XXXX@XXXX.com"
"password": 123456,
"role_id": 1
}
`

</details>

<!-- ## Deployment -->

<!-- The project is deplyed here: -->

<!-- https://proyecto4-buscador-dev-jzta.1.ie-1.fl0.io/ -->

<!-- You can use this route for all the endpoints. -->
</ol>

### Author

<a href = "mailto:ramirolpoblete@gmail.com"><img src="https://img.shields.io/badge/Gmail-C6362C?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a> <a href="https://www.linkedin.com/in/ramiropoblete/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> <a href = "https://github.com/Ramer8"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" target="_blank"></a>
