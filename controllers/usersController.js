//user logs out
const logout = async(req, res) => {
    console.log('logout function')
    req.logout();
    res.redirect(`${process.env.FRONTEND_BASE_URL}/`)
}


// user logs in (this uses github authentication)
const gitAuthentication = (req, res) => {
    console.log('gitauth function')
    res.redirect('/')
}

//After successful login, user is redirected to the home page.
const callback = (req, res) => {
    console.log('callback function')
    res.redirect(`${process.env.FRONTEND_BASE_URL}/?userid= ${req.user.id}`)
}

// Retrieve the current user, if a user is logged in.
const currentUser = (req, res) => {
    if(req.user){
        res.status(200).send(req.user)
    } else {
        res.send(false)
    }
}

module.exports = {
    logout,
    callback,
    gitAuthentication,
    currentUser
}

// Component did mount in the highest app component that hits a bckend route to check if somebody is logged in, if they are send their profile info.

// commnent