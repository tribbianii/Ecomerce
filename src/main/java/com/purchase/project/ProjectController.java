package com.purchase.project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/project")
public class ProjectController {
	@Autowired
	private ProjectService projectService;
	
	@RequestMapping("/hello")
	public void sayHello() {
		System.out.println("hello...");
	}

}
