const fetch = require('node-fetch');

const AUTH_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCVJDtrS2CLkRGPDu0JcLiELBj5YyXRdt4`
const loginHandler = async (
    request,
    response
) => {
    try {

        const { email, password } = request.body.input.credentials;
        const loginRequest = await fetch(AUTH_URL, {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
        });

        const { idToken, localId } = await loginRequest.json();
        console.log(idToken)
        if (!idToken) throw Error('No idToken!')
        response.status(200).send({
            accessToken: idToken,
            id: localId
        })
    }
    catch (error) {
        response.status(500).send({
            message: `Message: ${error.message}`
        })
    }
}

module.exports = {
    loginHandler
}