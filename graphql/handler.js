import { graphqlLambda, graphiqlLambda } from 'apollo-server-lambda';
import lambdaPlayground from 'graphql-playground-middleware-lambda';
import { makeExecutableSchema } from 'graphql-tools';
import { schema } from './src/schema';
import { resolvers } from './src/resolvers';
import { confirmUser } from './src/userConfirm';

const servelessroute = "https://neuzkzc4df.execute-api.us-east-2.amazonaws.com"

const myGraphQLSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
  logger: console,
});

exports.graphqlHandler = function graphqlHandler(event, context, callback) {
  function callbackFilter(error, output) {
    // eslint-disable-next-line no-param-reassign
    output.headers['Access-Control-Allow-Origin'] = '*';
    callback(error, output);
  }

  const handler = graphqlLambda({ schema: myGraphQLSchema, tracing: true });
  return handler(event, context, callbackFilter);
};

// for local endpointURL is /graphql and for prod it is /stage/graphql
exports.playgroundHandler = lambdaPlayground({
  endpoint: process.env.REACT_APP_GRAPHQL_ENDPOINT
    ? process.env.REACT_APP_GRAPHQL_ENDPOINT
    : servelessroute + '/dev/graphql',
    //localhost
   // : graphql  
});

exports.graphiqlHandler = graphiqlLambda({
  endpointURL: process.env.REACT_APP_GRAPHQL_ENDPOINT
    ? process.env.REACT_APP_GRAPHQL_ENDPOINT
    : servelessroute + '/dev/graphql',
    // localhost
    // : graphql 
});


exports.userConfirmation = (event, context, callback) => {
  const token = event.pathParameters.token
    const response = {
    statusCode : 200,
    body : "sucess"
  }
  confirmUser(token).then(result =>  {response.body = result;
                                     callback(null , response)}, 
                          error =>   {callback(error, null)});
};




