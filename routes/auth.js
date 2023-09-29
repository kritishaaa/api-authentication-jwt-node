const router = require("express").Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv').config();
const { registerValidation, loginValidation } = require('../validation')

router.post('/register', async (req, res) => {
    // validating the user
    const { error } = registerValidation(req.body)
    if (error)
        return res.status(400).send(error.details[0].message);

    //checking if the user already exist or not
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist)
        return res.status(400).send('Email already exist');

    //hasing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });

    try {
        const saveUser = await user.save();
        console.log(saveUser);
        res.send({ user: user._id })
    } catch (error) {
        res.send(error);

    }
}
);

//LOGIN
router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body)
    if (error)
        return res.status(400).send(error.details[0].message);

    //checking if the user already exist or not
    const user = await User.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).send('Email doesnot exist');
    //password compare
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass)
        return res.status(400).send('Password doesnot match');
    //jwt
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN);
    res.header('auth-token', token).send(token);
})


module.exports = router;