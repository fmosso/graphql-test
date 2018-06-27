(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("graphql");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/
var graphql = __webpack_require__(0);

'use strict';

__webpack_require__(2);

var _apolloServerLambda = __webpack_require__(3);

var _graphqlPlaygroundMiddlewareLambda = __webpack_require__(4);

var _graphqlPlaygroundMiddlewareLambda2 = _interopRequireDefault(_graphqlPlaygroundMiddlewareLambda);

var _graphqlTools = __webpack_require__(5);

var _schema = __webpack_require__(6);

var _resolvers = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const myGraphQLSchema = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs: _schema.schema,
  resolvers: _resolvers.resolvers,
  logger: console
});

exports.graphqlHandler = function graphqlHandler(event, context, callback) {
  function callbackFilter(error, output) {
    // eslint-disable-next-line no-param-reassign
    output.headers['Access-Control-Allow-Origin'] = '*';
    callback(error, output);
  }

  const handler = (0, _apolloServerLambda.graphqlLambda)({ schema: myGraphQLSchema, tracing: true });
  return handler(event, context, callbackFilter);
};

// for local endpointURL is /graphql and for prod it is /stage/graphql
exports.playgroundHandler = (0, _graphqlPlaygroundMiddlewareLambda2.default)({
  endpoint: process.env.REACT_APP_GRAPHQL_ENDPOINT ? process.env.REACT_APP_GRAPHQL_ENDPOINT : '/production/graphql'
});

exports.graphiqlHandler = (0, _apolloServerLambda.graphiqlLambda)({
  endpointURL: process.env.REACT_APP_GRAPHQL_ENDPOINT ? process.env.REACT_APP_GRAPHQL_ENDPOINT : '/production/graphql'
});


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("apollo-server-lambda");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("graphql-playground-middleware-lambda");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("graphql-tools");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/
var graphql = __webpack_require__(0);

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const schema = `
type Mutation {
    # add credential for user
    AddCredential(id : String!, mail: String!) : User!


}

type Query {
    #get perfil by id user 
    getPerfil(id: String!): Perfil

    # listCredential by user
    getAllCredential(id: String!): [Credential]
}


type Perfil{
    perfil_id:String!
    name: String!
    last_name: String!
    phone: Int!
    photo: String!

}


type User{
    id: String!
    status: Boolean!
    credentials: [Credential]
    perfil: Perfil  
} 

type Credential {
    mail : String!
}

schema {
    query: Query
    mutation: Mutation
}`;

// eslint-disable-next-line import/prefer-default-export
exports.schema = schema;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/
var graphql = __webpack_require__(0);

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resolvers = undefined;

var _v = __webpack_require__(8);

var _v2 = _interopRequireDefault(_v);

var _dynamo = __webpack_require__(9);

var db = _interopRequireWildcard(_dynamo);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// add to handler.js

function getPerfilData(id) {
    var params = {
        TableName: 'Perfil',
        Key: {
            'perfil_id': id
        }
    };
    const result = db.get(params);
    return result.then(result => {
        const perfil = {
            perfil_id: result.perfil_id,
            name: result.name,
            last_name: result.last_name,
            phone: result.phone,
            photo: result.photo
        };
        return perfil;
    }, error => console.log(error));
}

function getPerfilQ(id) {
    var params = {
        TableName: 'User',
        Key: {
            'id': id
        }
    };
    const result = db.get(params);
    return result.then(result => {
        return getPerfilData(result.perfil_id);
    }, error => console.log(error));
}

function getCredential(id) {
    var params = {
        TableName: 'User',
        Key: {
            'id': id
        }
    };
    const result = db.get(params);
    return result.then(result => {
        var r = [];
        for (const value of result.credentials) {
            r.push({ 'mail': value });
        };
        return r;
    }, error => console.log(error));
}

// eslint-disable-next-line import/prefer-default-export
const resolvers = exports.resolvers = {
    Query: {
        getPerfil: (root, args) => getPerfilQ(args.id),
        getAllCredential: (root, args) => getCredential(args.id)
    }

};


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("uuid/v1");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/
var graphql = __webpack_require__(0);

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scan = scan;
exports.get = get;
exports.createItem = createItem;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;

var _awsSdk = __webpack_require__(10);

var _awsSdk2 = _interopRequireDefault(_awsSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line import/no-extraneous-dependencies

_awsSdk2.default.config.update({
  region: "us-east-1"
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


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("aws-sdk");

/***/ })
/******/ ])));