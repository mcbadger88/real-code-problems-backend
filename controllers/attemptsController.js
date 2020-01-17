const Attempt = require('../models/Attempt')
const AWS = require('aws-sdk');
const uuidv1 = require('uuid/v1');

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
    try{
       const updatedAttempt = await Attempt.findById(req.params.attemptid);
       const data = req.body;
       for (key in data){
           updatedAttempt[key] = data[key]
           await Attempt.updateOne({_id: updatedAttempt._id}, updatedAttempt);
       }
       res.send(updatedAttempt)
    } catch(error){
        res.status(404).send(error)
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