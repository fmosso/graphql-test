"use strict";
// add to handler.js
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid");
const db = require("./dynamo");
const validate = require("validate.js");
const Mail = require("./Mail");
function isMailValid(mail) {
    const constraints = {
        from: {
            email: true
        }
    };
    return validate({ from: mail }, constraints) === undefined;
}
function getPerfilData(id) {
    const params = {
        TableName: 'Perfil',
        Key: { "perfil_id": id },
    };
    const result = db.get(params);
    return result.then(result => {
        const perfil = {
            perfil_id: result.perfil_id,
            name: result.name,
            last_name: result.last_name,
            phone: result.phone,
            photo: result.photo,
        };
        return perfil;
    }, error => console.log(error));
}
function getPerfilQ(id) {
    var params = {
        TableName: 'User',
        Key: {
            'id': id,
        },
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
            'id': id,
        },
    };
    const result = db.get(params);
    return result.then((re) => {
        var r = [];
        for (const value of re.credentials) {
            r.push({ 'mail': value });
        }
        ;
        return r;
    }, error => console.log(error));
}
function registerUser(mail) {
    if (!isMailValid(mail)) {
        return false;
    }
    console.log("id");
    const userId = uuid.v4();
    console.log("paso id");
    const paramsCredential = {
        TableName: 'Credential',
        Item: {
            'mail': mail,
            'userId': userId,
        }
    };
    const credentialResult = db.createItem(paramsCredential);
    credentialResult.then(result => console.log(result), error => console.log(error));
    console.log("credencial guadarda");
    const paramUser = {
        TableName: 'User',
        Item: {
            'id': userId,
            'status': false,
        }
    };
    const userResult = db.createItem(paramUser);
    Mail.send(mail, userId);
    return userResult.then(result => {
        console.log(result);
        return true;
    }, error => {
        console.log(error);
        return false;
    });
}
function confirmUser(id) {
    const paramUser = {
        TableName: 'User',
        Key: {
            'id': id,
        },
        UpdateExpression: "set #s = :s",
        ExpressionAttributeValues: {
            ":s": true,
        },
        ExpressionAttributeNames: { "#s": "status" },
        ReturnValues: "UPDATED_NEW"
    };
    return db.updateItem(paramUser, "").then(result => {
        console.log(result);
        return true;
    }, error => {
        console.log(error);
        return false;
    });
}
// eslint-disable-next-line import/prefer-default-export
exports.resolvers = {
    Query: {
        getPerfil: (root, args) => getPerfilQ(args.id),
        getAllCredential: (root, args) => getCredential(args.id)
    },
    Mutation: {
        registerUser: (root, args) => registerUser(args.mail),
        confirmUser: (root, args) => confirmUser(args.id)
    },
};
