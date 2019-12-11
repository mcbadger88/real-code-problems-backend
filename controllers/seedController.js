// require all models
const Attempt = require('../models/Attempt');
const Candidate = require('../models/Candidate');
const Challenge = require('../models/Challenge');
const Feature = require('../models/Feature');
const Role = require('../models/Role');
const TestLine = require('../models/TestLine');
const User = require('../models/User');

const seedAll = async (req, res) => {
    try{
        console.log("Seeding...");
        // TestLines
        const testLines = [
            {
                testString: `When "Jane" visits the main page`,
                helperImage: "link_to_image",
                lineNumber: 7
            },
            {
                testString: `And follows "New Article"`,
                helperImage: "link_to_image",
                lineNumber: 8
            },
            {
                testString: `Then she sees a "New Article" form`,
                helperImage: "link_to_image",
                lineNumber: 10
            },
            {
                testString: `When she fills in the fields`,
                helperImage: "link_to_image",
                lineNumber: 12
            },
            {
                testString: `And she clicks "Create Article"`,
                helperImage: "link_to_image",
                lineNumber: 15
            },
            {
                testString: `Then "she" sees success message "Article was successfully created."`,
                helperImage: "link_to_image",
                lineNumber: 17
            }
        ];
        for (testLine of testLines) {
            await TestLine.create(testLine);
        };
        const allTestLines = await TestLine.find({});
        // Features
        const features = [
            {
                title: "Make a header",
                number: 1,
                scenarios: [
                    {
                        scenarioTitle: "Make a header",
                        lineNumbers: [allTestLines[0]._id, allTestLines[1]._id, allTestLines[2]._id]
                    }
                ]
            },
            {
                title: "Make a footer",
                number: 2,
                scenarios: [
                    {
                        scenarioTitle: "Make a footer",
                        lineNumbers: [allTestLines[3]._id, allTestLines[4]._id, allTestLines[5]._id]
                    }
                ]
            }
        ];
        for (feature of features) {
            await Feature.create(feature);
        };
        const allFeatures = await Feature.find({});
        // Challenges
        const challenges = [
            {
                title: "Blog Post",
                description: "Make a blog post",
                zipFileLocation: "Uh... here ->",
                active: true,
                features: [allFeatures[0]._id, allFeatures[1]._id]
            }
        ];
        for (challenge of challenges) {
            await Challenge.create(challenge);
        };
        const allChallenges = await Challenge.find({});
        // Roles
        const roles = [
            {
                uuid: "admin",
                name: "admin"
            },
            {
                uuid: "some dude",
                name: "some dude"
            }
        ];
        for (role of roles) {
            await Role.create(role);
        };
        const allRoles = await Role.find({});
        // Users
        const users = [
            {
                access_token: "something wiggity wack, yo",
                role_id: allRoles[0]._id
            },
            {
                access_token: "This one's pretty mild.",
                role_id: allRoles[1]._id
            },
            {
                access_token: "AIDS!",
                role_id: allRoles[1]._id
            }
        ];
        for (user of users) {
            await User.create(user);
        };
        const allUsers = await User.find({});
        // Candidates
        const candidates = [
            {
                user_id: allUsers[1]._id,
                firsname: "Jerry",
                lastname: "Seinfeild",
                linkedin: "jerrysignfeild@linkedin.com",
                github: "jsmith@github.com",
                image: "link_to_image",
                attempts: [],
                username: "DoYouLikeJazz?"
            },
            {
                user_id: allUsers[2]._id,
                firsname: "Keanu",
                lastname: "Reeves",
                linkedin: "actualjohnwick@linkedin.com",
                github: "totallyimmortal@github.com",
                image: "link_to_image",
                attempts: [],
                username: "YOU'REbreathtaking"
            }
        ];
        for (candidate of candidates) {
            await Candidate.create(candidate);
        };
        let allCandidates = await Candidate.find({});
        // Attempts
        const attempts = [
            {
                status: "STARTED",
                candidate_id: allCandidates[0],
                challenge_id: allChallenges[0],
                submission_file: "file_location",
                results_log: "log_location",
                uuid: 69,
            },
            {
                status: "PASSED",
                candidate_id: allCandidates[1],
                challenge_id: allChallenges[0],
                submission_file: "file_location",
                results_log: "log_location",
                uuid: 42,
            },
            {
                status: "GET OUT",
                candidate_id: allCandidates[0],
                challenge_id: allChallenges[0],
                submission_file: "file_location",
                results_log: "log_location",
                uuid: 13,
            }
        ];
        for (attempt of attempts) {
            await Attempt.create(attempt);
        };
        const allAttempts = await Attempt.find({});
        for (attempt of allAttempts) {
            const data = await Candidate.findOne({_id: attempt.candidate_id})
            data.attempts.push(attempt._id)
            await Candidate.updateOne({_id: attempt.candidate_id}, data)
        }
        allCandidates = await Candidate.find({});
        const db = {
            attempts: allAttempts,
            candidates: allCandidates,
            challenges: allChallenges,
            features: allFeatures,
            roles: allRoles,
            testLines: allTestLines,
            users: allUsers
        }
        res.send(db)
    }catch(error){
        res.status(404).send(error)
        console.log(error)
    }
}

const resetDb = async (req, res) => {
    try{
        console.log("Reseting Database");
        await Attempt.deleteMany();
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