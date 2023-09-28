const router = require("express").Router();
const User = require('../model/User');
const Joi = require('@hapi/joi');

//VALIDATION
const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required()
});



router.post('/register', async (req, res) => {

    const { error } = schema.validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);


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