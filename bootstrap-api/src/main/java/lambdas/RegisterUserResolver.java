package lambdas;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.apache.commons.validator.routines.EmailValidator;
import org.apache.log4j.Logger;

import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import dynamoDB.DBCreator;
import dynamoDB.ItemBuilder;
import dynamoDB.PutItem;

public class RegisterUserResolver implements RequestHandler<Mail,Boolean> {

	final String tableuser = "User";
	final String keyNameuser = "id";
	final String tableCredential = "Credential";
	final String keyNameCredential = "mail";
	
	
	@Override
	public Boolean  handleRequest(Mail input, Context context) {
		Logger log = Logger.getLogger("Registering User");
		if(! EmailValidator.getInstance().isValid(input.mail)) {
			//Log message, spanish or english?
			log.error("Invalid Mail");
			return false;
		}
		final String id = UUID.randomUUID().toString();
		DynamoDB dynamoDB = new DBCreator("dynamodb.us-east-1.amazonaws.com","us-east-1").makeDB();
		
		Map<String,Object> userId = new HashMap<String,Object>();
		userId.put("userId", id);
		new PutItem(dynamoDB).put(tableCredential , new ItemBuilder(keyNameCredential,input.mail,userId ).build());
		
		Map<String,Object> userStatus = new HashMap<String,Object>();
		userStatus.put("status", false);		
		new PutItem(dynamoDB).put(tableuser , new ItemBuilder(keyNameuser,id,userStatus  ).build());
		
		return true ;
	}

}

class Mail{
    
    public String mail;
 	public Mail(){}
 	public String getMail() {
			return mail;
	}
		public void setMail(String id) {
			this.mail = id;
   }
 	
 }


