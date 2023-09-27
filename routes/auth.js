const router = require("express").Router();

router.post('/register', (req, res) => {
    res.send('Registration');
})
router.post('/login', (req, res) => {
    res.send('Login')
});

module.exports = router;