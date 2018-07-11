'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resolvers = undefined;

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _dynamo = require('../lib/dynamo');

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


function registerUser(mail) {
    const userId  = uuid()
    var paramsCredential = {
        TableName: 'Credential',
        Key: {
            'mail': mail
        }
        Item:{
            "userId": userId
        }
    };
    const  credentialResult = db.createItem(paramsCredential);
    credentialResult.then(result => console.log(result), 
                        error => console.log(error) );

    var userCredential = {
        TableName: 'User',
        Key: {
            'id': userId
        }
        Item:{
            "status": false
        }
    };
    const  userResult = db.createItem(userCredential);
    return userResult.then(result => console.log(result), 
                        error => console.log(error) );

    
 


}





getPerfilQ("id1").then(function(result) {
   console.log(result) //will log results.
})





