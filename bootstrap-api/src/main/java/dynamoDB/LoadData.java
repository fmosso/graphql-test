package dynamoDB;

import java.io.File;
import java.util.Iterator;

import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.services.dynamodbv2.document.Table;
import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class LoadData extends AbstractDynamoOperation{

    LoadData(DynamoDB db) {
		super(db);
	}
    
    public void upload(String t,String fileName) {
    	Table table =  dynamoDB.getTable(t);
    	try {
    		JsonParser parser = new JsonFactory().createParser(new File(fileName));
    	}
        catch (Exception e) {
            System.err.println("Unable to add movie: ");
            System.err.println(e.getMessage());
        }
    }

	public static void main(String[] args) throws Exception {
    	
    	DynamoDB dynamoDB = new DBCreator("http://localhost:8000","us-west-2").makeDB();

        Table table = dynamoDB.getTable("Movies");

        JsonParser parser = new JsonFactory().createParser(new File("mockdata/moviedata.json"));

        JsonNode rootNode = new ObjectMapper().readTree(parser);
        Iterator<JsonNode> iter = rootNode.iterator();

        ObjectNode currentNode;

        while (iter.hasNext()) {
            currentNode = (ObjectNode) iter.next();

            int year = currentNode.path("year").asInt();
            String title = currentNode.path("title").asText();

            try {
                table.putItem(new Item().withPrimaryKey("year", year, "title", title).withJSON("info",
                    currentNode.path("info").toString()));
                System.out.println("PutItem succeeded: " + year + " " + title);

            }
            catch (Exception e) {
                System.err.println("Unable to add movie: " + year + " " + title);
                System.err.println(e.getMessage());
                break;
            }
        }
        parser.close();
    }
}