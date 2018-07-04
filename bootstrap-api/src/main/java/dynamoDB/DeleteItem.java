package dynamoDB;

import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.PrimaryKey;
import com.amazonaws.services.dynamodbv2.document.Table;
import com.amazonaws.services.dynamodbv2.document.spec.DeleteItemSpec;


public class DeleteItem extends AbstractDynamoOperation {

    DeleteItem(DynamoDB db) {
		super(db);
	}
    
    public void delete(String table, String  keyName, Object keyValue ) {
		try {
			this.dynamoDB.getTable(table).deleteItem(keyName, keyValue);
		}
        catch (Exception e) {
            System.err.println("Unable to read item: " + keyName);
            System.err.println(e.getMessage());
        }
		
    }

}