"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk"); // eslint-disable-line import/no-extraneous-dependencies
aws_sdk_1.default.config.update({
    region: "us-east-2",
});
const dynamoDb = new aws_sdk_1.default.DynamoDB.DocumentClient();
function scan(params) {
    return new Promise((resolve, reject) => dynamoDb.scan(params).promise()
        .then(data => resolve(data.Items))
        .catch(err => reject(err)));
}
exports.scan = scan;
function get(params) {
    return new Promise((resolve, reject) => dynamoDb.get(params).promise()
        .then(data => resolve(data.Item))
        .catch(err => reject(err)));
}
exports.get = get;
function createItem(params) {
    return new Promise((resolve, reject) => dynamoDb.put(params).promise()
        .then(() => resolve(params.Item))
        .catch(err => reject(err)));
}
exports.createItem = createItem;
function updateItem(params, args) {
    return new Promise((resolve, reject) => dynamoDb.update(params).promise()
        .then(() => resolve(args))
        .catch(err => reject(err)));
}
exports.updateItem = updateItem;
function deleteItem(params, args) {
    return new Promise((resolve, reject) => dynamoDb.delete(params).promise()
        .then(() => resolve(args))
        .catch(err => reject(err)));
}
exports.deleteItem = deleteItem;
