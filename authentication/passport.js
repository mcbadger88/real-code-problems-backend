// const router = require('express').Router();
const passport = require('passport');
const GithubStrategy = require('passport-github2')
const User = require('../models/User')
const Candidate = require('../models/Candidate')
const cookieSession = require('cookie-session')


//Put user ID into a cookie after the user is authenticated / logged in.
passport.serializeUser((user, done)=> {
    done(null, user.id);
})

//When the cookie comes back from the browser, take the ID from it an find the user associated with it.
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    })
})

//Connect to the passport github strategy.
passport.use(
    new GithubStrategy({
        //options for github strategy, replace the strings with process.ENV variables.
        clientSecret: process.env.CLIENT_SECRET,
        clientID: process.env.CLIENT_ID,
        callbackURL: `${process.env.BACKEND_BASE_URL}/user/signin/callback`
    }, (accessToken, refreshToken, profile, done) => {
        //passport callback function
        console.log('passport callback function fired')
        console.log(profile)

        //Find existing user or add new user to the database.
        async function findOrAddUser(){
            try{
                let currentUser = await User.findOne({github_id: profile.id})

                //If user exists, create cookie for user.
                if(currentUser){
                    console.log("current user was found")
                    done(null, currentUser)
                    return currentUser

                //If user is new, add them to the database and create a cookie for them.
                }else{
                    let newUser = await new User({
                        access_token: accessToken,
                        github_id: profile.id,
                    }).save()
                    done(null, newUser)
                    console.log("new user:" + newUser)
                    return newUser
                }

            }catch(err){
                console.log(error)
            }
        }

        async function addCandidate(){
            let userInfo = await findOrAddUser()
            let currentCandidate = await Candidate.findOne({user_id: userInfo.id})

            try{
                //If candidate does not exist, create new candidate
                if(!currentCandidate){
                    console.log('creating new Candidate')
                    let newCandidate = await new Candidate({
                        user_id: userInfo.id,
                        username: profile._json.login,
                        github: profile._json.login,
                        image: profile._json.avatar_url
                    }).save()
                    
                    console.log(newCandidate)
                }
            }catch(err){
                console.log(err)
            }
        }

        addCandidate()
    })
)