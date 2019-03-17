package com.purchase.common;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.purchase.bean.AccountRole;
@Repository
@Transactional(rollbackFor=Exception.class)
public class DefaultCommonDao implements CommonDao{

	@Autowired
	private SessionFactory sessionFactory;
	
	/**
	 * get all account roles
	 */
	@SuppressWarnings("unchecked")
	public List<AccountRole> getAccountRoles() {
		Session session=sessionFactory.getCurrentSession();
		
		return session.createQuery("from AccountRole").list();
	}

}
