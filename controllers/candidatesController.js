const Candidate = require('../models/Candidate');

const index = async (req, res) => {
    try{
        const allCandidates = await Candidate.find({});
        res.send(allCandidates);
    } catch(error){
        res.status(404).send(error);
    }
}

const create = async (req, res) => {
    try{
       const data = req.body;
       data.attempts = [];
       await Candidate.create(data);
       res.send(data);
    } catch(error){
        res.status(404).send(error);
    }
}

const show = async(req, res) => {
    try{
        const candidate = await Candidate.findById(req.params.id);
        res.send(candidate);
    } catch(error){
        res.status(404).send(error);
    }
}

const update = async(req, res) => {
    try{
        const newCandidate = await Candidate.findById(req.params.id);
        const data = req.body;
        for (key in data) {
            console.log(`Candidate ${key} is ${newCandidate[key]}, which now becomes ${data[key]}`)
            newCandidate[key] = data[key]
            await Candidate.updateOne({_id: newCandidate._id}, newCandidate)
        }
        res.send(newCandidate);
    } catch(error){
        res.status(404).send(error)
    }
}

const destroy = async(req, res) => {
    try{
        await Candidate.deleteOne({_id: req.params.id})
        res.send("Candidate has been destroyed.")
    } catch(error){
        res.status(404).send(error)
    }
}

const lookup = async(req, res) => {
    try{
        const candidate = await Candidate.findOne({user_id: req.params.id});
        res.send(candidate)
    } catch(error){
        res.status(404).send(error)
    }
}

module.exports = {
    index,
    create,
    show,
    update,
    destroy,
    lookup
}