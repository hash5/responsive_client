import org.junit.Before;
import org.junit.Test;

import com.thoughtworks.selenium.SeleneseTestBase;

public class ClosureUnitTests extends SeleneseTestBase {
	private final String URL_PREFIX = "http://localhost/www/";

	@Override
	@Before
	public void setUp() throws Exception {
		final String url = URL_PREFIX;
		// This initializes the protected "selenium" field with the base URL for the
		// tests and the browser to use when running the tests.
		setUp(url);
	}

	@Test
	public void testGoogString() throws Exception {
		selenium.open(URL_PREFIX + "asset/common/js/hash5/controller/UserController_atest.html");

		// Because the test runs automatically when the HTML file is loaded,
		// poll for up to 5 seconds to see whether the test is complete.
		selenium.waitForCondition(
				"window.G_testRunner && window.G_testRunner.isFinished()",
				"5000");
		// Invoke this snippet of JavaScript in the browser to query whether the
		// test succeeded or failed.
		String success = selenium.getEval("window.G_testRunner.isSuccess()");
		boolean isSuccess = "true".equals(success);
		if (!isSuccess) {
			// If the test failed, report the reason why.
			String report = selenium.getEval("window.G_testRunner.getReport()");
			fail(report);
		}
	}

}
