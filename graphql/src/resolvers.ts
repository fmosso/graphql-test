// add to handler.js

import uuid = require('uuid');
import * as db from './dynamo';
import validate  = require ('validate.js');
import  * as Mail from './mail';
import  * as schemaTypes from './schemaTypes';
import bcrypt = require('bcrypt');

function isMailValid(mail : string) : boolean{
   const constraints = {
      from: {
       email: true
      }
    };
    return validate({from: mail}, constraints) === undefined
}

  /*
  Same requirements as gmail
    - 8 characters long
    - at least 1 letter
    - at least 1 number
    - at least 1 specialSymbol
    I don't know if there is a better way; there is repetition of code, but the function
    should answer for all the condition not meet.
    */
  function passwordValidator(password : string) : boolean {
         var isValid : boolean = true
         if (! (password.length >= 8)){
           console.log("Contraseña muy corta")
           isValid =  isValid && false
         }
         // I am not requiring lowercase and uppercase
         if (! /[A-Za-z]/.test(password) ){
           console.log("Contraseña no contiene letras")
           isValid = isValid && false
         }
         if (! /\d/.test(password) ){
           console.log("Contraseña no contiene numeros")
           isValid = isValid && false
         }
         /*
          I think this requirement is too much
         if (! /\W/.test(password) ){
           console.log("Contraseña no contiene caracteres especiales")
           isValid = isValid && false
         }
         */
         return true
   }


   function getCredential(mail: string) : Promise<AWS.DynamoDB.DocumentClient.AttributeMap> {
      const  paramCredential : AWS.DynamoDB.DocumentClient.GetItemInput = {
            TableName: 'Credential',
            Key:{
                'mail': mail,
            },
      }
      return db.get(paramCredential)
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

/*
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
*/



function registerUser(mail : string) : Promise<boolean> {
    if (! isMailValid(mail)){
      console.log("Mail no valido")
      return new Promise((resolve, reject) => {
                      resolve(false);})
    }
    const userId : string = uuid.v4();
    const paramsCredential : AWS.DynamoDB.DocumentClient.PutItemInput = {
        TableName: 'Credential',
        Item:{
            'mail': mail,
            'userId': userId,
        },
        ConditionExpression: "attribute_not_exists(mail)"
        };

    return db.createItem(paramsCredential).then(result => {console.log("credencial creada" )
                                                            const  paramUser : AWS.DynamoDB.DocumentClient.PutItemInput = {
                                                                       TableName: 'User',
                                                                       Item:{
                                                                              'id': userId,
                                                                              'isConfirmed': false,
                                                                            }
                                                            };
                                                            return db.createItem(paramUser).then(result => {console.log("usuario creado")
                                                                                                            Mail.send(mail,userId)
                                                                                                            return true }, 
                                                                                                error => {console.log("error al crear usuario") 
                                                                                                          return false});
             
                                                    }, 
                                                    error => { console.log("Mail ya Registrado")
                                                                return false
                                                             } );


 }


function signUp(mail : string, password : string) : Promise<boolean> {
    if (! passwordValidator(password)){
        console.log("Contraseña no valida")
        return new Promise((resolve, reject) => {
                      resolve(false);})
    }
   

    return getCredential(mail).then( (result : schemaTypes.ICredential) => {
                                                const saltRounds = 10
                                                return bcrypt.hash(password, saltRounds).then(function(hash) {     
                                                        const  paramUser : AWS.DynamoDB.DocumentClient.UpdateItemInput = {
                                                             TableName: 'User',
                                                             Key:{
                                                                 'id': result.userId,
                                                             },   
                                                             UpdateExpression : "set #p = :hash" ,
                                                             ConditionExpression: " (#ic = :bool ) AND attribute_exists(id) AND attribute_not_exists(password)",
                                                             ExpressionAttributeNames: {"#p":"password",
                                                                                         "#ic": "isConfirmed"},
                                                             ExpressionAttributeValues:{
                                                                 ":hash":hash,
                                                                 ":bool":true
                                                             },
                                                             ReturnValues:"UPDATED_NEW"
                                                        };
                                                        return  db.updateItem(paramUser).then( result => {return true},
                                                                                               error =>  { console.log(error)
                                                                                                           return false})
                                                })}, 
                                                                           
                                                error => {  console.log( "Mail no encontrado")
                                                            return false})

}

function login(mail : string, password : string) : Promise<string | void>  {
      return getCredential(mail).then( (result : schemaTypes.ICredential) => { 
                                                        const  paramUser : AWS.DynamoDB.DocumentClient.GetItemInput = {
                                                             TableName: 'User',
                                                             Key:{
                                                                 'id': result.userId,
                                                             }, 
                                                        };                                       
                                                        return db.get(paramUser).then( (result : schemaTypes.IUser) => {
                                                                      if (! result.isConfirmed ) {
                                                                        console.log(result)
                                                                         // returns void
                                                                         return; 
                                                                      }
                                                                      return bcrypt.compare(password, result.password).then(function(res : boolean) {
                                                                          if (res) {
                                                                            const  paramUser : AWS.DynamoDB.DocumentClient.UpdateItemInput = {
                                                                              TableName: 'User',
                                                                                 Key:{
                                                                                     'id': result.id,
                                                                                 },   
                                                                                 UpdateExpression : "set #ia = :bool" ,
                                                                                 ExpressionAttributeNames: {"#ia":"isActive"},
                                                                                 ExpressionAttributeValues:{ ":bool":true},
                                                                                 ReturnValues:"UPDATED_NEW"
                                                                            }
                                                                          return db.updateItem(paramUser).then ( r => { return result.id},
                                                                                                                 error => {console.log(error)})
                                                                        }

                                                                      });},
                                                                      error => {console.log(error)}

                                                          )},
                                 error =>  console.log(error))


}

// eslint-disable-next-line import/prefer-default-export
export const resolvers = {
  Query: {
    getPerfil: (root, args) => getPerfilQ(args.id),
    getAllCredential: (root, args) =>  getCredential(args.id)
  },
  Mutation: {
    registerUser: (root, args) => registerUser(args.mail),
    signUp: (root, args) => signUp(args.mail,args.password),
    login: (root, args) =>  login(args.mail,args.password),
  },

};
