const Attempt = require('../models/Attempt')
const AWS = require('aws-sdk');
const uuidv1 = require('uuid/v1');
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
        const data = {}
        console.log(req.body)
        console.log(typeof(req.body))
        const { candidate_id, challenge_id } = req.body
        data.candidate_id = candidate_id
        data.challenge_id = challenge_id
        data.status = 'STARTED'
        data.submission_file = 'null'
        data.uuid = uuidv1()


        await Attempt.create(data)
        res.send(data)
    } catch(error){
        res.status(404).send(error)
    }
}

const update = async(req, res) => {
    console.log("in attempt update")
    console.log(req.body)

    // look up the attempt by the attempt uuid 
    //send the req.body to michaels API "https://stg-real-code-runner.herokuapp.com/submissions"
    // if successful, save attempt.status to "SUBMITTED"
    // return the results of Michaels API call 
    const updatedAttempt = await Attempt.findOne({ 'uuid': req.body.submission.external_user_identifier})
    console.log(`found attempt ${updatedAttempt}`)

    const data = req.body

    // send req.body to michaels server
    try{
        const authToken = "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6ImE4MGE5MGEwLTAwZTctNDQ0Yy1hMDgzLWY3ZWI5YjU4ZjgxZiIsImV4cCI6MTU4NDc2NjgwMn0.vav1dXN2oAViTOroBOE3Ctk06HFwUHA-bl0gPknYQgE"

        let response = await axios({
            method: 'post',
            url: 'https://stg-real-code-runner.herokuapp.com/submissions',
            data: req.body,
            headers: {
                "AUTHORIZATION": `Token ${authToken}`
             }
        })

        console.log(response.status, "response")
        console.log(typeof(response.status), "response")



            
        if (response.status == 200) {
            updatedAttempt.status = "SUBMITTED"
            await Attempt.updateOne({_id: updatedAttempt._id}, updatedAttempt);
        } 
        res.redirect(`${process.env.FRONTEND_BASE_URL}/challenges/${req.body.submission.challenge_id}/attempts/${req.body.submission.external_user_identifier}/success`)
    } catch(error){
        if (error.response) {
            /*
             * The request was made and the server responded with a
             * status code that falls out of the range of 2xx
             */
            console.log(error.response)
            res.status(404).send(error)
        } else if (error.request) {
            /*
             * The request was made but no response was received, `error.request`
             * is an instance of XMLHttpRequest in the browser and an instance
             * of http.ClientRequest in Node.js
             */
            console.log(error.request);
            res.status(404).send(error)
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