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
                testString: `And follows "New Article"                `,
                helperImage: "https://raw.githubusercontent.com/saramic/real-code-challenge-blog/master/helper_images/01_and_follows_new_article.jpg",
                lineNumber: 8
            },
            {
                testString: `Then she sees a "New Article" form`,
                helperImage: "https://raw.githubusercontent.com/saramic/real-code-challenge-blog/master/helper_images/02_then_she_sees_a_new_article_form.jpg",
                lineNumber: 10
            },
            {
                testString: `When she fills in the feilds`,
                helperImage: "https://raw.githubusercontent.com/saramic/real-code-challenge-blog/master/helper_images/03_when_she_fills_in_the_fields.jpg",
                lineNumber: 12
            },
            {
                testString: `Then "she" sees success message "Article was successfully created."`,
                helperImage: "https://raw.githubusercontent.com/saramic/real-code-challenge-blog/master/helper_images/04_then_she_sees_success_message_article_was_successfully_created.jpg",
                lineNumber: 12
            },
            {
                testString: `And "she" sees the article with the content`,
                helperImage: "https://raw.githubusercontent.com/saramic/real-code-challenge-blog/master/helper_images/05_and_she_sees_the_article_with_the_content.jpg",
                lineNumber: 18
            },
            {
                testString: `When "John" comments "Well done"`,
                helperImage: "https://raw.githubusercontent.com/saramic/real-code-challenge-blog/master/helper_images/06_when_john_comments_well_done.jpg",
                lineNumber: 13
            },
            {
                testString: `Then "he" sees success message "Comment was successfully created."`,
                helperImage: "https://raw.githubusercontent.com/saramic/real-code-challenge-blog/master/helper_images/07_then_he_sees_success_message_comment_was_successfully_created.jpg",
                lineNumber: 15
            }
        ];
        for (testLine of testLines) {
            await TestLine.create(testLine);
        };
        const allTestLines = await TestLine.find({});
        // Features
        const features = [
            {
                title: "Can create blog posts",
                number: 1,
                scenarios: [
                    {
                        scenarioTitle: "Jane goes to the site and creates a blog post",
                        lineNumbers: [allTestLines[0]._id, allTestLines[1]._id, allTestLines[2]._id, allTestLines[3]._id, allTestLines[4]._id]
                    }
                ]
            },
            {
                title: "Can comment on blog posts",
                number: 2,
                scenarios: [
                    {
                        scenarioTitle: "John and James comment on Jane's blog post",
                        lineNumbers: [allTestLines[5]._id, allTestLines[6]._id]
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
                title: "Blog Challenge",
                description: "Make a blog post",
                zipFileLocation: "https://github.com/saramic/real-code-challenge-blog/archive/master.zip",
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
                uuid: "AIDS",
                name: "admin"
            },
            {
                uuid: "cheese wizz",
                name: "audiance"
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
                image: "https://images-na.ssl-images-amazon.com/images/I/81GL-27MwDL._SY500_.jpg",
                attempts: [],
                username: "YouLikeJazz?"
            },
            {
                user_id: allUsers[2]._id,
                firsname: "Keanu",
                lastname: "Reeves",
                linkedin: "actualjohnwick@linkedin.com",
                github: "totallyimmortal@github.com",
                image: "https://dlisted.com/wp-content/uploads/2019/06/Keannnu.jpg",
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
                status: "GET OUT",
                candidate_id: allCandidates[0],
                challenge_id: allChallenges[0],
                submission_file: null,
                results_log: "https://raw.githubusercontent.com/saramic/real-code-challenge-blog/master/mock_submissions/all_failing.json",
                uuid: 13,
            },
            {
                status: "PASSED",
                candidate_id: allCandidates[1],
                challenge_id: allChallenges[0],
                submission_file: null,
                results_log: "https://raw.githubusercontent.com/saramic/real-code-challenge-blog/master/mock_submissions/all_passing.json",
                uuid: 42,
            },
            {
                status: "STARTED",
                candidate_id: allCandidates[0],
                challenge_id: allChallenges[0],
                submission_file: null,
                results_log: "https://raw.githubusercontent.com/saramic/real-code-challenge-blog/master/mock_submissions/all_passing.json",
                uuid: 69,
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