package dynamoDB;

import com.amazonaws.services.dynamodbv2.document.Item;
import java.util.Map;

public class ItemBuilder {
    String keyName;
    Object keyvalue;
    Map<String,Object> attributes;
    
    public ItemBuilder(String kn,Object kv,Map<String,Object> a ) {
    	this.keyName = kn;
    	this.keyvalue = kv;
    	this.attributes = a;
    }
	
	public Item build() {
		Item item =  new Item().withPrimaryKey(keyName, keyvalue);
		attributes.forEach( (k,v) -> item.with(k, v));
		return item;
	}
}
