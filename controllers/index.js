const router = require('express').Router();
<<<<<<< HEAD
const homeRoutes = require('./home-routes.js');

const apiRoutes = require('./api');

router.use('/', homeRoutes);
//router.use('/api', apiRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
=======

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;
>>>>>>> 9344b44632768b9e186289598edddca3344eb6d5
