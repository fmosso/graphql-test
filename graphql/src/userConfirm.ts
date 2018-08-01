// add to handler.js

import * as db from './dynamo';
import * as schemaTypes from './schemaTypes'


export function confirmUser(id : string) : Promise<string> {
    const  paramUser : AWS.DynamoDB.DocumentClient.UpdateItemInput = {
        TableName: 'User',
        Key:{
            'id': id,
        },   
        UpdateExpression : "set #ic = :s" ,
        ExpressionAttributeValues:{
            ":s":true,
        },
        ConditionExpression: "attribute_exists(id)",
        ExpressionAttributeNames: {"#ic":"isConfirmed"},
        ReturnValues:"UPDATED_NEW"
    };
    return db.updateItem(paramUser).then(result => {return "actualizado" }, 
                                         error => {return  "Usuario no encontrado"});
}    


