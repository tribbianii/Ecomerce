package com.purchase.bean;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="accounts")
public class Account {

@Id
@Column(name="account_id")
@GeneratedValue(strategy=GenerationType.IDENTITY)
private int id;	

@Column(name="account_name")
private String name;

@Column(name="account_logname")
private String logname;
	
@Column(name="account_password")
private String password;

@ManyToOne(cascade=CascadeType.ALL)
@JoinColumn(name="account_role")
private AccountRole accountRole;

public Account() {
}

public Account(String name, String logname, String password, AccountRole accountRole) {
	this();
	this.name = name;
	this.logname = logname;
	this.password = password;
	this.accountRole = accountRole;
}

public int getId() {
	return id;
}

public void setId(int id) {
	this.id = id;
}

public String getName() {
	return name;
}

public void setName(String name) {
	this.name = name;
}

public String getLogname() {
	return logname;
}

public void setLogname(String logname) {
	this.logname = logname;
}

public String getPassword() {
	return password;
}

public void setPassword(String password) {
	this.password = password;
}

public AccountRole getAccountRole() {
	return accountRole;
}

public void setAccountRole(AccountRole accountRole) {
	this.accountRole = accountRole;
} 


}
