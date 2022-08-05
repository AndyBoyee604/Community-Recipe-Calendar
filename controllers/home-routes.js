const router = require('express').Router();
const sequelize = require('../config/connection');


router.get('/login', (req, res) => {
    res.render('login');
});
    


module.exports = router;