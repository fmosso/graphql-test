package dynamoDB;

import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Item;

public class GetItem extends AbstractDynamoOperation{
	

	public GetItem(DynamoDB db) {
		super(db);
	}

	public Item get(String Table,String keyName ,Object keyValue) {
		try {
			return this.dynamoDB.getTable(Table).getItem(keyName, keyValue);
		}
        catch (Exception e) {
            System.err.println("Unable to read item: " + keyName);
            System.err.println(e.getMessage());
            return null;
        }
	}

}
