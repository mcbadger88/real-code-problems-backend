const Challenge = require('../models/Challenge')
const Features = require('../models/Feature')

const index = async (req, res) => {
    try{
        const allChallenges = await Challenge.find({});
        res.send(allChallenges);
    } catch(error){
        res.status(404).send(error);
    };
};

// A lot of work needs to be done here. The features should be automatically generated from the zipfile, the zip file must be an actuall S3 file that we can open and read, and WOW SO MUCH ASK FOR HEALP!
const create = async(req, res) => {
    try{
        const data = req.body;
        data.active = true;

        // Create "features"... somehow
        const zipFile = require(data.zipFileLocation)
        // for (feature of zipFile.features) {
        //     const newFeature = feature.functionThatMakesThisDBFriendly()
        //     await Feature.create(newFeature)
        // }

        data.features = [];
        await Challenge.create(data);
        res.send(data);
    } catch(error){
        res.status(404).send(error);
    };
};

const show = async(req, res) => {
    try{
        const challenge = await Challenge.findById(req.params.id);
        res.send(challenge);
    } catch(error){
        res.status(404).send(error);
    };
};

// requires body object as such: {active: false}
const update = async(req, res) => {
    try{
        const newChallenge = await Challenge.findById(req.params.id);
        const data = req.body;
        for (key in data) {
            console.log(`Challenge ${key} is ${newChallenge[key]}, which now becomes ${data[key]}`)
            newChallenge[key] = data[key]
            await Challenge.updateOne({_id: newChallenge._id}, newChallenge)
        }
        res.send(newChallenge);
    } catch(error){
        res.status(404).send(error)
    }
}

const destroy = async(req, res) => {
    try{
        await Challenge.deleteOne({_id: req.params.id})
        res.send("Challenge has been destroyed.")
    } catch(error){
        res.status(404).send(error)
    }
}

module.exports = {
    index,
    create,
    show,
    update,
    destroy
}