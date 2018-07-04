package dynamoDB;

import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;

public class DBCreator {
	String endpoint;
	String region;
	
	public DBCreator(String e, String r){
		this.endpoint = e; 
		this.region = r;
	}

	private AmazonDynamoDB makeClient(){
		return AmazonDynamoDBClientBuilder.standard()
                .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(this.endpoint, this.region))
                .build();
	}
	
	public DynamoDB makeDB() {
		return new DynamoDB(makeClient());
	} 
	
	public String getEndpoint() {
		return endpoint;
	}

	public void setEndpoint(String endpoint) {
		this.endpoint = endpoint;
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}
}
