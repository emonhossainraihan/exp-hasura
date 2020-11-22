const { database } = require('firebase-admin');
const functions = require('firebase-functions');

// bring controllers
const { notfifyAboutCommentHandler } = require('./controllers/notifyAboutComment')
const { createUserHandler } = require('./controllers/createUser')
const { getProfileHandler } = require('./controllers/getProfile')
const { server } = require('./remoteSchema')
const { loginHandler } = require('./controllers/login')

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions



exports.notifyAboutComment = functions.https.onRequest(notfifyAboutCommentHandler);
exports.createUser = functions.https.onRequest(createUserHandler);
exports.getProfile = functions.https.onRequest(getProfileHandler);
exports.userProfile = functions.https.onRequest(server.createHandler());
exports.login = functions.https.onRequest(loginHandler);

// functions.logger.info("Request body", request.body);
// response.send("Hello from Firebase!");