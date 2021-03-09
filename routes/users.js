const express = require('express');
const usersRouter = express.Router();
const jwt = require('jsonwebtoken')
const { getAllUsers, getUserByUsername, createUser } = require('../db');

usersRouter.use((req, res, next) => {
    console.log("A request is being made to /users");

    next();
});

usersRouter.get('/', async (req, res) => {
    const users = await getAllUsers();
    res.send({
        users        
    });
});

usersRouter.post('/register', async (req, res, next) => {
    const { username, password, name, company } = req.body;

    try {
        const _user = await getUserByUsername(username);

        if(_user){
            next({
                name: 'UserExistsError',
                message: 'That username is already taken.'
            });
        }

        const user = await createUser({username, password, name, company});
        const token = jwt.sign({ id: user.id, username }, process.env.JWT_SECRET, { expiresIn: '1w'});

        res.send({ message: 'Thanks for signing up!', token });
    } catch ({name, message}) {
        next({ name, message })
    }
});

usersRouter.post('/login', async (req, res, next) => {
    const { username, password } = req.body;

    if(!username || !password){
        next({
            name: "MissingCredentialsError",
            message: "Please supply both a username and a password"
        });
    }
    try {
        const user = await getUserByUsername(username);

        if(user && user.password == password) {
            token = jwt.sign({
                id: user.id,
                username
            }, process.env.JWT_SECRET, {
                expiresIn: '1w'
            })
            res.send({ message: "You're logged in.", token})
        } else {
            next({
                name: "IncorrectCredentialsError",
                message: "Incorrect username or password"
            });
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
})

module.exports = usersRouter;

