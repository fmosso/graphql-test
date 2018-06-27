package dynamoDB;

import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.services.dynamodbv2.document.Table;
import com.amazonaws.services.dynamodbv2.document.spec.GetItemSpec;

public class GetItem {

    public static void main(String[] args) throws Exception {

        DynamoDB dynamoDB = new DBCreator("dynamodb.us-west-2.amazonaws.com", "us-west-2").makeDB();
        Table table = dynamoDB.getTable("Teams");

        String name = "equipo1";

        GetItemSpec spec = new GetItemSpec().withPrimaryKey("Name", name);

        try {
            System.out.println("Attempting to read the item...");
            Item outcome = table.getItem(spec);
            System.out.println("GetItem succeeded: " + outcome);

        }
        catch (Exception e) {
            System.err.println("Unable to read item: " + name);
            System.err.println(e.getMessage());
        }

    }
}
