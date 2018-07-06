package dynamoDB;



	import com.amazonaws.services.dynamodbv2.document.DynamoDB;
	import com.amazonaws.services.dynamodbv2.document.Item;

	public class PutItem extends AbstractDynamoOperation {

		public PutItem(DynamoDB db) {
			super(db);
		}
		
		public void put(String Table, Item item) {
			try {
				this.dynamoDB.getTable(Table).putItem(item);
			}
	        catch (Exception e) {
	            System.err.println(e.getMessage());
	        }
		}

	}