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
		isConfirmed: boolean
            password: string
		perfil_id: string
            isActive: boolean
}

export interface ICredential extends AWS.DynamoDB.DocumentClient.AttributeMap{
            mail : string
            userId : string
}
