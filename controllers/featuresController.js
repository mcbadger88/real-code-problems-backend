const Feature = require('../models/Feature')

//Shows one feature (using its feature ID), populated with all related testlines.
const showWithTestLines = async(req, res) => {
    try{
        const feature = await Feature.findById(req.params.id).populate({
            path: 'scenarios.0.testLines',
            model: 'testLine'
        })

        res.send(feature);

    } catch(error){
        res.status(404).send(error);
    };
};

module.exports = {
    showWithTestLines,
}