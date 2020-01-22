//Require in all models
const Attempt = require('../models/Attempt');
const Candidate = require('../models/Candidate');
const Challenge = require('../models/Challenge');
const Feature = require('../models/Feature');
const Role = require('../models/Role');
const TestLine = require('../models/TestLine');
const User = require('../models/User');
const uuidv1 = require('uuid/v1')

const seedAll = async(req, res) => {
    try{
        console.log("seeding database...")

        /// CHALLENGE 1 ///

        // SCENARIO 1 TESTLINES
        const chall1_feature1_scenario1_testLines = [
            {
                testString: "Given a static file, pass a static fail via the \"ENTRY_POINT\" environment variable as in\n\nENTRY_POINT=path/to/my/file docker-compose up",
                helperImage: null,
                lineNumber: 4,
                db_id: null

            },
            {
                testString: "Then it has some pieces of text on the page",
                helperImage: null,
                lineNumber: 6,
                db_id: null

            },
        ];
        
        chall1_feature1_scenario1_testLines.map(async (testline, i) => {
            console.log("index", i, testline)
            let new_testline = {
                testString: testline.testString,
                helperImage: testline.helperImage,
                lineNumber: testline.lineNumber,       
            }
            db_id = await TestLine.create(new_testline);
            chall1_feature1_scenario1_testLines[i].db_id = db_id._id
        })



        //SCENARIO 2 TESTLINES
        const chall1_feature1_scenario2_testLines = [
            {
                testString: "Given a static file, pass a static fail via the \"ENTRY_POINT\" environment variable as in\n\nENTRY_POINT=path/to/my/file docker-compose up",
                helperImage: null,
                lineNumber: 12,
                db_id: null
            },
            {
                testString: "Then it has a \"h1\" with the text \"Welcome to Real Code Problems\", need a \"h1\" html tag as in\n\n<h1>Welcome to Real Code Problems</h1>",
                helperImage: "https://stg-real-code-runner.herokuapp.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBKdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--6c03d570c51cfb82441662c7e903127e8a6eb7f5/introduction-helper_images-feature_01_heading.png",
                lineNumber: 14,
                db_id: null

            },
            {
                testString: "And the following elements with text",
                helperImage: "https://stg-real-code-runner.herokuapp.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBLQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--0a658e096eec96a17102efba7f49b2af145cebba/introduction-helper_images-feature_01_paragraph.png",
                lineNumber: 15,
                db_id: null

            }
        ];

        
        chall1_feature1_scenario2_testLines.map(async (testline, i) => {
            console.log("index", i, testline)
            let new_testline = {
                testString: testline.testString,
                helperImage: testline.helperImage,
                lineNumber: testline.lineNumber,       
            }
            db_id = await TestLine.create(new_testline);
            chall1_feature1_scenario2_testLines[i].db_id = db_id._id
        })

        //SCENARIO 3 TESTLINES
        const chall1_feature1_scenario3_testLines = [
            {
                testString: "Given a static file, pass a static fail via the \"ENTRY_POINT\" environment variable as in\n\nENTRY_POINT=path/to/my/file docker-compose up",
                helperImage: null,
                lineNumber: 21,
                db_id: null
            },
            {
                testString: `Then it has a \"h1\" with the text \"Welcome to Real Code Problems\"`,
                helperImage: null,
                lineNumber: 23,
                db_id: null
            },
            {
                testString: "And the following elements with text",
                helperImage: "https://stg-real-code-runner.herokuapp.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBLQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--0a658e096eec96a17102efba7f49b2af145cebba/introduction-helper_images-feature_01_paragraph.png",
                lineNumber: 24,
                db_id: null
            }
        ];


        chall1_feature1_scenario3_testLines.map(async (testline, i) => {
            console.log("index", i, testline)
            let new_testline = {
                testString: testline.testString,
                helperImage: testline.helperImage,
                lineNumber: testline.lineNumber,       
            }
            db_id = await TestLine.create(new_testline);
            console.log("aftercreate", db_id)
            chall1_feature1_scenario3_testLines[i].db_id = db_id._id
        })


        let i 
        for(i=0; i < 10000000000; i++) {
            const a = "lol"
        }

        const allTestLines = await TestLine.find({});

        console.log("chall1_feature1_scenario2_testLines")
        console.log(chall1_feature1_scenario2_testLines)//array

        console.log("chall1_feature1_scenario3_testLines")
        console.log(chall1_feature1_scenario3_testLines)//array
        // CHALLENGE 1 FEATURE 1:
        const chall1_feature1 = {
            db_id: null,
            title: "Get started with web app testing some basic HTML",
            number: 1,
            scenarios: [
                {
                    scenarioTitle: "Get some text on a page",
                    testLines: [
                        chall1_feature1_scenario1_testLines[0].db_id, chall1_feature1_scenario1_testLines[1].db_id,
                    ]
                },
                {
                    scenarioTitle: "Put the text in appropriate tags `h1` and a `p` tag",
                    testLines: [
                        chall1_feature1_scenario2_testLines[0].db_id, chall1_feature1_scenario2_testLines[1].db_id,
                        chall1_feature1_scenario2_testLines[2].db_id
                    ]
                },
                {
                    scenarioTitle: "Scope text behind page fragmets identified by data-testid's",
                    testLines: [
                        chall1_feature1_scenario3_testLines[0].db_id, chall1_feature1_scenario3_testLines[1].db_id,
                        chall1_feature1_scenario3_testLines[2].db_id
                        ]
                }
            ]
        }
        

        const singleFeature = chall1_feature1
        console.log('single feature')
        console.log(singleFeature)
        console.log('singleFeature.scenarios[0]')
        console.log(singleFeature.scenarios[0])
        // console.log(singleFeature.scenarios[0])

        let newFeature = {
            db_id: singleFeature.db_id,
            title: singleFeature.title,
            number: singleFeature.number,
            scenarios: [
                {
                    scenarioTitle: singleFeature.scenarios[0].scenarioTitle,
                    testLines: [
                        singleFeature.scenarios[0].testLines[0], singleFeature.scenarios[0].testLines[1],
                    ]
                },
                {
                    scenarioTitle: singleFeature.scenarios[1].scenarioTitle,
                    testLines: [
                        singleFeature.scenarios[1].testLines[0], singleFeature.scenarios[1].testLines[1],
                        singleFeature.scenarios[1].testLines[2]
                    ]
                },
                {
                    scenarioTitle: singleFeature.scenarios[2].scenarioTitle,
                    testLines: [
                        singleFeature.scenarios[2].testLines[0], singleFeature.scenarios[2].testLines[1],
                        singleFeature.scenarios[2].testLines[2]
                    ]
                },
            ]
        }

        db_id = await Feature.create(newFeature)
        singleFeature.db_id = db_id._id

        const allFeatures = await Feature.find({});


        // ///CHALLENGES///
        const challenges = [
            {
                title: "An Introduction To Real Code Challenges",
                description: "An introduction to the concepts to Real Code Challenges. The Introduction will take you through the process of becoming accustomed to the format of the challenge and associated tests. In no time you will be solvingBDD (Behaviour Driven Development) test cases to develop a working web app.",
                zipFileLocation: "https://github.com/mcbadger88/real-code-problems-challengeZips/raw/master/challenge-introduction.zip",
                active: true,
                features: [chall1_feature1.db_id]
            }
        ];
        for (challenge of challenges) {
            await Challenge.create(challenge);
        };
        const allChallenges = await Challenge.find({});

        //ROLES
        const roles = [
            {
                uuid: uuidv1(),
                name: "admin"
            },
            {
                uuid: uuidv1(),
                name: "audiance"
            }
        ];
        for (role of roles) {
            await Role.create(role);
        };
        const allRoles = await Role.find({});

        const db = {
            challenges: allChallenges,
            features: allFeatures,
            roles: allRoles,
            testLines: allTestLines,
        }
        res.send(db)
    }catch(error){
        res.status(404).send(error.message)
        console.log(error)
    }
}

const resetDb = async (req, res) => {
    try{
        console.log("Reseting Database");
        await Candidate.deleteMany();
        await Challenge.deleteMany();
        await Feature.deleteMany();
        await Role.deleteMany();
        await TestLine.deleteMany();
        await User.deleteMany();
        const db = {
            attempts: await Attempt.find({}),
            candidates: await Candidate.find({}),
            challenges: await Challenge.find({}),
            features: await Feature.find({}),
            roles: await Role.find({}),
            testLines: await TestLine.find({}),
            users: await User.find({})
        }
        res.send(db);
    } catch(error){
        res.status(404).send(error);
        console.log(error)
    }
}

module.exports = {
    seedAll,
    resetDb
}