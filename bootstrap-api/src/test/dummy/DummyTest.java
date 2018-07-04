package dummy;

import static org.junit.Assert.*;


import org.junit.Test;

public class DummyTest {

	  @Test(expected = IllegalArgumentException.class)
	  public void testExceptionIsThrown() {
	    Dummy tester = new Dummy();
	    tester.multiply(1000, 5);
	  }

	  @Test
	  public void testMultiply() {
		  Dummy tester = new Dummy();
	    assertEquals("10 x 5 must be 50", 50, tester.multiply(10, 5));
	  }
	}


