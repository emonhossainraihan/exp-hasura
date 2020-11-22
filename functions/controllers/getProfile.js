const { logger } = require('firebase-functions');
const { auth } = require('firebase-admin');

const getProfileHandler = async (
    request,
    response
) => {
    try {

        const { id } = request.body.input;
        const { uid, email, displayName } = await auth().getUser(id);
        response.status(200).send({
            id: uid,
            email: email,
            displayName: displayName
        })
    }
    catch (error) {
        response.status(500).send({
            message: `Message: ${error.message}`
        })
    }
}

module.exports = {
    getProfileHandler
}