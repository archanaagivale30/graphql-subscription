const express = require('express')
const { graphqlHTTP } = require('express-graphql');
import Schema from './schema/Schema';
const { execute, subscribe } = require('graphql');
import * as cors from 'cors';
const { SubscriptionServer } = require('subscriptions-transport-ws');
import expressPlayground from 'graphql-playground-middleware-express';

const app = express()

app.set('port', process.env.PORT || 7000)
app.use(cors());

app.use('/graphql', (req, res) => {
  graphqlHTTP({
    schema: new Schema().schema,
    graphiql: true,
    rootValue: new Schema().root

  })(req, res)
})
app.use('/api', expressPlayground({
  endpoint: '/graphql'
  , subscriptionEndpoint: "ws://localhost:7000/subscriptions"
}))

const server = app.listen(app.get('port'), () => {
  console.log(`Server running -> PORT ${server.address().port}`)
})
SubscriptionServer.create({ schema: new Schema().schema, rootValue: new Schema().root, execute, subscribe }, {
  server // Listens for 'upgrade' websocket events on the raw server
});


module.exports = app






