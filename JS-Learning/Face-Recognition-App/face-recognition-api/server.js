const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

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

	// res.send(database.users);
});

app.post('/signin', (req, res) => {
	db.select('email', 'hash').from('login')
		.where('email', '=', req.body.email)
		.then(data => {
			const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
			if (isValid) {
				return db.select('*').from('users')
					.where('email', '=', req.body.email)
					.then(user => {
						res.json(user[0])
					})
					.catch(err => res.status(400).json('Unable to get user.'))
			} else {
				res.status(400).json('Incorrect credentials');
			}
		})
		.catch(err => res.status(400).json('Wrong credentials.'));
});

app.post('/register', (req, res) => {
	const { email, name, password } = req.body;
	const hash = bcrypt.hashSync(password);
		db.transaction(trx => {
			trx.insert({
				hash: hash,
				email: email
			})
			.into('login')
			.returning('email')
			.then(loginEmail => {
				return trx('users')
					.returning('*')
					.insert({
						email: loginEmail[0],
						name: name,
						datejoined: new Date()
					})
					.then(user => {
						res.json(user[0]);
					})
			})
			.then(trx.commit)
			.catch(trx.rollback)
		})
		
		.catch(err => res.status(400).json('Unable to register.'));
});

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	let found = false;

	db.select('*').from('users').where({id})
		.then(user => {
			if (user.length) {
				res.json(user[0])
			} else {
				res.status(400).json('Not found');
			}
		})
		.catch(err => res.status(400).json('There was some kind of error with your request.'));
});

app.put('/image', (req, res) => {
	const { id } = req.body;
	let found = false;
	db('users')
		.where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => res.json(entries[0]))
		.catch(err => res.status(400).json('There was an error grabbing the entries.'));
	// if (!found) {
	// 	res.status(404).json("That user was not found.");
	// }
});

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