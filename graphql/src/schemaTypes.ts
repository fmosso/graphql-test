import AWS =  require('aws-sdk');

export interface IPerfil extends AWS.DynamoDB.DocumentClient.AttributeMap{
            perfil_id: string,
            name: string,
            last_name: string,
            phone: number,
            photo: string,
}

export interface IUser extends AWS.DynamoDB.DocumentClient.AttributeMap{
            id: string,
			status: boolean
			perfil_id: string
}

export interface ICredential extends AWS.DynamoDB.DocumentClient.AttributeMap{
            mail : string
            userId : string
}
