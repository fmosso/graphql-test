package dynamoDB;

import java.util.Map;

import com.amazonaws.services.dynamodbv2.document.AttributeUpdate;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.spec.UpdateItemSpec;


public class  UpdateItem  extends AbstractDynamoOperation {

	UpdateItem(DynamoDB db) {
		super(db);
	}

		public void update(String table, String keyName,Object keyValue ,Map<String,Object>  attributesToUpdate) {
			UpdateItemSpec updateItemSpec = new UpdateItemSpec().withPrimaryKey(keyName, keyValue);
			attributesToUpdate.forEach( (k,v) ->  updateItemSpec.addAttributeUpdate( new AttributeUpdate(k).put(v) ) );
			try {
				this.dynamoDB.getTable(table).updateItem(updateItemSpec);
			}
	        catch (Exception e) {
	            System.err.println("Unable to read item: " + keyName);
	            System.err.println(e.getMessage());
	        }
		}

}
