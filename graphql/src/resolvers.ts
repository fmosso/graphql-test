// add to handler.js

import uuid = require('uuid');
import * as db from './dynamo';
import validate  = require ('validate.js');
import  * as Mail from './mail';
import  * as schemaTypes from './schemaTypes';

function isMailValid(mail : string) : boolean{
   const constraints = {
      from: {
       email: true
      }
    };
    return validate({from: mail}, constraints) === undefined
}

function getPerfilData(id :string) : Promise< void | schemaTypes.IPerfil>   {
  const params : AWS.DynamoDB.DocumentClient.GetItemInput  = {
      TableName: 'Perfil',
      Key: { "perfil_id" : id},
   };

    const result : Promise<AWS.DynamoDB.DocumentClient.AttributeMap> = db.get(params) ;
    return result.then( (result : schemaTypes.IPerfil) => {return result}, 
                         error => console.log(error) );
}

function getPerfilQ(id : string) : Promise< void | schemaTypes.IPerfil>  {
    var params : AWS.DynamoDB.DocumentClient.GetItemInput  = {
      TableName: 'User',
          Key: {
            'id': id,
      },
    };
    const result : Promise<AWS.DynamoDB.DocumentClient.AttributeMap> = db.get(params) ;
    return result.then( (result : schemaTypes.IUser) =>{
           return getPerfilData(result.perfil_id)
    },  error => console.log(error) );
}

function getCredential(id : string) : Promise< void| AWS.DynamoDB.DocumentClient.AttributeMap[]> {
    var params = {
      TableName: 'User',
          Key: {
            'id': id,
      },
    };
    const result = db.get(params) ;
    return result.then( (re : any)  =>{
           var r = []
           for (const value of re.credentials) {
                r.push({'mail'  :value} )
};
           return r
    },  error => console.log(error) );
}




function registerUser(mail : string) : Promise<boolean> {
    if (! isMailValid(mail)){
      return new Promise((resolve, reject) => {
                      resolve(false);})
    }
    const userId : string = uuid.v4();
    const paramsCredential : AWS.DynamoDB.DocumentClient.PutItemInput = {
        TableName: 'Credential',
        Item:{
            'mail': mail,
            'userId': userId,
        }
    };

    db.createItem(paramsCredential).then(result => console.log(result), 
                                         error => console.log(error));

    const  paramUser : AWS.DynamoDB.DocumentClient.PutItemInput = {
        TableName: 'User',
        Item:{
            'id': userId,
            'status': false,
        }
    };
    Mail.send(mail,userId)
    return db.createItem(paramUser).then(result => {console.log(result)
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
  },

};
