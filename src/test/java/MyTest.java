import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.purchase.account.AccountService;
import com.purchase.bean.AccountRole;
import com.purchase.common.CommonService;
import com.purchase.project.ProjectService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations= {"classpath:applicationContext.xml"})
public class MyTest {

	@Autowired
	private CommonService commonService;

	@Test
	public void testCommonService() {
		List<AccountRole> roles=commonService.getAccountRoles();
		System.out.println(roles);
		
	}
	
	
}
