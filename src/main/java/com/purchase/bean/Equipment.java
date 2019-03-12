package com.purchase.bean;

import java.util.Date;

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
@Table(name="equipment")
public class Equipment {

	@Id
	@Column(name="equipment_id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@Column(name="equipment_name")
	private String name;
	
	@Column(name="equipment_size")
	private String size;
	
	@ManyToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="equipment_state")
	private EquipmentState equipmentState;
	
	@Column(name="equipment_manuf_date")
	private Date mannufacturDate;
	
	@Column(name="equipment_track_num")
	private String trackNumber;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public EquipmentState getEquipmentState() {
		return equipmentState;
	}

	public void setEquipmentState(EquipmentState equipmentState) {
		this.equipmentState = equipmentState;
	}

	public Date getMannufacturDate() {
		return mannufacturDate;
	}

	public void setMannufacturDate(Date mannufacturDate) {
		this.mannufacturDate = mannufacturDate;
	}

	public String getTrackNumber() {
		return trackNumber;
	}

	public void setTrackNumber(String trackNumber) {
		this.trackNumber = trackNumber;
	}
	
	
	
	
}
