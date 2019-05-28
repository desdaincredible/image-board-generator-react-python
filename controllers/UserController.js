const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs')

// index
router.get('/', (req, res) => {
    res.send('hello')
});

// login
router.post('/login', async (req, res) => {
    try{
        const foundUser = await User.findOne({username: req.body.username})
        if(foundUser){
            if(bcrypt.compareSync(req.body.password, foundUser.password) === true){
                req.session.logged = true;
                req.session.username = foundUser.username;
                req.session.usersId = foundUser._id;
                res.json({
                    status: 200,
                    data: foundUser,
                    reqSession: req.session
                })
            }
        }
        res.send({
            status: 500,
            data: "Username not found or password incorrect."
        })
    }catch(err){
        console.log(err);
            res.json({
                status: 500,
                data: err
            })
    }
});

// logout NOT WORKING
router.get('/logout', async (req, res) => {
    try{
        req.session.destroy();
        console.log('logged out')
    }catch(err){
        console.log(err);
    }
})

// register
router.post("/", async (req, res)=>{
    try{
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hashedPassword;
        const newUser = await User.create(req.body)
        newUser.password = null;
        req.session.username = newUser.username;
        req.session.usersId = newUser._id;
        res.json({
            status: 200,
            data: newUser
        })
    }catch(err){
        console.log(err);
        res.json({
            status: 500,
            data: err
        })
    }
});

module.exports = router;