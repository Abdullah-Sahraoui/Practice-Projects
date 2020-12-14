const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'windows',
    database : 'face_recognition_db'
  }
});


const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {
	db('users').select('*').from('users')
		.then(data => res.json(data))
});

app.post('/signin', (req, res) => signin.handleSignin(req, res, db, bcrypt));

app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));

app.get('/profile/:id', (req, res) => profile.handleProfileGet(req, res, db));

app.put('/image', (req, res) => image.handleImage(req, res, db));

app.listen(3001, () => {
	console.log('App is running on port 3001');
});

/*
/ --> response = this is working
/signin  --> POST = success/fail
/register ---> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/