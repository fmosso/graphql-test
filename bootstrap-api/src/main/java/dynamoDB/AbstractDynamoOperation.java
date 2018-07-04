package dynamoDB;

import com.amazonaws.services.dynamodbv2.document.DynamoDB;

public abstract class AbstractDynamoOperation {

	DynamoDB dynamoDB;
	
	AbstractDynamoOperation(DynamoDB db){
			this.dynamoDB = db;
		}

	
}
