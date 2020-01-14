const Feature = require('../models/Feature')
const Challenge = require('../models/Challenge')

//Shows all features related to the challenge (using its challenge ID), populated with all related scenarios and their testlines.
const index = async(req, res) => {
    try{
        const features = await Challenge.findOne({_id: req.params.id}).populate({
            path: 'features',
            model: 'feature', 
            populate: {
                path:'scenarios.0.testLines',
                model: 'testLine'
            }
        })

        res.send(features)

    } catch(error){
        res.status(404).send(error);
    };
};

module.exports = {
    index
}