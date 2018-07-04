package lambdas;

import static org.junit.Assert.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;

import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.services.lambda.runtime.Context;

import dynamoDB.ItemBuilder;
import teamsPOJO.Perfil;

public class GetResolverTest {

    private static ID input;

    @BeforeClass
    public static void createInput() throws IOException {
        // TODO: set up your sample input object here.
        input = new ID();
        input.setId("id1");
    }


    
    private Context createContext() {
        TestContext ctx = new TestContext();

        // TODO: customize your context here if needed.
        ctx.setFunctionName("Your Function Name");

        return ctx;
    }

    @Test
    public void testExampleHanlder() {
    	GetPerfilResolver handler = new GetPerfilResolver();
        Context ctx = createContext();

        Perfil output = handler.handleRequest(input, ctx);
        System.out.println(output.getName());
        System.out.println(output.getLast_name());
        
        
        Assert.assertTrue(true);
    }
}
