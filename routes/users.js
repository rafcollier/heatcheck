const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/users');


//REGISTER USERS

router.post('/register', (req, res, next) => {
	let newUser = new User({
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		username: req.body.username,
		password: req.body.password,
		phonenumber: req.body.phonenumber
	});
	User.getUserByUsername(newUser.username, (err, user) => {
		if(err) throw err;
		if(user) {
	 	   return res.json({success: false, msg: 'Username already registered'});
		}
		User.addUser(newUser, (err, user) => {
 	 		if(err) {
    			res.json({success: false, msg: 'Failed to register user'});
    		} 
    	    else {
    			res.json({success: true, msg: 'User registered'});
        	}
    	});
    });
});

//AUTHENTICATE USERS

router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  User.getUserByUsername(username, (err, user) => {
	if(err) throw err;
	if(!user) {
	  return res.json({success: false, msg: 'User not found'});
	}
	User.comparePassword(password, user.password, (err, isMatch) => { 
	  if (err) throw err;
	  if(isMatch) {
		const token = jwt.sign(user.toJSON(), config.secret, { 
		expiresIn: 604800 //1 week
	  });
  	  res.json({
		success: true,
		token: 'JWT ' + token,
		user: {
		  id: user._id,
		  firstname: user.firstname, 
		  lastname: user.lastname, 
		  username: user.username,
		  phonenumber: user.phonenumber
		}
	  });
	  } 
	  else {
		return res.json({success: false, msg: 'Wrong password'});
	  }
	});
  });
});

//DELETE USERS

router.delete('/delete', (req, res, next) => {
	res.send('DELETE');
});

//USER PROFILE

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
	res.json({user: req.user});
});

module.exports = router;


/*


router.delete('/deleteUser', (req, res, next) => {
  User.findByIdAndRemove(req.query.docID, (err, doc) => { 
    if (err) throw err;
  });
});

module.exports = router;

*/