const { database } = require('firebase-admin');
const functions = require('firebase-functions');
const { createTestAccount, createTransport, getTestMessageUrl } = require('nodemailer');
const fetch = require('node-fetch');

const GET_PHOTO_QUERY = `
query MyQuery($id: uuid!) {
    photos_by_pk(id: $id) {
      photo_url
      description
    }
  }
`

const notfifyAboutCommentHandler = async (request, response) => {
    try {
        const { event } = request.body;
        const { headers } = request
        const { photo_id, comment } = event && event.data && event.data.new;
        const { session_variables } = event;

        // Query for hasura
        const photoInfoQuery = await fetch("http://localhost:8080/v1/graphql", {
            method: 'POST',
            body: JSON.stringify({
                query: GET_PHOTO_QUERY,
                variables: { id: photo_id }
            }),
            headers: Object.assign({}, session_variables, headers) // polyfit for spread operator
        });

        const { data: { photos_by_pk: { photo_url, description } } } = await photoInfoQuery.json()

        const testAccount = await createTestAccount();
        const transporter = createTransport({
            host: "smtp.ethereal.email", // Ethereal is a fake SMTP service, mostly aimed at Nodemailer users
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user, // generate ethereal user
                pass: testAccount.pass // generate ethereal password
            }
        });

        const sentEmail = await transporter.sendMail({
            from: `"Firebase Function" <${testAccount.user}>`,
            to: "wedave4101@ibrilo.com", // generate from temp-mail
            subject: "New comment to the photo",
            html: `
            <html>
                <head></head>
                <body>
                    <h1>Hi there!</h1>
                    <br><br>
                    <p>You have got a new comment to yout photo <a> href="${photo_url}">${description}</a></p>
                    <p>The comment text is: <i>${comment}</i></p>
                </body>
            </html>
            `
        });

        functions.logger.log(getTestMessageUrl(sentEmail));

        response.status(200).send({
            message: "success"
        });

    } catch (error) {
        console.log(error);
        response.status(500).send({
            message: `Message ${error.message}`
        });
    }
}


module.exports = {
    notfifyAboutCommentHandler
}