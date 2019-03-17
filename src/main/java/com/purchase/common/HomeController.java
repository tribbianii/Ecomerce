package com.purchase.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class HomeController {

@Autowired
private CommonService commonService;


@GetMapping(value="/home")
public String home(Model model) {
	model.addAttribute("roles", commonService.getAccountRoles());
	
	
	
	return "home";
	
}

}
