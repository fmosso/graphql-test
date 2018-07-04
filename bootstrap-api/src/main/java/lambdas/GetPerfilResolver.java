package lambdas;

import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import dynamoDB.DBCreator;
import dynamoDB.GetItem;
import teamsPOJO.Perfil;

public class GetPerfilResolver implements RequestHandler<ID,Perfil> {

	final String tableuser = "User";
	final String keyNameuser = "id";
	final String tablePerfil = "Perfil";
	final String keyNamePerfil = "perfil_id";
	@Override
	public Perfil  handleRequest(ID input, Context context) {
		DynamoDB dynamoDB = new DBCreator("dynamodb.us-east-1.amazonaws.com","us-east-1").makeDB();
		Item user = new GetItem(dynamoDB).get(tableuser, keyNameuser , input.id );
		Item perfil = new GetItem(dynamoDB).get(tablePerfil, keyNamePerfil , user.getString("perfil_id") );
		return makePerfil(perfil) ;
	}
	
	private Perfil makePerfil(Item outcome) {
		Perfil perfil = new Perfil();
		perfil.setLast_name(outcome.getString("last_name") );
		perfil.setName(outcome.getString("name") );
        perfil.setPerfil_id(outcome.getString("perfil_id"));
        perfil.setPhone(outcome.getInt("phone") );
        perfil.setPhoto(outcome.getString("photo"));
		return perfil;
	}

	
}
class ID{
    
    String id;
 	ID(){}
 	public String getId() {
			return id;
	}
		public void setId(String id) {
			this.id = id;
   }
 	
 }
