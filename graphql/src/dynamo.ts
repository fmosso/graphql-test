
import AWS =  require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

AWS.config.update({
  region: "us-east-2",
  //endpoint: "http://localhost:8000",
  // accessKeyId default can be used while using the downloadable version of DynamoDB.
  // For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
});

const dynamoDb : AWS.DynamoDB.DocumentClient  = new AWS.DynamoDB.DocumentClient();

export function scan(params : AWS.DynamoDB.DocumentClient.QueryInput ) : Promise<AWS.DynamoDB.DocumentClient.AttributeMap[]>  {
  return new Promise((resolve, reject) =>
    dynamoDb.scan(params).promise()
      .then(data => resolve(data.Items))
      .catch(err => reject(err)),
  );
}

export function get(params : AWS.DynamoDB.DocumentClient.GetItemInput) : Promise<AWS.DynamoDB.DocumentClient.AttributeMap> {
  return new Promise((resolve, reject) =>
    dynamoDb.get(params).promise()
      .then(data => resolve(data.Item))
      .catch(err => reject(err)),
  );
}

export function createItem(params : AWS.DynamoDB.DocumentClient.PutItemInput) :Promise<AWS.DynamoDB.DocumentClient.AttributeMap>  {
  return new Promise((resolve, reject) =>
    dynamoDb.put(params).promise()
      .then(() => resolve(params.Item))
      .catch(err => reject(err)),
  );
}

export function updateItem(params : AWS.DynamoDB.DocumentClient.UpdateItemInput, args? : string) : Promise<string>   {
  return new Promise((resolve, reject) =>
    dynamoDb.update(params).promise()
      .then(() => resolve(args))
      .catch(err => reject(err)),
  );
}

export function deleteItem(params : AWS.DynamoDB.DocumentClient.DeleteItemInput, args : string) : Promise<string>   {
  return new Promise((resolve, reject) =>
    dynamoDb.delete(params).promise()
      .then(() => resolve(args))
      .catch(err => reject(err)),
  );
}
