const { database } = require('firebase-admin');
const functions = require('firebase-functions');

// bring controllers
const { notfifyAboutCommentHandler } = require('./controllers/notifyAboutComment')

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions



exports.notifyAboutComment = functions.https.onRequest(notfifyAboutCommentHandler);

    // functions.logger.info("Request body", request.body);
    // response.send("Hello from Firebase!");