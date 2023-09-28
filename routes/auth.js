const router = require("express").Router();
const User = require('../model/User');
const {registerValidation, loginValidation}= require('../validation')

router.post('/register', async (req, res) => {

    
    const {error} = registerValidation(req.body)
    if (error)
        return res.status(400).send(error);


    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

    try {
        const saveUser = await user.save();
        console.log(saveUser);
        res.send(saveUser)
    } catch (error) {
        res.send(error);

    }
}


);



module.exports = router;