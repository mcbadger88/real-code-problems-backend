// // require all models
// const Attempt = require('../models/Attempt');
// const Candidate = require('../models/Candidate');
// const Challenge = require('../models/Challenge');
// const Feature = require('../models/Feature');
// const Role = require('../models/Role');
// const TestLine = require('../models/TestLine');
// const User = require('../models/User');
// const uuidv1 = require('uuid/v1')

// // const seedAll = async (req, res) => {
// //     try{
// //         console.log("Seeding...");
// //         // TestLines
// //         const testLines = [
// //             {
// //                 testString: `And follows "New Article"                `,
// //                 helperImage: "https://raw.githubusercontent.com/saramic/real-code-challenge-blog/master/helper_images/01_and_follows_new_article.jpg",
// //                 lineNumber: 8
// //             },
// //             {
// //                 testString: `Then she sees a "New Article" form`,
// //                 helperImage: "https://raw.githubusercontent.com/saramic/real-code-challenge-blog/master/helper_images/02_then_she_sees_a_new_article_form.jpg",
// //                 lineNumber: 10
// //             },
// //             {
// //                 testString: `When she fills in the feilds`,
// //                 helperImage: "https://raw.githubusercontent.com/saramic/real-code-challenge-blog/master/helper_images/03_when_she_fills_in_the_fields.jpg",
// //                 lineNumber: 12
// //             },
// //             {
// //                 testString: `Then "she" sees success message "Article was successfully created."`,
// //                 helperImage: "https://raw.githubusercontent.com/saramic/real-code-challenge-blog/master/helper_images/04_then_she_sees_success_message_article_was_successfully_created.jpg",
// //                 lineNumber: 12
// //             },
// //             {
// //                 testString: `And "she" sees the article with the content`,
// //                 helperImage: "https://raw.githubusercontent.com/saramic/real-code-challenge-blog/master/helper_images/05_and_she_sees_the_article_with_the_content.jpg",
// //                 lineNumber: 18
// //             },
// //             {
// //                 testString: `When "John" comments "Well done"`,
// //                 helperImage: "https://raw.githubusercontent.com/saramic/real-code-challenge-blog/master/helper_images/06_when_john_comments_well_done.jpg",
// //                 lineNumber: 13
// //             },
// //             {
// //                 testString: `Then "he" sees success message "Comment was successfully created."`,
// //                 helperImage: "https://raw.githubusercontent.com/saramic/real-code-challenge-blog/master/helper_images/07_then_he_sees_success_message_comment_was_successfully_created.jpg",
// //                 lineNumber: 15
// //             }
// //         ];
// //         for (testLine of testLines) {
// //             await TestLine.create(testLine);
// //         };
// //         const allTestLines = await TestLine.find({});
// //         // Features
// //         const features = [
// //             {
// //                 title: "Can create blog posts",
// //                 number: 1,
// //                 scenarios: [
// //                     {
// //                         scenarioTitle: "Jane goes to the site and creates a blog post",
// //                         lineNumbers: [allTestLines[0]._id, allTestLines[1]._id, allTestLines[2]._id, allTestLines[3]._id, allTestLines[4]._id]
// //                     }
// //                 ]
// //             },
// //             {
// //                 title: "Can comment on blog posts",
// //                 number: 2,
// //                 scenarios: [
// //                     {
// //                         scenarioTitle: "John and James comment on Jane's blog post",
// //                         lineNumbers: [allTestLines[5]._id, allTestLines[6]._id]
// //                     }
// //                 ]
// //             }
// //         ];
// //         for (feature of features) {
// //             await Feature.create(feature);
// //         };
// //         const allFeatures = await Feature.find({});
// //         // Challenges
// //         const challenges = [
// //             {
// //                 title: "Blog Challenge",
// //                 description: "Make a blog post",
// //                 zipFileLocation: "https://github.com/saramic/real-code-challenge-blog/archive/master.zip",
// //                 active: true,
// //                 features: [allFeatures[0]._id, allFeatures[1]._id]
// //             }
// //         ];
// //         for (challenge of challenges) {
// //             await Challenge.create(challenge);
// //         };
// //         const allChallenges = await Challenge.find({});
// //         // Roles
// //         const roles = [
// //             {
// //                 uuid: "AIDS",
// //                 name: "admin"
// //             },
// //             {
// //                 uuid: "cheese wizz",
// //                 name: "audiance"
// //             }
// //         ];
// //         for (role of roles) {
// //             await Role.create(role);
// //         };
// //         const allRoles = await Role.find({});
// //         // Users
// //         const users = [
// //             {
// //                 access_token: "something wiggity wack, yo",
// //                 role_id: allRoles[0]._id
// //             },
// //             {
// //                 access_token: "This one's pretty mild.",
// //                 role_id: allRoles[1]._id
// //             },
// //             {
// //                 access_token: "AIDS!",
// //                 role_id: allRoles[1]._id
// //             }
// //         ];
// //         for (user of users) {
// //             await User.create(user);
// //         };
// //         const allUsers = await User.find({});
// //         // Candidates
// //         const candidates = [
// //             {
// //                 user_id: allUsers[1]._id,
// //                 firstname: "Jerry",
// //                 lastname: "Seinfeild",
// //                 linkedin: "jerrysignfeild@linkedin.com",
// //                 github: "jsmith@github.com",
// //                 bio: "[laugh track]",
// //                 image: "https://images-na.ssl-images-amazon.com/images/I/81GL-27MwDL._SY500_.jpg",
// //                 attempts: [],
// //                 username: "YouLikeJazz?"
// //             },
// //             {
// //                 user_id: allUsers[2]._id,
// //                 firstname: "Keanu",
// //                 lastname: "Reeves",
// //                 linkedin: "actualjohnwick@linkedin.com",
// //                 github: "totallyimmortal@github.com",
// //                 bio: "[unequivical lad]",
// //                 image: "https://dlisted.com/wp-content/uploads/2019/06/Keannnu.jpg",
// //                 attempts: [],
// //                 username: "YOU'REbreathtaking"
// //             }
// //         ];
// //         for (candidate of candidates) {
// //             await Candidate.create(candidate);
// //         };
// //         let allCandidates = await Candidate.find({});
// //         // Attempts
// //         const attempts = [
// //             {
// //                 status: "GET OUT",
// //                 candidate_id: allCandidates[0],
// //                 challenge_id: allChallenges[0],
// //                 submission_file: null,
// //                 results_log: "https://raw.githubusercontent.com/saramic/real-code-challenge-blog/master/mock_submissions/all_failing.json",
// //                 uuid: 13,
// //             },
// //             {
// //                 status: "PASSED",
// //                 candidate_id: allCandidates[1],
// //                 challenge_id: allChallenges[0],
// //                 submission_file: null,
// //                 results_log: "https://raw.githubusercontent.com/saramic/real-code-challenge-blog/master/mock_submissions/all_passing.json",
// //                 uuid: 42,
// //             },
// //             {
// //                 status: "STARTED",
// //                 candidate_id: allCandidates[0],
// //                 challenge_id: allChallenges[0],
// //                 submission_file: null,
// //                 results_log: "https://raw.githubusercontent.com/saramic/real-code-challenge-blog/master/mock_submissions/all_passing.json",
// //                 uuid: 69,
// //             }
// //         ];
// //         for (attempt of attempts) {
// //             await Attempt.create(attempt);
// //         };
// //         const allAttempts = await Attempt.find({});
// //         for (attempt of allAttempts) {
// //             const data = await Candidate.findOne({_id: attempt.candidate_id})
// //             data.attempts.push(attempt._id)
// //             await Candidate.updateOne({_id: attempt.candidate_id}, data)
// //         }
// //         allCandidates = await Candidate.find({});
// //         const db = {
// //             attempts: allAttempts,
// //             candidates: allCandidates,
// //             challenges: allChallenges,
// //             features: allFeatures,
// //             roles: allRoles,
// //             testLines: allTestLines,
// //             users: allUsers
// //         }
// //         res.send(db)
// //     }catch(error){
// //         res.status(404).send(error)
// //         console.log(error)
// //     }
// // }

