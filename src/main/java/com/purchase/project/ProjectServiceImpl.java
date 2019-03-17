package com.purchase.project;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.purchase.bean.Project;
@Service
@Transactional(rollbackFor=Exception.class)
public class ProjectServiceImpl implements ProjectService{
	
	@Autowired
	private ProjectDao projectDao;
	
	
	public List<Project> getAllProjects() {
		return projectDao.getAllProjects();
	}

	public ProjectDao getProjectDao() {
		return projectDao;
	}

	public void setProjectDao(ProjectDao projectDao) {
		this.projectDao = projectDao;
	}

}
