const { database } = require('firebase-admin');
const functions = require('firebase-functions');

// bring controllers
const { notfifyAboutCommentHandler } = require('./controllers/notifyAboutComment')
const { createUserHandler } = require('./controllers/createUser')
const { getProfileHandler } = require('./controllers/getProfile')
const { server } = require('./remoteSchema')
const { loginHandler } = require('./controllers/login')
const { uploadHandler } = require('./controllers/uploadPhoto')

var serviceAccount = require('./serviceAccountKey.json');
var admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://exp-hasura.firebaseio.com",
    storageBucket: 'gs://exp-hasura.appspot.com'
});

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions



exports.notifyAboutComment = functions.https.onRequest(notfifyAboutCommentHandler);
exports.createUser = functions.https.onRequest(createUserHandler);
exports.getProfile = functions.https.onRequest(getProfileHandler);
exports.userProfile = functions.https.onRequest(server.createHandler());
exports.login = functions.https.onRequest(loginHandler);
exports.uploadPhoto = functions.https.onRequest(uploadHandler);
// functions.logger.info("Request body", request.body);
// response.send("Hello from Firebase!");