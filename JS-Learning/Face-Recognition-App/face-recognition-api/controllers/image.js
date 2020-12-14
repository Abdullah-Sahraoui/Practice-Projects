const handleImage = (req, res, db) => {
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
};

module.exports = {
	handleImage
}