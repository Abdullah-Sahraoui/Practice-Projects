const handleProfileGet = (req, res, db) => {
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
};

module.exports = {
	handleProfileGet
}