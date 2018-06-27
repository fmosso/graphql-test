package dynamoDB;
import java.util.Arrays;

import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Table;
import com.amazonaws.services.dynamodbv2.model.AttributeDefinition;
import com.amazonaws.services.dynamodbv2.model.KeySchemaElement;
import com.amazonaws.services.dynamodbv2.model.KeyType;
import com.amazonaws.services.dynamodbv2.model.ProvisionedThroughput;
import com.amazonaws.services.dynamodbv2.model.ScalarAttributeType;

/*
 * Tables should be created on the console/client, left this script
 * for creating tables, just in case.
 * This script create the table "Movies" in localhost
 */
@Deprecated
public class CreateTable {

    public static void main(String[] args) throws Exception {
    	

            DynamoDB dynamoDB = new DBCreator("http://localhost:8000","us-west-2").makeDB();

            final String  TABLENAME = "Movies1";

            try {
                System.out.println("Attempting to create table; please wait...");
                Table table = dynamoDB.createTable(TABLENAME,
                    Arrays.asList(new KeySchemaElement("year", KeyType.HASH), // Partition
                                                                              // key
                        new KeySchemaElement("title", KeyType.RANGE)), // Sort key
                    Arrays.asList(new AttributeDefinition("year", ScalarAttributeType.N),
                        new AttributeDefinition("title", ScalarAttributeType.S)),
                    new ProvisionedThroughput(10L, 10L));
                table.waitForActive();
                System.out.println("Success.  Table status: " + table.getDescription().getTableStatus());
            }
            catch (Exception e) {
                System.err.println("Unable to create table: ");
                System.err.println(e.getMessage());
            }

    }
}