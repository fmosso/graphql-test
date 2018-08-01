const schema = `
type Mutation {
    # add credential for user
    addCredential(id : String!, mail: String!) : User!
    login(mail: String, password: String!) : String
    signUp(mail: String, password: String!) : Boolean!
    registerUser(mail: String!) : Boolean!
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

// eslint-disable-next-line import/prefer-default-export
export { schema };
