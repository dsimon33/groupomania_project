const express = require('express');
const bodyParser = require('body-parser');
const mySql2 = require('mySql2');
const helmet = require('helmet');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();


const app = express();

let corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));


app.use(bodyParser.urlencoded({extented: true}));
app.use(bodyParser.json());


const db= require('./models');
const Role = db.role;

/*db.sequelize.sync ({force: true}).then(() =>{ à uncomment pour initialser la BDD puis à comment ensuite afin de ne pas effacer les données saisie du frontend.
  initial();
});

function initial() {
  Role.create({
    id: 1, 
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}*/

app.use(helmet());

require('./routes/comment')(app);
require('./routes/auth')(app);
require('./routes/user')(app);
require('./routes/post')(app);



module.exports = app;
