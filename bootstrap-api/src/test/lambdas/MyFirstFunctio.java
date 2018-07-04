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

public class MyFirstFunctio {

    private static TeamName input;

    @BeforeClass
    public static void createInput() throws IOException {
        // TODO: set up your sample input object here.
        input = new TeamName("equipo2");
    }


    
    private Context createContext() {
        TestContext ctx = new TestContext();

        // TODO: customize your context here if needed.
        ctx.setFunctionName("Your Function Name");

        return ctx;
    }

    @Test
    public void testExampleHanlder() {
    	ExampleHandler handler = new ExampleHandler();
        Context ctx = createContext();

        Team output = handler.handleRequest(input, ctx);
        System.out.println(output);
        
        
        Assert.assertTrue(true);
    }
}
