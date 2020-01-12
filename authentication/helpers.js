//Middleware function to ensure a user is logged in. If they are, continue. if not, redirect them to the login page.
const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()){
         return next();
    } else{
        res.redirect(`${process.env.FRONTEND_BASE_URL}/`)
    }
}