// // const resetDb = async (req, res) => {
// //     try{
// //         console.log("Reseting Database");
// //         await Attempt.deleteMany();
// //         await Candidate.deleteMany();
// //         await Challenge.deleteMany();
// //         await Feature.deleteMany();
// //         await Role.deleteMany();
// //         await TestLine.deleteMany();
// //         await User.deleteMany();
// //         const db = {
// //             attempts: await Attempt.find({}),
// //             candidates: await Candidate.find({}),
// //             challenges: await Challenge.find({}),
// //             features: await Feature.find({}),
// //             roles: await Role.find({}),
// //             testLines: await TestLine.find({}),
// //             users: await User.find({})
// //         }
// //         res.send(db);
// //     } catch(error){
// //         res.status(404).send(error);
// //         console.log(error)
// //     }
// // }

// const seedAll = async (req, res) => {
//         try{
//             console.log("Seeding...");
//             // TestLines
//             const testLines = [
//                 {
//                     testString: "Given a static file, pass a static fail via the \"ENTRY_POINT\" environment variable as in\n\nENTRY_POINT=path/to/my/file docker-compose up",
//                     helperImage: null,
//                     lineNumber: 21
//                 },
//                 {
//                     testString: `Then it has a \"h1\" with the text \"Welcome to Real Code Problems\"`,
//                     helperImage: null,
//                     lineNumber: 23
//                 },
//                 {
//                     testString: `And the following elements with text`,
//                     helperImage: "https://raw.githubusercontent.com/saramic/real-code-challenge-blog/master/helper_images/04_then_she_sees_success_message_article_was_successfully_created.jpg",
//                     lineNumber: 12
//                 },
//                 {
//                     testString: "Given a static file, pass a static fail via the \"ENTRY_POINT\" environment variable as in\n\nENTRY_POINT=path/to/my/file docker-compose up",
//                     helperImage: null,
//                     lineNumber: 4
//                 },
//                 {
//                     testString: "Then it has some pieces of text on the page",
//                     helperImage: null,
//                     lineNumber: 6
//                 },
//                 {
//                     testString: "Given a static file, pass a static fail via the \"ENTRY_POINT\" environment variable as in\n\nENTRY_POINT=path/to/my/file docker-compose up",
//                     helperImage: null,
//                     lineNumber: 12
//                 },
//                 {
//                     testString: "Then it has a \"h1\" with the text \"Welcome to Real Code Problems\", need a \"h1\" html tag as in\n\n<h1>Welcome to Real Code Problems</h1>",
//                     helperImage: "https://stg-real-code-runner.herokuapp.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBKdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--6c03d570c51cfb82441662c7e903127e8a6eb7f5/introduction-helper_images-feature_01_heading.png",
//                     lineNumber: 14
//                 },
//                 {
//                     testString: "And the following elements with text",
//                     helperImage: "https://stg-real-code-runner.herokuapp.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBLQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--0a658e096eec96a17102efba7f49b2af145cebba/introduction-helper_images-feature_01_paragraph.png",
//                     lineNumber: 15
//                 }
//             ];
//             for (testLine of testLines) {
//                 await TestLine.create(testLine);
//             };
//             const allTestLines = await TestLine.find({});
//             console.log(allTestLines)
//             // Features

