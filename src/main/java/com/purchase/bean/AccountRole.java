package com.purchase.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="account_role")
public class AccountRole {

@Id
@Column(name="account_role_id")
private int id;	

@Column(name="account_role_name")
private String name;

public AccountRole() {
}



public AccountRole(String name) {
	this();
	this.name = name;
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



@Override
public String toString() {
	return "AccountRole [id=" + id + ", name=" + name + "]";
}


}
