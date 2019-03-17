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
import javax.persistence.Transient;

@Entity
@Table(name="accounts")
public class Account {

@Id
@Column(name="account_id")
@GeneratedValue(strategy=GenerationType.IDENTITY)
private int id;	

@Column(name="account_firstname")
private String firstName;

@Column(name="account_midtname")
private String midName;

@Column(name="account_lasttname")
private String lastName;


@Transient
private String fullName;

@Column(name="account_password")
private String password;

@ManyToOne(cascade=CascadeType.ALL)
@JoinColumn(name="account_role")
private AccountRole accountRole;

@Column(name="account_state")
private int state;

public Account() {
}



}
