const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const checkForSession = require('./middlewears/checkForSession.js');
const swc = require('./controllers/swag_controller.js');
const ac = require('./controllers/auth_controllers.js');
const cc = require('./controllers/cart_controller.js');
const sc = require('./controllers/search_controller.js');

const app = express();

app.use(bodyParser.json());
app.use( session({
    secret: 'blah',
    resave: false,
    saveUninitialized: false
  })
);
app.use(checkForSession);
app.use(express.static(`${__dirname}/../public/build`));

// Swag api endpoints
app.get('/api/swag', swc.read);

// User api endpoints
app.post('/api/login', ac.login);
app.post('/api/register', ac.register);
app.post('/api/signout', ac.signout);
app.get('/api/user', ac.getUser);

// Cart api endpoints
app.post('/api/cart', cc.add);
app.post('/api/cart/checkout', cc.checkout);
app.delete('/api/cart', cc.delete);

// Search products api endpoints
app.get('/api/search', sc.search);

const port = 3000;
app.listen(port, () => { console.log("I am listening");});
