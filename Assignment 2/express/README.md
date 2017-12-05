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
`curl -XPOST -H 'Content-Type:application/json' -d '{"query": "query {dudes {id name articles {id}}}"}' localhost:7700/graphql`
returns
 {"data":{"dudes":[{"id":1,"name":"Tom","articles":[{"id":1}]},{"id":2,"name":"Sashko","articles":[{"id":2},{"id":3}]},{"id":3,"name":"Mikhail","articles":[{"id":4}]}]}}`
 