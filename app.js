//Remaining CRUD work
//C - DONE!
//R - DONE!
//U - Update list items to completed, delete list items, update list items (?)
//D - Fix list deletion associated with account deletion

//Account for upper and lower cases
//Account for blank entries
//Make sure URI is lower case
//Add output to replace the empty output
//Fix URI structure, rename variables
//Separate code and array, etc. from js file
//Change to POST, PUT and DELETE
//Test results with cURL
//Recheck logic
//Create functions for repetitive code
//Improve documentation

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

//WORKING - Retrieves a list of to-do items based on user "u"

app.get('/user/list',function(req,res){
	var output = "";
	var totalUsers = allUsers.length;
	var uName = req.query.u.toLowerCase();
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
				if (allLists[i].userID === uID){
					itemNumber ++;
					if (allLists[i].completed === true) {
						output += '<div><strike>' + itemNumber + ". " + allLists[i].listItem + '</strike></div>';
					} else {
						output += '<div>' + itemNumber + ". " + allLists[i].listItem + '</div>';
					}
				}
			}
		}
	} else {
		output = "No query found!";
	}
	res.send(output);
});

//Should be DELETE that deletes username and list items associated with user
app.delete('/user/delete', function(req, res){
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
				var userDeleteID = allUsers[i].userID
				allUsers.splice(i, i+1);
				userDeletionOutput = (userToDelete + ' has been deleted!')
				break;
			}
		}
		if (userDeletionOutput === ""){
			userDeletionOutput = 'User not found!'
		}
	}
	for (var j = 0; j < allLists.length; j++){
		// *** If statement seems to delete additional stuff sometimes ***
		if (allLists[j].userID === userDeleteID){
			allLists.splice(j, j+1);
			j--;
		}
	}

	res.send(userDeletionOutput);
});

//Test function used to see all output
app.get('/test', function(req, res){
	var testOutput = "";
	for (var i = 0; i < allUsers.length; i++){
		testOutput += allUsers[i].username + allUsers[i].userID;
	}
	for (var j = 0; j < allLists.length; j++){
		testOutput += allLists[j].listID.toString() + allLists[j].userID.toString() + allLists[j].listItem + allLists[j].completed;
	}

	res.send(testOutput);
});

//WORKING - POST that adds user based on "adduser"
app.post('/user', function(req, res){
	var userToAdd = req.query.adduser
	var output = "";
	for (i = 0; i < allUsers.length; i++){
		if (allUsers[i].username.toLowerCase() === userToAdd.toLowerCase()){
			output = userToAdd + "already exists as a username";
			break;
		}
	}
	if (output === ""){
		var newUserObject = {
			'username': userToAdd,
			'userID': allUsers.length + 1
		}
		allUsers.push(newUserObject);
		output = userToAdd + " added with user ID " + allUsers.length;
	}
	res.send(output);
});

//WORKING - POST (or PUT?) that adds item to list based on "user" and "item"
app.post('/user/listadd', function(req, res){
	var listUser = req.query.user;
	var listItem = req.query.item;
	var newListObject = "";
	var output = "";
	for (i = 0; i < allUsers.length; i++){
		if (allUsers[i].username.toLowerCase() === listUser.toLowerCase()){
			newListObject = {
				'listID': (allLists.length + 1),
				'userID': allUsers[i].userID,
				'listItem': listItem,
				'completed': false 
			}
		allLists.push(newListObject);
		output += listItem + " added to user " + listUser;
		break;
	}
	}
	if (newListObject === ""){
		output += listUser + " does not exist!";
	}
	res.send(output)
});

//WORKING - PUT that changes username based on "oldname" and "newname"
app.put('/updateusername', function(req, res){
	var oldUsername = req.query.oldname;
	var newUsername = req.query.newname;
	var output = "";
	for (i = 0; i < allUsers.length; i++){
		if (allUsers[i].username.toLowerCase() === newUsername.toLowerCase()){
			output = "New username is already taken!"
			break;
		}
	}
 	for (j = 0; j < allUsers.length; j++){
 		if (allUsers[j].username.toLowerCase() === oldUsername.toLowerCase()){
 			if (output === ""){
 				allUsers[j].username = newUsername;
 				output = oldUsername + " changed to " + newUsername;
 				break;
 			}
 		}
 	}
 	if (output === ""){
 		output = "Old username doesn't exist!"
 	}
 	res.send(output)
});

//U - Update list items to completed, delete list items, update list items (?)
app.put('/updatelist', function(req, res){
/*	var itemID = "";
	if (req.query.listid){
		itemID = req.query.listid;		
	}
	var completionStatus = "";
	if (req.query.completion){
		itemID = req.query.completion;
	}
	var deletionStatus = "";
	if (req.query.deletion){
		deletionStatus = req.query.deletion;
	} */
	var itemID = req.query.listid;
	var completionStatus = req.query.completion;
	var deletionStatus = req.query.deletion;
	var listItem = req.query.listitem;
	var itemLocation;
	var output = "";

	//Turns itemID into an integer, finds listID that matches itemID
	if (parseInt(itemID)){
		itemID = parseInt(itemID, 10);
		for (i = 0; i < allLists.length; i++){
			if (allLists[i].listID === itemID){
				itemLocation = i;
				break
			}
			//No listID matching itemID
			else if (((i+1) === allLists.length) && (allLists[i].listID != itemID)){
				output += "No list item matching the item ID of " + itemID + " was found.";
			}
		}
	} else if (itemID === ""){
		output += "Item ID is required for this function to work!";
	} else {
		output += "WTF? The list ID has to be a number!"
	}

	//Converts completionStatus into boolean if possible
	if (completionStatus === 'true'){
		completionStatus = true;
	}
	else if (completionStatus === 'false'){
		completionStatus = false;
	} 
	else if (completionStatus === ""){
		output += "No completion status set"
	} else {
		output += "Completion status must be either 'true' or 'false'!"
	}

	//Changes 'completed' of item matching listID to completionStatus
	if (typeof itemLocation === 'number'){
		if (typeof completionStatus === 'boolean'){
			allLists[itemLocation].completed = completionStatus
			output += "Item number " + i + " changed to " + completionStatus;
		}
	}

	//Deletes item matching listID, otherwise returns different output
	if (deletionStatus === 'true'){
		allLists.splice(itemLocation, itemLocation+1);
	}
	else if (deletionStatus === ""){
		output += "Deletionstatus is empty"
	} else {
		output += "Deletionstatus not set correctly!"
	}

	if (listItem.length > 0){
		allLists[itemLocation].listItem = listItem;
	} else {
		output += "No listItem"
	}

	res.send(output)
});

app.listen(3000);

//curl localhost:3000/test -X GET