// require all models
const Attempt = require('../models/Attempt');
const Candidate = require('../models/Candidate');
const Challenge = require('../models/Challenge');
const Feature = require('../models/Feature');
const Role = require('../models/Role');
const TestLine = require('../models/TestLine');
const User = require('../models/User');
const uuidv1 = require('uuid/v1')

// const seedAll = async (req, res) => {
//     try{
//         console.log("Seeding...");
//         // TestLines
//         const testLines = [
//             {
//                 testString: `And follows "New Article"                `,
//                 helperImage: "https://raw.githubusercontent.com/saramic/real-code-challenge-blog/master/helper_images/01_and_follows_new_article.jpg",
//                 lineNumber: 8
//             },
//             {
//                 testString: `Then she sees a "New Article" form`,
//                 helperImage: "https://raw.githubusercontent.com/saramic/real-code-challenge-blog/master/helper_images/02_then_she_sees_a_new_article_form.jpg",
//                 lineNumber: 10
//             },
//             {
//                 testString: `When she fills in the feilds`,
//                 helperImage: "https://raw.githubusercontent.com/saramic/real-code-challenge-blog/master/helper_images/03_when_she_fills_in_the_fields.jpg",
//                 lineNumber: 12
//             },
//             {
//                 testString: `Then "she" sees success message "Article was successfully created."`,
//                 helperImage: "https://raw.githubusercontent.com/saramic/real-code-challenge-blog/master/helper_images/04_then_she_sees_success_message_article_was_successfully_created.jpg",
//                 lineNumber: 12
//             },
//             {
//                 testString: `And "she" sees the article with the content`,
//                 helperImage: "https://raw.githubusercontent.com/saramic/real-code-challenge-blog/master/helper_images/05_and_she_sees_the_article_with_the_content.jpg",
//                 lineNumber: 18
//             },
//             {
//                 testString: `When "John" comments "Well done"`,
//                 helperImage: "https://raw.githubusercontent.com/saramic/real-code-challenge-blog/master/helper_images/06_when_john_comments_well_done.jpg",
//                 lineNumber: 13
//             },
//             {
//                 testString: `Then "he" sees success message "Comment was successfully created."`,
//                 helperImage: "https://raw.githubusercontent.com/saramic/real-code-challenge-blog/master/helper_images/07_then_he_sees_success_message_comment_was_successfully_created.jpg",
//                 lineNumber: 15
//             }
//         ];
//         for (testLine of testLines) {
//             await TestLine.create(testLine);
//         };
//         const allTestLines = await TestLine.find({});
//         // Features
//         const features = [
//             {
//                 title: "Can create blog posts",
//                 number: 1,
//                 scenarios: [
//                     {
//                         scenarioTitle: "Jane goes to the site and creates a blog post",
//                         lineNumbers: [allTestLines[0]._id, allTestLines[1]._id, allTestLines[2]._id, allTestLines[3]._id, allTestLines[4]._id]
//                     }
//                 ]
//             },
//             {
//                 title: "Can comment on blog posts",
//                 number: 2,
//                 scenarios: [
//                     {
//                         scenarioTitle: "John and James comment on Jane's blog post",
//                         lineNumbers: [allTestLines[5]._id, allTestLines[6]._id]
//                     }
//                 ]
//             }
//         ];
//         for (feature of features) {
//             await Feature.create(feature);
//         };
//         const allFeatures = await Feature.find({});
//         // Challenges
//         const challenges = [
//             {
//                 title: "Blog Challenge",
//                 description: "Make a blog post",
//                 zipFileLocation: "https://github.com/saramic/real-code-challenge-blog/archive/master.zip",
//                 active: true,
//                 features: [allFeatures[0]._id, allFeatures[1]._id]
//             }
//         ];
//         for (challenge of challenges) {
//             await Challenge.create(challenge);
//         };
//         const allChallenges = await Challenge.find({});
//         // Roles
//         const roles = [
//             {
//                 uuid: "AIDS",
//                 name: "admin"
//             },
//             {
//                 uuid: "cheese wizz",
//                 name: "audiance"
//             }
//         ];
//         for (role of roles) {
//             await Role.create(role);
//         };
//         const allRoles = await Role.find({});
//         // Users
//         const users = [
//             {
//                 access_token: "something wiggity wack, yo",
//                 role_id: allRoles[0]._id
//             },
//             {
//                 access_token: "This one's pretty mild.",
//                 role_id: allRoles[1]._id
//             },
//             {
//                 access_token: "AIDS!",
//                 role_id: allRoles[1]._id
//             }
//         ];
//         for (user of users) {
//             await User.create(user);
//         };
//         const allUsers = await User.find({});
//         // Candidates
//         const candidates = [
//             {
//                 user_id: allUsers[1]._id,
//                 firstname: "Jerry",
//                 lastname: "Seinfeild",
//                 linkedin: "jerrysignfeild@linkedin.com",
//                 github: "jsmith@github.com",
//                 bio: "[laugh track]",
//                 image: "https://images-na.ssl-images-amazon.com/images/I/81GL-27MwDL._SY500_.jpg",
//                 attempts: [],
//                 username: "YouLikeJazz?"
//             },
//             {
//                 user_id: allUsers[2]._id,
//                 firstname: "Keanu",
//                 lastname: "Reeves",
//                 linkedin: "actualjohnwick@linkedin.com",
//                 github: "totallyimmortal@github.com",
//                 bio: "[unequivical lad]",
//                 image: "https://dlisted.com/wp-content/uploads/2019/06/Keannnu.jpg",
//                 attempts: [],
//                 username: "YOU'REbreathtaking"
//             }
//         ];
//         for (candidate of candidates) {
//             await Candidate.create(candidate);
//         };
//         let allCandidates = await Candidate.find({});
//         // Attempts
//         const attempts = [
//             {
//                 status: "GET OUT",
//                 candidate_id: allCandidates[0],
//                 challenge_id: allChallenges[0],
//                 submission_file: null,
//                 results_log: "https://raw.githubusercontent.com/saramic/real-code-challenge-blog/master/mock_submissions/all_failing.json",
//                 uuid: 13,
//             },
//             {
//                 status: "PASSED",
//                 candidate_id: allCandidates[1],
//                 challenge_id: allChallenges[0],
//                 submission_file: null,
//                 results_log: "https://raw.githubusercontent.com/saramic/real-code-challenge-blog/master/mock_submissions/all_passing.json",
//                 uuid: 42,
//             },
//             {
//                 status: "STARTED",
//                 candidate_id: allCandidates[0],
//                 challenge_id: allChallenges[0],
//                 submission_file: null,
//                 results_log: "https://raw.githubusercontent.com/saramic/real-code-challenge-blog/master/mock_submissions/all_passing.json",
//                 uuid: 69,
//             }
//         ];
//         for (attempt of attempts) {
//             await Attempt.create(attempt);
//         };
//         const allAttempts = await Attempt.find({});
//         for (attempt of allAttempts) {
//             const data = await Candidate.findOne({_id: attempt.candidate_id})
//             data.attempts.push(attempt._id)
//             await Candidate.updateOne({_id: attempt.candidate_id}, data)
//         }
//         allCandidates = await Candidate.find({});
//         const db = {
//             attempts: allAttempts,
//             candidates: allCandidates,
//             challenges: allChallenges,
//             features: allFeatures,
//             roles: allRoles,
//             testLines: allTestLines,
//             users: allUsers
//         }
//         res.send(db)
//     }catch(error){
//         res.status(404).send(error)
//         console.log(error)
//     }
// }

