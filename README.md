https://github.com/emonhossainraihan/exp-hasura/blob/master
![](/docs/images/hasura1.PNG)

## Hasura

The Hasura GraphQL Engine connects to your Postgres database and instantly generates a realtime GraphQL API 

Without any single line of code we can create a working graphical engine which returns our rows, which we have added to the database before.

- Creating tables in Hasura database manager

![](/docs/images/hasura2.PNG)

## Hasura Basics

### Query: Combine multiple filter

```graphql
query MyQuery {
  photos(where: {_and: [
    {created_at: {_gte: "2020-11-19T14:20:41.069246+00:00"}},
    {updated_at: {_gte: "2020-11-19T14:20:41.069246+00:00"}}
  ]}) {
    id
    created_at
    description
    photo_url
  }
}
```

`offset=(Page Num -1) * limit`

### Query: How to work with relations between database tables

Create two tables which have a relation using Hasura interface(DATA) have this relation exists only on database level, which means that if we go to graphical, we still can't fetch comments for our photos. In order to do so:

**expose this relation:** `table > Relationships > add suggested relation`

### Mutation: Mutate items with relations

In Hasura Interface it was resolved by automatically for us, which is great.

### How to use varibale 

**Inside Query Variables:**

```
{
  "photo_url":"https://i.picsum.photos/id/323/200/200.jpg?hmac=EoedzCHJZRv1-7_RBKDcba4cXIfclsicfsYbW3-VEsA",
  "description": "It is a description from variable"
}
```

**Mutation:** 

```graphql
mutation MyMutation ($photo_url: String!, $description: String!){
  insert_photos_one(object: {photo_url: $photo_url, description: $description}) {
    id
    description
    photo_url
  }
}
```
## Extend business logic 

- Event triggers: In this project we send email when our photo get comment 
- Hasura Actions: Actions are custom queries or mutations that are resolved via HTTP handlers. Actions can be used to carry out complex data validations, data enrichment from external sources or execute just about any custom business logic. They are similar like resolver in prisma/**controller in REST API**. 
- Remote Schemes: Hasura gives you CRUD + realtime GraphQL APIs with authorization & access control. However, in many cases, you will need to write APIs (queries, mutations) that contain custom logic. For example, implementing a payment API, or querying data that is not in your database.

Hasura has the ability to merge **remote GraphQL schemas** and provide a unified GraphQL API. Think of it like automated schema stitching. All you need to do is build your own GraphQL service and then provide the HTTP endpoint to Hasura. Your GraphQL service can be written in any language or framework. 

![](/docs/images/hasura-event.PNG)

![](/docs/images/hasura-action2.PNG)


### When to use Events:

- Execute some logic AFTER data was inserted, updated or removed in database 

### When to use Actions: 

- Data validation before to insert to database 
- You need to delegate logic to some micro service which implements ONLY REST interface
- You need to do nested query to Hasura table from external source (Action relations)

### When to use Remote Schema
- You need to delegate logic to some micro service which implements GRAPHQL interface
- You need to build reference from Hasura tables to some remote GraphQL server
## Use Firebase functions 

```
npm i -g firebase-tools
firebase login
firebase init
firebase deploy --only functions 
```

## Run firebase functions our machine 

```
cd functions && npm run serve
```

Create Hasura event and change the webhook URL (`http://localhost: -> http://host.docker.internal:`)

## Authentication with Hasura
You can [configure](https://hasura.io/docs/1.0/graphql/core/auth/authentication/jwt.html) the GraphQL engine to use JWT authorization mode to authorize all incoming requests to the Hasura GraphQL engine server.

You need to add this information inside your jwt's payload
```js
"https://hasura.io/jwt/claims": {
  "x-hasura-allowed-roles": ["admin"],
  "x-hasura-default-role": "admin"
}
```

And add `HASURA_GRAPHQL_JWT_SECRET` envirnment variable 

Let firebase do generate this token:

- Get the firebase `API_KEY` from project settings
- Call firebase [RESTapi](https://cloud.google.com/identity-platform/docs/use-rest-api) [endpoint](https://firebase.google.com/docs/reference/rest/auth) in order to authenticate `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]`
- Create HAsura Action
- Activate email authentication on firebase authentication
- CreateUser from `create_user` mutation
- Get require config from `hasura.io/jwt-config` and integrate it with our hasura engine

```
{"type":"RS256","jwk_url": "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com", "audience": "<firebase-clientID>", "issuer": "https://securetoken.google.com/<firebase-clientID>"}
```
- Create user based permission on hasura 

![](/docs/images/hasura-role01.PNG)

- For anonymous user:

```
## Create Unauthorized role access
HASURA_GRAPHQL_UNAUTHORIZED_ROLE: <name>
```
If you want to add custom authentication use Hasura Web Hook

## Get the docker-compose file 

```
docker-compose up -d
```

Head to http://localhost:8080/console to open the Hasura console.