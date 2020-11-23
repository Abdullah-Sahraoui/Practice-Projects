//Simplified version of the facebook app

var database = [
	{
		username: "bido",
		password: "supersecret",
	}
];

var newsFeed = [
	{
		username: "Bobby",
		timeline: "So tired from all that learning",
	},
	{
		username: "Sally",
		timeline: "JavaScript is soooo cool!"
	}
];

var userNamePrompt = prompt("What's your user name?");
var passwordPrompt = prompt("What's your password?");

console.log(database[0].password)

function signIn(user, pass) {
	if (user === database[0].username && 
		pass === database[0].password) {
		console.log(newsFeed);
	} else {
		alert("Sorry, wrong username or password!");
	}
};

signIn(userNamePrompt, passwordPrompt);