//             let lineno4 = await TestLine.findOne({lineNumber: 4})
//             let lineno6 = await TestLine.findOne({lineNumber: 6})
//             let lineno21 = await TestLine.findOne({lineNumber: 21})
//             let lineno23 = await TestLine.findOne({lineNumber: 23})
//             let lineno12_1 = await TestLine.findOne({testString: "And the following elements with text"})
//             let lineno14 = await TestLine.findOne({lineNumber: 14})
//             let lineno15 = await TestLine.findOne({lineNumber: 15})
//             let lineno12_2 = await TestLine.findOne({testString: "Given a static file, pass a static fail via the \"ENTRY_POINT\" environment variable as in\n\nENTRY_POINT=path/to/my/file docker-compose up"})

//             console.log(lineno23)
//             const features = [
//                 {
//                     title: "Get started with web app testing some basic HTML",
//                     number: 1,
//                     scenarios: [
//                         {
//                             scenarioTitle: "Get some text on a page",
//                             testLines: [lineno4._id, lineno6._id]
//                         },
//                         {
//                             scenarioTitle: "Put the text in appropriate tags `h1` and a `p` tag",
//                             testLines: [lineno12_1._id, lineno14._id, lineno15._id]
//                         },
//                         {
//                             scenarioTitle: "Scope text behind page fragmets identified by data-testid's",
//                             testLines: [lineno21._id, lineno23._id, lineno12_2._id]
//                         }
//                     ]
//                 }
//             ];
//             for (feature of features) {
//                 await Feature.create(feature);
//             };
//             const allFeatures = await Feature.find({});
//             const introFeatures = await Feature.find({})
//             // Challenges
//             const challenges = [
//                 {
//                     title: "An Introduction To Real Code Challenges",
//                     description: "An introduction to the concepts to Real Code Challenges. The Introduction will take you through the process of becoming accustomed to the format of the challenge and associated tests. In no time you will be solvingBDD (Behaviour Driven Development) test cases to develop a working web app.",
//                     zipFileLocation: "https://github.com/mcbadger88/real-code-problems-challengeZips/raw/master/challenge-introduction.zip",
//                     active: true,
//                     features: [allFeatures[0]._id]
//                 }
//             ];
//             for (challenge of challenges) {
//                 await Challenge.create(challenge);
//             };
//             const allChallenges = await Challenge.find({});
//             // Roles
//             // const roles = [
//             //     {
//             //         uuid: uuidv1(),
//             //         name: "admin"
//             //     },
//             //     {
//             //         uuid: uuidv1(),
//             //         name: "audiance"
//             //     }
//             // ];
//             // for (role of roles) {
//             //     await Role.create(role);
//             // };
//             // const allRoles = await Role.find({});
//             // // Users
//             // const users = [
//             //     {
//             //         access_token: "something wiggity wack, yo",
//             //         role_id: allRoles[0]._id
//             //     },
//             //     {
//             //         access_token: "This one's pretty mild.",
//             //         role_id: allRoles[1]._id
//             //     },
//             //     {
//             //         access_token: "AIDS!",
//             //         role_id: allRoles[1]._id
//             //     }
//             // ];
//             // for (user of users) {
//             //     await User.create(user);
//             // };
//             // const allUsers = await User.find({});
//             // // Candidates
//             // const candidates = [
//             //     {
//             //         user_id: allUsers[1]._id,
//             //         firstname: "Jerry",
//             //         lastname: "Seinfeild",
//             //         linkedin: "jerrysignfeild@linkedin.com",
//             //         github: "jsmith@github.com",
//             //         bio: "[laugh track]",
//             //         image: "https://images-na.ssl-images-amazon.com/images/I/81GL-27MwDL._SY500_.jpg",
//             //         attempts: [],
//             //         username: "YouLikeJazz?"
//             //     },
//             //     {
//             //         user_id: allUsers[2]._id,
//             //         firstname: "Keanu",
//             //         lastname: "Reeves",
//             //         linkedin: "actualjohnwick@linkedin.com",
//             //         github: "totallyimmortal@github.com",
//             //         bio: "[unequivical lad]",
//             //         image: "https://dlisted.com/wp-content/uploads/2019/06/Keannnu.jpg",
//             //         attempts: [],
//             //         username: "YOU'REbreathtaking"
//             //     }
//             // ];
//             // for (candidate of candidates) {
//             //     await Candidate.create(candidate);
//             // };
//             // let allCandidates = await Candidate.find({});
//             // // Attempts
//             // const attempts = [
//             //     {
//             //         status: "GET OUT",
//             //         candidate_id: allCandidates[0],
//             //         challenge_id: allChallenges[0],
//             //         submission_file: null,
//             //         results_log: "https://raw.githubusercontent.com/saramic/real-code-challenge-blog/master/mock_submissions/all_failing.json",
//             //         uuid: 13,
//             //     },
//             //     {
//             //         status: "PASSED",
//             //         candidate_id: allCandidates[1],
//             //         challenge_id: allChallenges[0],
//             //         submission_file: null,
//             //         results_log: "https://raw.githubusercontent.com/saramic/real-code-challenge-blog/master/mock_submissions/all_passing.json",
//             //         uuid: 42,
//             //     },
//             //     {
//             //         status: "STARTED",
//             //         candidate_id: allCandidates[0],
//             //         challenge_id: allChallenges[0],
//             //         submission_file: null,
//             //         results_log: "https://raw.githubusercontent.com/saramic/real-code-challenge-blog/master/mock_submissions/all_passing.json",
//             //         uuid: 69,
//             //     }
//             // ];
//             // for (attempt of attempts) {
//             //     await Attempt.create(attempt);
//             // };
//             // const allAttempts = await Attempt.find({});
//             // for (attempt of allAttempts) {
//             //     const data = await Candidate.findOne({_id: attempt.candidate_id})
//             //     data.attempts.push(attempt._id)
//             //     await Candidate.updateOne({_id: attempt.candidate_id}, data)
//             // }
//             // allCandidates = await Candidate.find({});
//             const db = {
//                 // attempts: allAttempts,
//                 // candidates: allCandidates,
//                 challenges: allChallenges,
//                 features: allFeatures,
//                 // roles: allRoles,
//                 testLines: allTestLines,
//                 // users: allUsers
//             }
//             res.send(db)
//         }catch(error){
//             res.status(404).send(error)
//             console.log(error)
//         }
//     }
    
