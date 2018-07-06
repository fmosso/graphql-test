package dynamoDB;

import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.apache.commons.validator.routines.EmailValidator;

import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Item;

/*
 * This class is temporal; later this class will be unit test for database
 */
public class TestDB {
	public static void main(String[] args) {
		//DynamoDB dynamoDB = new DBCreator("http://localhost:8000", "local").makeDB();
		DynamoDB dynamoDB = new DBCreator("dynamodb.us-east-1.amazonaws.com","us-east-1").makeDB();
	//	Item item = new GetItem(dynamoDB).get("Teams", "Name", "equipo1");
	//	System.out.println( item );
    //  String table = "Teams";
		// new PutItem(dynamoDB).put(table, equipo2());
	//	System.out.println(new GetItem(dynamoDB).get(table, "Name" , "equipo2" ));
	//	HashMap<String, Object> attributesToUpdate =  new HashMap<String, Object>();
	//	attributesToUpdate.put("Tag", "Actualizadp "  );
	//	new UpdateItem(dynamoDB).update(table, "Name" , "equipo2", attributesToUpdate);
	//	System.out.println(new GetItem(dynamoDB).get(table, "Name" , "equipo2" ));
		
		
		System.out.println("hi");
	}
	

}
