// require all models
const TestLine = require('../models/TestLine')

const seedAll = async (req, res) => {
    try{
        const testLines = [
            {
                testString: `When "Jane" visits the main page`,
                helperImage: link_to_image,
                lineNumberInFile: 7
            },
            {
                testString: `And follows "New Article"                `,
                helperImage: link_to_image,
                lineNumberInFile: 8
            },
            {
                testString: `Then she sees a "New Article" form`,
                helperImage: link_to_image,
                lineNumberInFile: 10
            },
            {
                testString: `When she fills in the fields`,
                helperImage: link_to_image,
                lineNumberInFile: 12
            },
            {
                testString: `And she clicks "Create Article"`,
                helperImage: link_to_image,
                lineNumberInFile: 15
            },
            {
                testString: `Then "she" sees success message "Article was successfully created."`,
                helperImage: link_to_image,
                lineNumberInFile: 17
            }
        ]
        for (testLine of testLines) {
            TestLine.create(testLine)
        }
        const allTestLines = await TestLine.find({})
        res.send(allTestLines)
        // const features = [
        //     {
        //         featureTitle: "Make a header",
        //         featureNumber: 1,
        //         scenarios: [
        //             {
        //                 scenarioTitle: "Make a header",
        //                 lineNumbers: [ObjectId, ObjectId, ObjectId]
        //             }
        //         ]
        //     },
        //     {
        //         featureTitle: "Make a footer",
        //         featureNumber: 1,
        //         scenarios: [
        //             {
        //                 scenarioTitle: "Make a footer",
        //                 lineNumbers: [ObjectId, ObjectId, ObjectId]
        //             }
        //         ]
        //     }
        // ]
        // const challenges = [
        //     {
        //         title: "Blog Post",
        //         description: "Make a blog post",
        //         zipFileLocation: "Uh... here ->",
        //         active: "true",
        //         features: [ObjectId, ObjectId]
        //     }
        // ]
        // const attempts = [
        //     {
        //         status: "Started",
        //         candidate_id: null,
        //         challenge_id: null,
        //         submission_file: "file_location",
        //         results_log: "log_location",
        //         uuid: 69,
        //         created_at: Date.now,
        //         updated_at: Date.now
        //     },
        //     {
        //         status: "Submitted",
        //         candidate_id: null,
        //         challenge_id: null,
        //         submission_file: "file_location",
        //         results_log: "log_location",
        //         uuid: 42,
        //         created_at: Date.now,
        //         updated_at: Date.now
        //     }
        // ]

    } catch(error){
        res.status(404).send(error)
    }
}

const resetDb = async (req, res) => {
    try{
        // Or .remove()
        TestLine.deleteMany({});
        TestLine.deleteMany({});
        TestLine.deleteMany({});
    } catch(error){
        res.status(404).send(error)
    }
}



module.exports = {
    seedAll,
    resetDb
}