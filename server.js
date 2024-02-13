
const express = require('express')
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // req.body

//const Person = require('./models/Person');
//const MenuItem = require('./models/MenuItem');

app.get('/', function(req,res) {
    res.send("Welcome to My Resturant")
})



// import the router files 
const personRoutes = require('./routes/personRoutes');
// use the routers
app.use('/person', personRoutes);

const menuItemRoutes = require('./routes/menuItemRoutes');

app.use('./', menuItemRoutes);

app.listen(3000, ()=> {
    console.log('server is running')
})
