"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema = `
type Mutation {
    # add credential for user
    AddCredential(id : String!, mail: String!) : User!
    registerUser(mail: String!) : Boolean!
    confirmUser(id: String!) : Boolean!
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
exports.schema = schema;
//# sourceMappingURL=schema.js.map