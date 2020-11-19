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

Create two tables which have a relation using DATA have this relation exists only on database level, which means that if we go to graphical, we still can't fetch comments for our photos.

**expose hasura to this relation:** `table>Relationships>add suggested relation`

### Mutation: Mutate items with relations

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
- Hasura Actions: Actions are custom queries or mutations that are resolved via HTTP handlers. Actions can be used to carry out complex data validations, data enrichment from external sources or execute just about any custom business logic. 
- Remote Schemes

![](/docs/images/hasura-event.PNG)

![](/docs/images/hasura-action2.PNG)

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

## Get the docker-compose file 

```
docker-compose up -d
```