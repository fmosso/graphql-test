package lambdas;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import dynamoDB.DBCreator;
import dynamoDB.GetItem;
import teamsPOJO.ID;
import teamsPOJO.Credential;

public class GetAllCredentialsResolver implements RequestHandler<ID, List<Credential> > {

	final String tableuser = "User";
	final String keyNameuser = "id";
	final String id = UUID.randomUUID().toString();
	@Override
	public  List<Credential>  handleRequest(ID input, Context context) {
		DynamoDB dynamoDB = new DBCreator("dynamodb.us-east-1.amazonaws.com","us-east-1").makeDB();
		Optional<Item> maybeUser = new GetItem(dynamoDB).get(tableuser, keyNameuser , input.id );
		List<Credential> credentials = new ArrayList<Credential>();
		maybeUser.ifPresent( user -> {List<String> l = user.getList("credentials");
										for (String c : l) {
											credentials.add(new Credential(c));
										}});
		return credentials;
	}
}


