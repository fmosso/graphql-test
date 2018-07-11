// add to handler.js

import uuid from 'uuid/v4';
import * as db from './dynamo';
import validate from 'validate.js';
import  * as Mail from './Mail';

function isMailValid(mail){
   var constraints = {
      from: {
       email: true
      }
    };

    const response = validate({from: mail}, constraints)
    if (response === undefined) {
     return true
    }
    else {
      return false
    }

}

function getPerfilData(id) {
    var params = {
      TableName: 'Perfil',
          Key: {
            'perfil_id': id,
      },
    };
    const result = db.get(params) ;
    return result.then( result =>{
        const perfil = {
            perfil_id: result.perfil_id,
            name: result.name,
            last_name: result.last_name,
            phone: result.phone,
            photo: result.photo,
        };
        return perfil;  
    }, error => console.log(error) );
}

function getPerfilQ(id) {
    var params = {
      TableName: 'User',
          Key: {
            'id': id,
      },
    };
    const result = db.get(params) ;
    return result.then( result =>{
           return getPerfilData(result.perfil_id)
    },  error => console.log(error) );
}

function getCredential(id) {
    var params = {
      TableName: 'User',
          Key: {
            'id': id,
      },
    };
    const result = db.get(params) ;
    return result.then( result =>{
           var r = []
           for (const value of result.credentials) {
                r.push({'mail'  :value} )
};
           return r
    },  error => console.log(error) );
}




function registerUser(mail) {
    if (! isMailValid(mail)){
      return false
    }
    const userId  = uuid()
    var paramsCredential = {
        TableName: 'Credential',
        Item:{
            'mail': mail,
            'userId': userId,
        }
    };
    const  credentialResult = db.createItem(paramsCredential);
    credentialResult.then(result => console.log(result), 
                        error => console.log(error));

    var  paramUser = {
        TableName: 'User',
        Item:{
            'id': userId,
            'status': false,
        }
    };
    const  userResult = db.createItem(paramUser);
    Mail.send(mail,userId)
    return userResult.then(result => {console.log(result)
                                      return true }, 
                        error => {console.log(error) 
                                  return false});

}

function confirmUser(id) {
    var  paramUser = {
        TableName: 'User',
        Key:{
            'id': id,
        },   
        UpdateExpression : "set #s = :s" ,
        ExpressionAttributeValues:{
            ":s":true,
        },
        ExpressionAttributeNames: {"#s":"status"},
        ReturnValues:"UPDATED_NEW"
    };
    return db.updateItem(paramUser).then(result => {console.log(result)
                                      return true }, 
                        error => {console.log(error) 
                                  return false});
}    




// eslint-disable-next-line import/prefer-default-export
export const resolvers = {
  Query: {
    getPerfil: (root, args) => getPerfilQ(args.id),
    getAllCredential: (root, args) =>  getCredential(args.id)
  },
  Mutation: {
    registerUser: (root, args) => registerUser(args.mail),
    confirmUser: (root, args) => confirmUser(args.id)
  },

};
