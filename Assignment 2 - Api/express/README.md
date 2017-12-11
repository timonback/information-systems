# Express Server

Run `npm start` to start the server

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