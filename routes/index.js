const router = require('express').Router();
const passport = require('passport');

router.use('/', require('./swagger'));

// router.get('/', (req, res) => { 
//     //#swagger.tags=['Hello World']
//     res.send('Hello World');
// });

router.use('/accounts', require('./accounts'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if(err) { return next(err); }
        req.session.destroy();
        res.redirect('/');
    });
});
module.exports = router;