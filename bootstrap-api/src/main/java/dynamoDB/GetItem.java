package dynamoDB;

import java.util.Optional;

import org.apache.log4j.Logger;

import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Item;


public class GetItem extends AbstractDynamoOperation{
	

	public GetItem(DynamoDB db) {
		super(db);
	}

	public Optional<Item> get(String Table,String keyName ,Object keyValue) {
		Logger log = Logger.getLogger("Getting item");
		try {
			log.trace("Item obtained" + keyName );
			return  Optional.of(this.dynamoDB.getTable(Table).getItem(keyName, keyValue));
			
		}
        catch (Exception e) {
        	log.warn("Unable to read item: " + keyName);
            return Optional.empty();
        }
	}

}
