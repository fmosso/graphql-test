package lambdas;

import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import dynamoDB.DBCreator;
import dynamoDB.GetItem;

public class ExampleHandler implements RequestHandler<TeamName,Team> {

	final String table = "Teams";
	final String keyName = "Name";
	@Override
	public Team handleRequest(TeamName input, Context context) {
		DynamoDB dynamoDB = new DBCreator("dynamodb.us-west-2.amazonaws.com","us-west-2").makeDB();
		Item outcome = new GetItem(dynamoDB).get(table, keyName , input.name );
		System.out.println(outcome);
		return  makeTeam(outcome);
	}
	
	private Team makeTeam(Item outcome) {
		Team team = new Team();
		team.setName(outcome.getString("Name"));
		team.setActive(outcome.getBoolean("Active"));
		team.setDescription(outcome.getString("Description"));
		team.setDateOfCreation(outcome.getList("Date_of_creation"));
		team.setCreator(outcome.getString("Creator"));
		team.setTag(outcome.getString("Tag"));
		team.setIcon(outcome.getString("Icon"));
		return team;
	}
	


	
}
