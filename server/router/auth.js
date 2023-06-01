const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');
const authenticate = require('../middleware/authenticate');

router.post('/login', async (req, res) => {
    try{
        // Retrieve email and password from body of the request
        let {email, password} = req.body;
        // Check whether email and password are empty
        email = email.trim();
        password = password.trim();
        if(!email || !password){
            return res.status(400).json({error: 'Please enter all the fields'});
        }  
        // Find user with the given email
        const userLogin = await User.findOne({email: email});
        // If user is found
        if(userLogin){
            // compare passwords
            const passwordMatch = await bcrypt.compare(password, userLogin.password);
            // If password is matched then sign the jwt and store it in cookies
            if(passwordMatch){
                const userID = userLogin._id;
                const token = jwt.sign({_id: userID}, process.env.SECRET_KEY, {expiresIn: "30d"});
                res.cookie("jwtoken", token, {expiresIn: "30d", httpOnly: true});
                res.status(201).json({message: 'Login successful'});   
            }
            else{
                return res.status(400).json({error: 'Invalid credentials'});    
            }
        }
        else{
            return res.status(400).json({error: 'Invalid credentials'});
        }
    }
    catch(err){
        console.log('Login error: '+err);
    }
});

router.post('/register', async (req, res) => {
    // Retrieve data from body of the request
    let {username, email, phone, password, cpassword} = req.body;
    username = username.trim();
    email = email.trim();
    phone = phone.trim();
    password = password.trim();
    cpassword = cpassword.trim();

    // Check if some field is empty
    if(!username || !email || !phone || !password || !cpassword){
        return res.status(400).json({error: 'Please enter all the fields'});
    }

    try {
        // If password is different from confirmed password
        if(password !== cpassword){
            return res.status(400).json({error: 'Passwords do not match'});
        }
        // Check for existing user(by email)
        const emailExist = await User.findOne({email});
        // If user already exists
        if(emailExist){
            return res.status(400).json({error: 'This email is already registered'});
        }
        const usernameExist = await User.findOne({username});
        if(usernameExist){
            return res.status(400).json({error: 'This username is already registered'});
        }

        // This initialises the vocabulary array with an empty array at 0th index
        // which will later on store all the labels
        const vocabulary = [["Hard", "Uncertain", "Pronounciation", "Rare", "British", "American"],
                            ];

        // Initial Progress Stats
        let progressStats = [];
        progressStats.push({optionName: 'vocabulary', addedWords: 0, deletedWords: 0, lastCommit: `-`});
        progressStats.push({optionName: 'programming', questionSolved: 0, totalDoubts: 0, solvedDoubts: 0, lastCommit: `-`});
        
        // Registration Date
        const registeredOn = new Date(); 
        // make a new user
        const user =  new User({username, phone, email, password, vocabulary, progressStats, registeredOn});
        // save the user
        await user.save();
        return res.status(201).json({message: 'User registered successfully'});

    } catch (err) {
        console.log('Registration error: '+err);
    }

});

router.post('/updateUserData', async (req, res) => {
    try{
        // Retrieve all the data from body of the request
        let {newUsername, newPhone, userImg, email} = req.body;
        // Check whether the username already exists
        const userx = await User.findOne({username: newUsername});
        // If username already exists and the found user is diff from the curr user
        if(userx && userx.email !== email){
            return res.status(400).json({error: "Username already taken"});
        }

        await User.updateOne({email: email}, {
            $set: {
                username: newUsername,
                phone: newPhone,
                profilePic: userImg
            }
        });

        return res.status(201).json({message: 'User updated successfully'});
    }
    catch(err){
        console.log('Update user error: '+err);
    }
});

router.get('/logout', (req, res) => {
    console.log('Logout');
    res.clearCookie("jwtoken", {path: "/"});
    res.status(201).json({message: "User logged out"});
});

router.get('/myprofile', authenticate, async (req, res) => {
    const userProgress = req.rootUser.progressStats;
    res.status(201).json({user: req.rootUser, userProgress: userProgress, message: "Welcome to Profile"});
})

router.get('/home', authenticate, (req, res) =>{
    let obj = {user: req.rootUser, message: "Welcome to dashboard"};
    res.status(201).json(obj);
});

router.use('/vocabulary', authenticate, require('./vocabulary'));

router.get('/programming', authenticate, (req, res) => {
    res.status(201).json({user: req.rootUser, message: "Welcome to Programming"});
});


module.exports = router;