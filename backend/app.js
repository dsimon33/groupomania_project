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
const User = db.user;

/*db.sequelize.sync ({force: true}).then(() =>{ 
  initial();
});

function initial() {
  Role.create({
    id: 1, 
    name: "utilisateur"
  });
 
  Role.create({
    id: 2,
    name: "moderateur"
  });
 
  Role.create({
    id: 3,
    name: "administrateur"
  });

}*/

app.use(helmet());

require('./routes/comment')(app);
require('./routes/auth')(app);
require('./routes/user')(app);
require('./routes/post')(app);



module.exports = app;
