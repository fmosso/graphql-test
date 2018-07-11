"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scan = scan;
exports.get = get;
exports.createItem = createItem;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;

var _awsSdk = require("aws-sdk");

var _awsSdk2 = _interopRequireDefault(_awsSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line import/no-extraneous-dependencies

_awsSdk2.default.config.update({
  region: "us-east-2"
  // accessKeyId default can be used while using the downloadable version of DynamoDB.
  // For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
});

const dynamoDb = new _awsSdk2.default.DynamoDB.DocumentClient();

function scan(params) {
  return new Promise((resolve, reject) => dynamoDb.scan(params).promise().then(data => resolve(data.Items)).catch(err => reject(err)));
}

function get(params) {
  return new Promise((resolve, reject) => dynamoDb.get(params).promise().then(data => resolve(data.Item)).catch(err => reject(err)));
}

function createItem(params) {
  return new Promise((resolve, reject) => dynamoDb.put(params).promise().then(() => resolve(params.Item)).catch(err => reject(err)));
}

function updateItem(params, args) {
  return new Promise((resolve, reject) => dynamoDb.update(params).promise().then(() => resolve(args)).catch(err => reject(err)));
}

function deleteItem(params, args) {
  return new Promise((resolve, reject) => dynamoDb.delete(params).promise().then(() => resolve(args)).catch(err => reject(err)));
}