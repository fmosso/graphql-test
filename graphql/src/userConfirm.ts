// add to handler.js

import * as db from './dynamo';
import * as schemaTypes from './schemaTypes'


export function confirmUser(id : string) : Promise<string> {
     const paramsGet : AWS.DynamoDB.DocumentClient.GetItemInput  = {
      TableName: 'User',
          Key: {
            'id': id,
      },
    };
    const  paramUser : AWS.DynamoDB.DocumentClient.UpdateItemInput = {
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
    return  db.get(paramsGet).then(result => {   if (result !== undefined) {
                                                        return db.updateItem(paramUser).then(result => {return "actualizado" }, 
                                                                                              error => {return  "encantrado pero no actualizado"});
                                                    }
                                                      else {
                                                         return "no encontrado" 
                                                     }              
                                              },
                                              error => { console.log(error)
                                                         return "fail" })
}    


