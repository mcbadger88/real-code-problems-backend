//pls require the model here//

const index = async (req, res) => {
    try{
        res.send('index - features')

    } catch(error){
        res.status(404).send(error)
    }
}

module.exports = {
    index
}