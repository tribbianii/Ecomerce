package com.purchase.bean;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="project")
public class Project {

	@Id
	@Column(name="project_id")
	private int id;
	
	@Column(name="project_name")
	private String name;
	
	@Column(name="project_location")
	private String location;
	
	@Column(name="project_contact_name")
	private String contactName;
	
	@Column(name="project_contact_phone")
	private String contactPhone;
	
	@Column(name="project_contact_email")
	private String contactEmail;
	
	@OneToMany(targetEntity=Equipment.class,cascade=CascadeType.ALL)
	@JoinColumn(name="equipemnt_project")
	private Set<Equipment> equipments;

	
	public Project() {
		// TODO Auto-generated constructor stub
	}
	
	
	
	public Project(String name, String location, String contactName, String contactPhone, String contactEmail,
			Set<Equipment> equipments) {
		this();
		this.name = name;
		this.location = location;
		this.contactName = contactName;
		this.contactPhone = contactPhone;
		this.contactEmail = contactEmail;
		this.equipments = equipments;
	}



	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getContactName() {
		return contactName;
	}

	public void setContactName(String contactName) {
		this.contactName = contactName;
	}

	public String getContactPhone() {
		return contactPhone;
	}

	public void setContactPhone(String contactPhone) {
		this.contactPhone = contactPhone;
	}

	public String getContactEmail() {
		return contactEmail;
	}

	public void setContactEmail(String contactEmail) {
		this.contactEmail = contactEmail;
	}

	public Set<Equipment> getEquipments() {
		return equipments;
	}

	public void setEquipments(Set<Equipment> equipments) {
		this.equipments = equipments;
	}
	
	
	
	
	
}
