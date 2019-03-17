package com.purchase.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.purchase.common.CommonService;

@Controller
public class AccountController {
	@Autowired
	private CommonService commonService;
	
	@RequestMapping("/getSignup")
	public String getSignupPage(Model model) {
		model.addAttribute("roles", commonService.getAccountRoles());
		return "signup";
	}
}
