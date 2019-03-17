package com.purchase.common;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.purchase.bean.AccountRole;
@Service
public class DefaultCommonService implements CommonService{
	@Autowired
	private CommonDao commonDao;
	
	public List<AccountRole> getAccountRoles() {
		
		return commonDao.getAccountRoles();
	}

}
