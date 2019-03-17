 $(function(){
	  $('.ui.accordion').accordion(); 
	  $(".ui.selection.dropdown").dropdown();
	  
	  //=================================searching
		$("#searchGrant").click(function(){
			$(this).addClass("disabled").addClass("loading");
			var searchCond=utils.getSearchCond($("#searchDiv"));
			searchCond.status=1;
			$.ajax({
				url:"searchGrants",
				method:"POST",
				data:searchCond,
				success:function(data){
					$(".ui.stacked.blue.segment").children().remove();
					$(".ui.stacked.blue.segment").append(data);
					//$(this).removeClass("disabled").removeClass("loading");
					
					
				},
				error:function(){
					$(this).removeClass("disabled").removeClass("loading");
				}
				
			});
			
			
		});
	  
	  
	  
	  
	  
	  
	  
	  
      //==========================award
	  $(".ui.mini.green.button").click(function(){
		  var grant_id=$(this).attr("data-id");
		  $("#award_modal").modal({
			  closable  : false,
			  onDeny:function(){
				  return true;
			  },
			  onApprove:function(){
				  if($("input[name=awarded_funding]").val()===""||$("input[name=awarded_funding]").val()===0){
					  alert("Please enter correct awarded funding!");
					  return false;
				  }
				  
				  $.ajax({
					  url:"grant?action=award",
					  method:"POST",
					  data:{"grant_id":grant_id,"award_funding":$("input[name=awarded_funding]").val()},
					  success:function(){
						  utils.loadContent("apps",$(".ui.stacked.blue.segment"));
					  },
					  error:function(){
						  
					  }
					  
					  
				  });
				  return true;
				  
				  
			  }
			  
			  
		  }).modal("show");
		  
		  
		  
		  
	  });
	  
      //==========================non award
	  $(".ui.mini.red.button").click(function(){
		  var grant_id=$(this).attr("data-id");
		  $("#nonaward_modal").modal({
			  closable  : false,
			  onDeny:function(){
				  return true;
			  },
			  onApprove:function(){
				  if($("textarea[name=reject_reason]").val()===""){
					  alert("Please enter reject reason!");
					  return false;
				  }
				  
				  $.ajax({
					  url:"grant?action=nonaward",
					  method:"POST",
					  data:{"grant_id":grant_id,"reason":$("textarea[name=reject_reason]").val()},
					  success:function(){
						  utils.loadContent("apps",$(".ui.stacked.blue.segment"));
					  },
					  error:function(){
						  
					  }
					  
					  
				  });
				  return true;
				  
				  
			  }
			  
			  
		  }).modal("show");
		  
		  
		  
	  });
	  
	  
	  
	  
	  
	  //============================update application========================================
	  $("button[name=edit]").click(function(){
			$.ajax({
				  	url:"grantForm?type=1",//1 is update application
				  			
					method:"POST",
					 data:{"grant_id":$(this).attr("data-id")},
					 success:function(data){
							$("#model").children().remove();
							$("#model").append(data);
							$("#model").modal({
								 	closable  : false,
								    onVisible:function(){
								    	$(".ui.multiple.selection.dropdown").dropdown('restore defaults');
								    	$(".ui.selection.dropdown").dropdown();
								    },
								    onDeny: function(){
									      return true;
									    },
									onApprove : function($element) {
										var formData=utils.validatev3($("#submit_grant_segment"));
										
										//validate application due date reminders
										var reminders=[];
										$.each($("#app_due_rem_div").find("input"),function(i,k){
											var reminder=$(k);
											if(reminder.val()===""){
												utils.alert("Please enter reminder date!");
												formData.success=false;
												return;
											}
											
											if(reminder.val()<formData.app_due_date){
												utils.alert("Reminder's date must be after than application due date.");
												formData.success=false;
												return;
											}
											reminders.push(reminder.val());
											
											
										});
										
										//formData.reminder_type=0;
										formData.reminders=reminders;
										
										if(formData.success){
											formData.grant_id=$element.attr("data-id");
											$.ajax({
												url:"grant?action=updateApp",
												method:"POST",
												data:formData,
												
												
												success:function(){
													utils.loadContent("apps",$(".ui.stacked.blue.segment"));
													
													
												},
												error:function(){
													
												}
											});	
										}
										return formData.success;
									    }
								
								
								
							}).modal("show");
					 },
					 error:function(){
						 
					 }
				
			}); 
		  

		  
		  
	  });
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  //============================add application========================================
	  $(".ui.small.positive.labeled.icon.button").click(function(){
			$.ajax({
				  	url:"grantForm?type=0",//0 is add application
					method:"POST",
					 success:function(data){
							$("#model").children().remove();
							$("#model").append(data);
							$("#model").modal({
								 	closable  : false,
								    onVisible:function(){
								    	$(".ui.multiple.selection.dropdown").dropdown('restore defaults');
								    	$(".ui.selection.dropdown").dropdown();
								    },
								    onDeny    : function(){
									      return true;
									    },
									onApprove : function($element) {
										
										var formData=utils.validatev3($("#submit_grant_segment"));
										if(!formData.success){
											return false;
										}
										//validate application due date reminders
										var reminders=[];
										$.each($("#app_due_rem_div").find("input"),function(i,k){
											var reminder=$(k);
											if(reminder.val()===""){
												utils.alert("Please enter reminder date!");
												formData.success=false;
												return;
											}
											
											if(reminder.val()<formData.app_due_date){
												utils.alert("Reminder's date must be after than application due date.");
												formData.success=false;
												return;
											}
											reminders.push(reminder.val())
											
											
										});
										
										
										formData.reminders=reminders;
										
										//validate log in information
//										var infos=[];
//										$.each($("div[name=lii_field_list]").children("div .four.fields"),function(i,k){
//											var info={};
//											var $div=$(k).find("input[type=text]");
//											//console.log($div)
//											info.url=$($div[0]).val();
//											info.username=$($div[1]).val();
//											info.password=$($div[2]).val();
//											infos.push(info);
//											
//											
//											
//										});
//										formData.infos=infos;
										
										
										
										
										
										if(formData.success){
											$.ajax({
												url:"grant?action=addApp",
												method:"POST",
												data:formData,
												
												
												success:function(){
													utils.loadContent("apps",$(".ui.stacked.blue.segment"));
													
													
												},
												error:function(){
													
												}
											});	
											
										}
										//console.log(formData);
										return formData.success;
									    }
								
								
								
							}).modal("show");
					 },
					 error:function(){
						 
					 }
				
			}); 
		  

		  
		  
	  });
	  
	  
  });