const Attempt = require('../models/Attempt')
const AWS = require('aws-sdk');
const uuidv1 = require('uuid/v1');
var FormData = require('form-data');
const axios = require('axios')

// returns a list of attempts, with populated candidate or challenge data, depending on the idtype.
// http://localhost:5000/candidates/5df865457947111ec1a81cad/attempts
// http://localhost:5000/challenges/5df865447947111ec1a81ca7/attempts
const index = async (req, res) => {
    let {idtype, id} = req.params

    try{
        if (idtype === 'candidates'){
            const candidateAttempts = await Attempt.find({candidate_id: id}).populate({
                path: 'challenge_id',
                model: 'challenge'
            }).populate({
                path: 'candidate_id',
                model: 'candidate'
            })

            res.status(200).send(candidateAttempts)

        }
        else if (idtype === 'challenges'){
            const challengeAttempts = await Attempt.find({challenge_id: id}).populate({
                path: 'candidate_id',
                model: 'candidate'
            }).populate({
                path: 'challenge_id',
                model: 'challenge'
            })
            res.status(200).send(challengeAttempts)
        }

    } catch(error){
        res.status(404).send(error)
    }
}

//Will create a new challenge attempt. Should be triggered when the user starts the challenge. req.body should contain the challenge_id and the candidate_id. 
//QUESTION: how should we deal with the uuid field??
const create = async(req, res) => {
    try{
        const data = req.body;
        data.status = 'STARTED'
        data.submission_file = 'null'

        await Attempt.create(data)
        res.send(data)
    } catch(error){
        res.status(404).send(error)
    }
}

const update = async(req, res) => {
    console.log("in attempt update")
    console.log(`req.body 1 ${JSON.stringify(req.body)}`)
    console.log(`req ${JSON.stringify(req)}`)
    // console.log(req.files)
    
    // look up the attempt by the attempt uuid 
    //send the req.body to michaels API "https://stg-real-code-runner.herokuapp.com/submissions"
    // if successful, save attempt.status to "SUBMITTED"
    // return the results of Michaels API call 
    const updatedAttempt = await Attempt.findOne({ 'uuid': req.body.external_user_identifier})
    console.log(`found attempt ${updatedAttempt}`)

    const data = req.body

    // send req.body to michaels server
    //send the req.body to michaels API "https://stg-real-code-runner.herokuapp.com/submissions"
    var bodyFormData = new FormData();
    console.log("after new form data")
    for (key in data){
        console.log(`saving key ${JSON.stringify(key)} ${JSON.stringify(data[key])}`)
        bodyFormData.append(JSON.stringify(key), JSON.stringify(data[key]));
    }

    try{

        // bodyFormData.append('userName', 'Fred');
        // bodyFormData.append('file', imageFile); 
        // user_token: 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6ImE4MGE5MGEwLTAwZTctNDQ0Yy1hMDgzLWY3ZWI5YjU4ZjgxZiIsImV4cCI6MTU4NDQ5NjQyNX0.ekjDzZNUjFsTS3dmZCKOWPyY29_uJM7rMC6P_ipAu9M',
        // submission: [Object: null prototype] {
        //   challenge_id: 'd618a0cf-80f5-4368-acda-bd6f8f296ba0',
        //   external_user_identifier: '764aa5d0-3b1f-11ea-acfb-439a69150d3b',
        //   url: '',
        //   text: '<h1>hello</h1>'
        // }
        console.log("after body form data")
        console.log(`body form data ${bodyFormData}`)

        let response = await axios({
            method: 'post',
            url: 'https://stg-real-code-runner.herokuapp.com/submissions',
            data: bodyFormData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Cookie': "HnKFn0EwUl%2FPhBDmb6sGN4TX645oU7q7qwIUkQ3orUZdMSQNXapV4VI8jauY6Dqc%2BxZWfMlxYY9fbCOZzF6ZSqagMioHmqYWwnSS0dZxFFjxo00eAT9V9gqiKjgsNkoqgzMrBRskIQ7pz6ruy5zpeftIrsPc7Cdw8x%2B%2FIngEXZz1tnLgnXpUMAQQWYioTzdBPCLTOA772MNUyG%2Fsbeg8yCxlJgWiJQDOIb%2BRpLVozTIifYwaTPmW1Qnj1%2FBDWSjTuqIcUoZHtU%2FomEMPraWlHhbWHs25d7NuVjBkXrvPYibkITB8Ws8qtC8A0rR14qdbtejBQT%2FIzcziyh5b2zsWcvlp4R26ojqoucQIcIb6541w1DriQ3dKXktiqpkVAp0kXQ%2F7fo7jornVCenQ81B9B8uSGAFXchiBO17rr4izbojsbQfKHzn595qFgMWHOTPf%2Bl0hdZF75BKPWA6IP7ul0nIGykdq--neNSH66Gh3JzVez%2F--Vqqrg1Eo3D%2F7uYf5VFVgvw%3D%3D"
             }
        })

        console.log(`response ${response}`)



            
        // if () {
        //     updatedAttempt[status] = "RESULTS PENDING"
        //     await Attempt.updateOne({_id: updatedAttempt._id}, updatedAttempt);

        //     res.send(updatedAttempt)
        // } else {

        // }
        res.send(updatedAttempt)
    } catch(error){
        if (error.response) {
            /*
             * The request was made and the server responded with a
             * status code that falls out of the range of 2xx
             */
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            res.status(404).send(error.response)
        } else if (error.request) {
            /*
             * The request was made but no response was received, `error.request`
             * is an instance of XMLHttpRequest in the browser and an instance
             * of http.ClientRequest in Node.js
             */
            console.log(error.request);
            res.status(404).send(error.request)
    } else {
            // Something happened in setting up the request and triggered an Error
            console.log('Error', error.message);
            res.status(404).send(error.message)
    }
    }
}

const upload = async(req, res) => {
    console.log(process.env.BUCKET)
    console.log('hit file upload route')
    const { image } = req.files

    let fileParams = {
        Bucket: process.env.BUCKET,
        Body: image[0].buffer,
        Key: uuidv1(),
        ACL: 'public-read',
        ContentType: image[0].mimetype
    }

    let s3credentials = new AWS.S3({
        accessKeyId: process.env.ACCESSKEYID,
        secretAccessKey: process.env.SECRETACCESSKEY
    });

    s3credentials.upload(fileParams, (err, data) => {
        if (err) {
            res.send('you got an error')
        } else {
            console.log(data.Location)
            res.send('all good')
        }
    })
    //TODO: Should now update attempts array with the URL of where this file is stored on s3. You can find the URL using data.Location.
}

const destroy = async(req, res) => {
    try{
        await Attempt.deleteOne({_id: req.params.attemptid})
        res.send('Attempt has been destroyed');
    } catch(error){
        res.status(404).send(error)
    }
}

const result = async(req, res) => {
    try{

    } catch(error){
        res.status(404).send(error)
    }
}

module.exports = {
    index,
    create,
    update,
    destroy,
    result,
    upload
}