package lambdas;

import org.apache.log4j.Logger;

import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import dynamoDB.DBCreator;
import dynamoDB.GetItem;
import teamsPOJO.Perfil;
import teamsPOJO.ID;

public class GetPerfilResolver implements RequestHandler<ID,Perfil> {

	final String tableUser = "User";
	final String keyNameUser = "id";
	final String tablePerfil = "Perfil";
	final String keyNamePerfil = "perfil_id";
	@Override
	public Perfil  handleRequest(ID input, Context context) {
		Logger log =  Logger.getLogger("Get Perfil Resolver");
		DynamoDB dynamoDB = new DBCreator("dynamodb.us-east-1.amazonaws.com","us-east-1").makeDB();
		try {
			Item user = new GetItem(dynamoDB).get(tableUser, keyNameUser , input.id ).orElseThrow(() -> new Exception("User not Found") );
			Item perfil = new GetItem(dynamoDB).get(tablePerfil, keyNamePerfil , user.getString("perfil_id") ).
													orElseThrow(() -> new Exception("Perfil not Found"));
			return makePerfil(perfil) ;
		}
		catch(Exception e) {
			log.error(e.getMessage());
			return null; //Only because the graphql schema return a nullable perfil
		}
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