//     const resetDb = async (req, res) => {
//         try{
//             console.log("Reseting Database");
//             await Attempt.deleteMany();
//             await Candidate.deleteMany();
//             await Challenge.deleteMany();
//             await Feature.deleteMany();
//             await Role.deleteMany();
//             await TestLine.deleteMany();
//             await User.deleteMany();
//             const db = {
//                 attempts: await Attempt.find({}),
//                 candidates: await Candidate.find({}),
//                 challenges: await Challenge.find({}),
//                 features: await Feature.find({}),
//                 roles: await Role.find({}),
//                 testLines: await TestLine.find({}),
//                 users: await User.find({})
//             }
//             res.send(db);
//         } catch(error){
//             res.status(404).send(error);
//             console.log(error)
//         }
//     }    

// module.exports = {
//     seedAll,
//     resetDb
// }


// const chall1_feature1_scenario1_testLines = [
//     {
//         testString: "Given a static file, pass a static fail via the \"ENTRY_POINT\" environment variable as in\n\nENTRY_POINT=path/to/my/file docker-compose up",
//         helperImage: null,
//         lineNumber: 21,
//         db_id: null
//     },
//     {
//         testString: "Given a static file, pass a static fail via the \"ENTRY_POINT\" environment variable as in\n\nENTRY_POINT=path/to/my/file docker-compose up",
//         helperImage: null,
//         lineNumber: 21,
//         db_id: null
//     }
// ]

