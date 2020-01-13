const Feature = require('../models/Feature')

//Index of all features currently in the database.
const index = async (req, res) => {
    try{
        const allFeatures = await Feature.find({});
        res.send(allFeatures);
    } catch(error){
        res.status(404).send(error);
    };
};

//Shows one feature using its ID.
const show = async(req, res) => {
    try{
        const feature = await Feature.findById(req.params.id).populate({
            path: 'scenarios',
            populate: {
                path: 'testLines',
                model: 'testLine'
            }
        });

        const feature2 = await Feature.findById(req.params.id)

        // const scenario = feature.scenarios[0].toObject().testLines.
        res.send([feature, feature2]);

    } catch(error){
        res.status(404).send(error);
    };
};

//Shows one feature and all of its test lines, using its ID.
// const showTestLines = async(req, res) => {
//     try{
//         const feature = await Feature.findById(req.params.id);
//         // feature.scenarios.populate('testLines').execPopulate((err, testLines) => {
//         //     console.log('populated feature with their test lines' + testLines)
//         // })
//         res.send(feature.scenarios);
//     } catch(error){
//         res.status(404).send(error);
//     };
// };


//Destroy a feature using its ID.
const destroy = async(req, res) => {
    try{
        await Feature.deleteOne({_id: req.params.id})
        res.send("Feature has been destroyed.")
    } catch(error){
        res.status(404).send(error)
    }
}

module.exports = {
    index,
    // create,
    show,
    // update,
    destroy
}