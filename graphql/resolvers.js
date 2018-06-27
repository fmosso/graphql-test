// add to handler.js

import uuid from 'uuid/v1';
import * as db from './dynamo';


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



// eslint-disable-next-line import/prefer-default-export
export const resolvers = {
  Query: {
    getPerfil: (root, args) => getPerfilQ(args.id),
    getAllCredential: (root, args) =>  getCredential(args.id)
  },

};