// const resetDb = async (req, res) => {
//     try{
//         console.log("Reseting Database");
//         await Attempt.deleteMany();
//         await Candidate.deleteMany();
//         await Challenge.deleteMany();
//         await Feature.deleteMany();
//         await Role.deleteMany();
//         await TestLine.deleteMany();
//         await User.deleteMany();
//         const db = {
//             attempts: await Attempt.find({}),
//             candidates: await Candidate.find({}),
//             challenges: await Challenge.find({}),
//             features: await Feature.find({}),
//             roles: await Role.find({}),
//             testLines: await TestLine.find({}),
//             users: await User.find({})
//         }
//         res.send(db);
//     } catch(error){
//         res.status(404).send(error);
//         console.log(error)
//     }
// }

const seedAll = async (req, res) => {
        try{
            console.log("Seeding...");
            // TestLines
            const testLines = [
                {
                    testString: "Given a static file, pass a static fail via the \"ENTRY_POINT\" environment variable as in\n\nENTRY_POINT=path/to/my/file docker-compose up",
                    helperImage: null,
                    lineNumber: 21
                },
                {
                    testString: `Then it has a \"h1\" with the text \"Welcome to Real Code Problems\"`,
                    helperImage: null,
                    lineNumber: 23
                },
                {
                    testString: `And the following elements with text`,
                    helperImage: "https://raw.githubusercontent.com/saramic/real-code-challenge-blog/master/helper_images/04_then_she_sees_success_message_article_was_successfully_created.jpg",
                    lineNumber: 12
                },
                {
                    testString: "Given a static file, pass a static fail via the \"ENTRY_POINT\" environment variable as in\n\nENTRY_POINT=path/to/my/file docker-compose up",
                    helperImage: null,
                    lineNumber: 4
                },
                {
                    testString: "Then it has some pieces of text on the page",
                    helperImage: null,
                    lineNumber: 6
                },
                {
                    testString: "Given a static file, pass a static fail via the \"ENTRY_POINT\" environment variable as in\n\nENTRY_POINT=path/to/my/file docker-compose up",
                    helperImage: null,
                    lineNumber: 12
                },
                {
                    testString: "Then it has a \"h1\" with the text \"Welcome to Real Code Problems\", need a \"h1\" html tag as in\n\n<h1>Welcome to Real Code Problems</h1>",
                    helperImage: "https://stg-real-code-runner.herokuapp.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBKdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--6c03d570c51cfb82441662c7e903127e8a6eb7f5/introduction-helper_images-feature_01_heading.png",
                    lineNumber: 14
                },
                {
                    testString: "And the following elements with text. You need a \"h1\" html tag as in\n\n<h1>Welcome to Real Code Problems</h1>, you need a \"p\" html tag as in\n\n<p>Real code problems help you learn how to code while solving real problems.</p>",
                    helperImage: "https://stg-real-code-runner.herokuapp.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBLQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--0a658e096eec96a17102efba7f49b2af145cebba/introduction-helper_images-feature_01_paragraph.png",
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
                    title: "Get started with web app testing some basic HTML",
                    number: 1,
                    scenarios: [
                        {
                            scenarioTitle: "Get some text on a page",
                            lineNumbers: [testLines[3], testLines[4]]
                        },
                        {
                            scenarioTitle: "Put the text in appropriate tags `h1` and a `p` tag",
                            lineNumbers: [testLines[5], testLines[6], testLines[7]]
                        },
                        {
                            scenarioTitle: "Scope text behind page fragmets identified by data-testid's",
                            lineNumbers: [testLines[0], testLines[1], testLines[2]]
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
                    title: "Introduction",
                    description: "# Real Code Challenge - Introduction\n\nAn introduction to the concepts to Real Code Challenges.\n\nThe Introduction will take you through the process of becoming accustomed to\nthe format of the challenge and assciated tests. In no time you will be solving\nBDD (Behaviour Driven Development) test cases to develop a working web app.\n\nThis will include:\n\n- providing a text based answer\n- running the test cases locally\n_comming soon:_\n  - getting accustomed to page fragments and identifying parts of the working\n    app using `data-testid`'s\n  - submitting a hosted solution using a URL\n  - submitting a fully standalone ZIP of a working solution\n  - more advanced work to predefine state of data in your solution\n\n## Test cases\n\n1. [Feature 01 get some static text on a web page](./features/feature_01_get_some_static_text_on_a_web_page.feature)\n\n## Running\n\nonce downloaded locally run it locally against a solution\n\n``` sh\nENTRY_POINT=solutions/index_5.html make build\n```\n\nor run using docker-compose\n``` sh\nENTRY_POINT=solutions/index_5.html docker-compose up\n# OR\nENTRY_POINT=solutions/index_5.html docker-compose run --rm features\n# OR\ndocker-compose run --rm -e ENTRY_POINT=solutions/index_5.html features\n```\n\n",
                    zipFileLocation: "https://github.com/saramic/real-code-challenge-blog/archive/master.zip",
                    active: true,
                    externalIdentifier: "d618a0cf-80f5-4368-acda-bd6f8f296ba0",
                    features: [allFeatures[0]._id]
                }
            ];
            for (challenge of challenges) {
                await Challenge.create(challenge);
            };
            const allChallenges = await Challenge.find({});
            // Roles
            // const roles = [
            //     {
            //         uuid: uuidv1(),
            //         name: "admin"
            //     },
            //     {
            //         uuid: uuidv1(),
            //         name: "audiance"
            //     }
            // ];
            // for (role of roles) {
            //     await Role.create(role);
            // };
            // const allRoles = await Role.find({});
            // // Users
            // const users = [
            //     {
            //         access_token: "something wiggity wack, yo",
            //         role_id: allRoles[0]._id
            //     },
            //     {
            //         access_token: "This one's pretty mild.",
            //         role_id: allRoles[1]._id
            //     },
            //     {
            //         access_token: "AIDS!",
            //         role_id: allRoles[1]._id
            //     }
            // ];
            // for (user of users) {
            //     await User.create(user);
            // };
            // const allUsers = await User.find({});
            // // Candidates
            // const candidates = [
            //     {
            //         user_id: allUsers[1]._id,
            //         firstname: "Jerry",
            //         lastname: "Seinfeild",
            //         linkedin: "jerrysignfeild@linkedin.com",
            //         github: "jsmith@github.com",
            //         bio: "[laugh track]",
            //         image: "https://images-na.ssl-images-amazon.com/images/I/81GL-27MwDL._SY500_.jpg",
            //         attempts: [],
            //         username: "YouLikeJazz?"
            //     },
            //     {
            //         user_id: allUsers[2]._id,
            //         firstname: "Keanu",
            //         lastname: "Reeves",
            //         linkedin: "actualjohnwick@linkedin.com",
            //         github: "totallyimmortal@github.com",
            //         bio: "[unequivical lad]",
            //         image: "https://dlisted.com/wp-content/uploads/2019/06/Keannnu.jpg",
            //         attempts: [],
            //         username: "YOU'REbreathtaking"
            //     }
            // ];
            // for (candidate of candidates) {
            //     await Candidate.create(candidate);
            // };
            // let allCandidates = await Candidate.find({});
            // // Attempts
            // const attempts = [
            //     {
            //         status: "GET OUT",
            //         candidate_id: allCandidates[0],
            //         challenge_id: allChallenges[0],
            //         submission_file: null,
            //         results_log: "https://raw.githubusercontent.com/saramic/real-code-challenge-blog/master/mock_submissions/all_failing.json",
            //         uuid: 13,
            //     },
            //     {
            //         status: "PASSED",
            //         candidate_id: allCandidates[1],
            //         challenge_id: allChallenges[0],
            //         submission_file: null,
            //         results_log: "https://raw.githubusercontent.com/saramic/real-code-challenge-blog/master/mock_submissions/all_passing.json",
            //         uuid: 42,
            //     },
            //     {
            //         status: "STARTED",
            //         candidate_id: allCandidates[0],
            //         challenge_id: allChallenges[0],
            //         submission_file: null,
            //         results_log: "https://raw.githubusercontent.com/saramic/real-code-challenge-blog/master/mock_submissions/all_passing.json",
            //         uuid: 69,
            //     }
            // ];
            // for (attempt of attempts) {
            //     await Attempt.create(attempt);
            // };
            // const allAttempts = await Attempt.find({});
            // for (attempt of allAttempts) {
            //     const data = await Candidate.findOne({_id: attempt.candidate_id})
            //     data.attempts.push(attempt._id)
            //     await Candidate.updateOne({_id: attempt.candidate_id}, data)
            // }
            // allCandidates = await Candidate.find({});
            const db = {
                // attempts: allAttempts,
                // candidates: allCandidates,
                challenges: allChallenges,
                features: allFeatures,
                // roles: allRoles,
                testLines: allTestLines,
                // users: allUsers
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