// for each chall1_feature1_scenario1_testLines testline, i {
//     let new_testline = {
//         testString: testline.testString,
//         helperImage: testline.helperImage,
//         lineNumber: testline.lineNumber,       
//     }
//     db_id = await TestLine.create(new_testLine);
//     chall1_feature1_scenario1_testLines[i].db_id = db_id._id
// }

// // do other sceraios for feature1

// //create feature
// const feature =    {
//     title: "Get started with web app testing some basic HTML",
//     number: 1,
//     scenarios: [
//         {
//             scenarioTitle: "Get some text on a page",
//             testLines: [chall1_feature1_scenario1_testLines[].db_id, lineno6._id]
//         },
//         {
//             scenarioTitle: "Put the text in appropriate tags `h1` and a `p` tag",
//             testLines: [lineno12_1._id, lineno14._id, lineno15._id]
//         },
//         {
//             scenarioTitle: "Scope text behind page fragmets identified by data-testid's",
//             testLines: [lineno21._id, lineno23._id, lineno12_2._id]
//         }
//     ]
// }



// const feature1 = await Feature.create(feature);

const chall1_feature1 = [
    {
        db_id: null,
        title: "Get started with web app testing some basic HTML",
        number: 1,
        scenarios: [
            {
                scenarioTitle: "Get some text on a page",
                testLines: [
                    1, 2, 1, 2
                ]
            },
            {
                scenarioTitle: "Put the text in appropriate tags `h1` and a `p` tag",
                testLines: [
                   1, 2, 1, 2
                ]
            },
            {
                scenarioTitle: "Scope text behind page fragmets identified by data-testid's",
                testLines: [
                    1, 2, 1
                    
                 ]
            }
        ]
    }
];