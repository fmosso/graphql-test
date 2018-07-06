package lambdas;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.validator.routines.EmailValidator;
import org.apache.log4j.Logger;

import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import dynamoDB.DBCreator;
import dynamoDB.GetItem;
import dynamoDB.ItemBuilder;
import dynamoDB.PutItem;




public class AddCredentialResolver implements RequestHandler<UserIdMail, Boolean > {
	final String tableUser = "User";
	final String keyNameUser = "id";
	final String tableCredential = "Credential";
	final String keyNameCredential = "mail";
	Boolean result;
	
	@Override
	public Boolean handleRequest(UserIdMail input, Context context) {
		result = false;
		Logger log = Logger.getLogger("Registering User");
		if(! EmailValidator.getInstance().isValid(input.mail)) {
			//Log message, spanish or english?
			log.error("Invalid Mail");
			return result;
		}
		DynamoDB dynamoDB = new DBCreator("dynamodb.us-east-1.amazonaws.com","us-east-1").makeDB();
		new GetItem(dynamoDB).get(tableUser,keyNameUser,input.userId)
				.ifPresent( ignored ->  { Map<String,Object> mapUserId = new HashMap<String, Object>();
									   mapUserId.put("userId",input.userId);
									   new PutItem(dynamoDB).put(tableCredential, 
											  		new ItemBuilder(keyNameCredential, input.mail, mapUserId ).build());
									  result = true;
									});
		return result;
	}


 


}
class UserIdMail {
	String mail;
	String userId;
	
	UserIdMail(){}
	
	
	public String getMail() {
		return mail;
	}
	public void setMail(String mail) {
		this.mail = mail;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
}