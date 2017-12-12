# NodeJS REST vs GraphQL comparison

This project compares the REST against the new GraphQL standard. An author (dude) to article relationship is modelled. The types are defined in `src/graphql/types.js` with their according cross-type resolvers in code to allow subqueries/nested queries. This is all done in code without the need of `makeExecutableSchema` as that is an unnecessary source of errors.

The ExpressJS Framework is used as a web platform with SQlite as a persistent database backend.

Have a look `src/graphql/query.js` and `src/graphql/mutation.js` if you are interested in the code definitions of the GraphQL interface. Otherwise they are also nicely queryable in browser (`localhost:7700/graphiql`)

The REST Api is simply defined by a Swagger interface file in `src/swagger/swagger.json`. The library makes automatically the paths to the methods in `src/swagger/handlers.js`.

## Usage

Install dependencies `npm install` and run `npm start` to start the server

Then point your web-browser to `localhost:7700`

## REST API

### Add a dude
`curl -X POST --header 'Authorization: secret' --header 'Content-Type: application/json' --header 'Accept: text/html' -d '{"name": "asdf"}' 'http://localhost:7700/dude'`
needs a simple Authorization header

### Query an article
`curl -X GET --header 'Accept: text/html' 'http://localhost:7700/article/1'`

### Upvote an article
`curl -X PUT --header 'Content-Type: application/json' --header 'Accept: application/json' 'http://localhost:7700/article/1/upvote'`

## GraphQL

### Getting all the data
`curl -XPOST -H 'Content-Type:application/json' -d '{"query": "query {dudes {id name articles {id title}}}"}' localhost:7700/graphql`

returns

```
{
  "data": {
    "dude": {
      "id": "2",
      "name": "DudeB",
      "articles": [
        {
          "id": "3",
          "title": "Casear"
        },
        {
          "id": "6",
          "title": "Casear"
        },
        {
          "id": "9",
          "title": "Casear"
        }
      ]
    }
  }
}
```

### Upvote an article
`curl -XPOST -H 'Content-Type:application/json' -d '{"query": "mutation { upvoteArticle(articleId: 1) { id title votes } }"}' localhost:7700/graphql`

returns

```
{
  "data": {
    "upvoteArticle": {
      "id": "1",
      "title": "Amageddon",
      "votes": 14
    }
  }
}
```