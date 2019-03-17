  $(function(){
	  $('.ui.accordion').accordion(); 
	  $(".ui.selection.dropdown").dropdown();
	  
	  
	  //=================================searching
		$("#searchGrant").click(function(){
			$(this).addClass("disabled").addClass("loading");
			var searchCond=utils.getSearchCond($("#searchDiv"));
			searchCond.status=2;
			$.ajax({
				url:"searchGrants",
				method:"POST",
				data:searchCond,
				success:function(data){
					$(".ui.stacked.blue.segment").children().remove();
					$(".ui.stacked.blue.segment").append(data);
					
					
				},
				error:function(){
					$(this).removeClass("disabled").removeClass("loading");
				}
				
			});
			
			
		});

      //==========================archived
	  $("button[name=archive_button]").click(function(){
		  var grant_id=$(this).attr("data-id");
		  $("#archive_modal").modal({
			  closeable:false,
			  onDeny:function(){
				  return true;
			  },
			  onApprove:function(){
				  $.ajax({
					  url:"grant?action=archive",
					  method:"POST",
					  data:{"grant_id":grant_id},
					  success:function(){
						  utils.loadContent("awardedGrants?mode=1",$(".ui.stacked.blue.segment"));
					  },
					  error:function(){
						  
					  } 
				  
				  });  
				  
			  }
			  
			  
		  }).modal("show");
		  
		  
	  });
	  
	  
	  
	  
	  //============================update awarded grant========================================
	  $("button[name=edit_grant]").click(function(){
		  var grant_id=$(this).attr("data-id");
		  
			$.ajax({
				  	url:"grantForm?type=2",//2 is update awarded grant
				  			
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
										
										var formData=utils.validatev3($("#submit_grant_segment"))
										formData.grant_id=grant_id;
										//console.log(formData);
										if(!formData.success){
											return false;
										}
										//get final report deadline reminder
										var reminders=[];
										$.each($("#final_rep_dead_rem_div").find("input"),function(i,k){
											var reminder=$(k);
											if(reminder.val()===""){
												utils.alert("Please enter reminder date!");
												formData.success=false;
												return;
											}
											
											if(reminder.val()<formData.frd){
												utils.alert("Reminder's date must be after than final report deadline!");
												formData.success=false;
												return;
											}
											reminders.push(reminder.val());
											
											
										});
										
										//formData.reminder_type=1;
										formData.reminders=reminders;
										$.ajax({
											url:"grant?action=updateGrant",
											method:"POST",
											data:formData,
											success:function(){
												utils.loadContent("awardedGrants?mode=1",$(".ui.stacked.blue.segment"));
											},
											error:function(){
												
											}
									});	
										return true;
									    }
								
								
								
							}).modal("show");
					 },
					 error:function(){
						 
					 }
				
			}); 
	  });
	  
	  
  });
  