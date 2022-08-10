// Checks to make sure there is a user logged in and if not then it will redirect them to login page 
const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect('/login');
    } else {
        next();
    }
};


module.exports = withAuth;