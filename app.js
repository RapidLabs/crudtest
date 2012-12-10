var express = require('express');
var app = module.exports = express.createServer();

app.get('/', function(req, res){
	res.send('hello world');
});

var allUsers = [
{
	'username': 'Jason',
	'userID': 1
},
{
	'username': 'Somebody',
	'userID': 2
},
{
	'username': 'Somebody Else',
	'userID': 3
}
]

var allLists = [
{
	'listID': 1,
	'userID': 1,
	'listItem': 'take over world',
	'completed': false
},
{
	'listID': 2,
	'userID': 1,
	'listItem': '???',
	'completed': true
},
{
	'listID': 3,
	'userID': 2,
	'listItem': 'Sleep',
	'completed': true
},
{
	'listID': 4,
	'userID': 1,
	'listItem': 'PROFIT!',
	'completed': false
}
]

//Retrieves a list of to-do items from user of query string u
app.get('/user/list', function(req, res){

var output = "";
var findUserList = function(username){
	var totalUsers = allUsers.length;
	var uName = username.toLowerCase();
	if (uName){
	for (var j = 0; j < totalUsers; j++){
		if (allUsers[j].username.toLowerCase() === uName){
			var uID = allUsers[j].userID;
			output += '<h2>' + allUsers[j].username + "'s To-Do List:" + '</h2>';
		}
	}
	if (output === ""){
		output = "User not found!";
	} else {
		itemNumber = 0;
	for (var i = 0; i < allLists.length; i++){
	if (allLists[i].userID === uID)
	{ itemNumber ++
		if (allLists[i].completed === true) {
			output += '<div><strike>' + itemNumber + ". " + allLists[i].listItem + '</strike></div>';	
		}
		else {
			output +='<div>' + itemNumber + ". " + allLists[i].listItem + '</div>';
}
}
};
}
} else output = "No query found";
}

findUserList(req.query.u);
res.send(output);
}) 
//End of retrieving to do list

/* app.delete('/user/list', function(req, res){
	if (req.query.d === "x"){
		allUsers.splice(index, 1);
	}
}); */

app.get('/user/delete', function(req, res){
	var userToDelete = "";
	userToDelete += req.query.deleteuser;
	userToDelete.toLowerCase();
	var userDeletionOutput = "";
	if (userToDelete === ""){
		userDeletionOutput = 'No user to delete. Query is empty!';
	} else {
//		var totalUsers = allUsers.length
		for (var i = 0; i < allUsers.length; i++){
			if (allUsers[i].username.toLowerCase() === userToDelete){
				allUsers.splice(i, i+1);
				userDeletionOutput = (userToDelete + ' has been deleted!')
			}
		}
		if (userDeletionOutput === ""){
			userDeletionOutput = 'User not found!'
		}
	}
//	res.send(userDeletionOutput)
});

/* app.get('/user/delete', function(req, res){
	res.send('Done')
}) */

app.listen(3000);

