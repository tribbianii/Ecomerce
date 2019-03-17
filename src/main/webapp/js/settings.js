$(function(){
	//===================================add title

	var add_title_modal=$("#add_title_modal").modal({
		//closable:false,
		onDeny:function(){
			return true;
		},
		onApprove:function(){
			//console.log($("input[name=dep_name]").last().val());
			var value=$("input[name=title]").last().val();
			if(value===""){
				return false;
			}
			$.ajax({
				url:"settings?action=addTitle",
				method:"POST",
				//async: false,
				data:{"title":value},
				success:function(){
					//add_dep_modal.modal("hide");
					//console.log("1");
					//setTimeout(function(){ 
						utils.loadContent("settings?action=settings",$("#content_seg"));
					//}, 3000);
					
				},
				error:function(){
					
				}
			
			
		});
			//return true;
			
			
		}
		
	});
	$("#add_title").click(function(){
		add_title_modal.modal("show");
	});
	
	
	
	
	
	
	
	
	//===================================add department

	var add_dep_modal=$("#add_dep_modal").modal({
		//closable:false,
		onDeny:function(){
			return true;
		},
		onApprove:function(){
			//console.log($("input[name=dep_name]").last().val());
			var value=$("input[name=dep_name]").last().val();
			if(value===""){
				return false;
			}
			$.ajax({
				url:"settings?action=add_dep",
				method:"POST",
				//async: false,
				data:{"dep_name":value},
				success:function(){
					//add_dep_modal.modal("hide");
					//console.log("1");
					//setTimeout(function(){ 
						utils.loadContent("settings?action=settings",$("#content_seg"));
					//}, 3000);
					
				},
				error:function(){
					
				}
			
			
		});
			//return true;
			
			
		}
		
	});
	$("#add_dep").click(function(){
		add_dep_modal.modal("show");
	});
	
	//===================================add grantor
	var add_grantor_modal=$("#add_grantor_modal").modal({
		//closable:false,
		onDeny:function(){
			return true;
		},
		onApprove:function(){
			var value=$("input[name=grantor_name]").last().val();
			if(value===""){
				return false;
			}
			
			$.ajax({
				url:"settings?action=add_grantor",
				method:"POST",
				data:{"grantor_name":value},
				success:function(){
					add_grantor_modal.modal("hide");
					utils.loadContent("settings?action=settings",$("#content_seg"));
				},
				error:function(){
					
				}
				
				
			});
			//return true;
		}

	});
	
	
	
	
	
	$("#add_grantor").click(function(){
		add_grantor_modal.modal("show");
	});
	
	
	
	
	//===================================add email
	$("#add_email").click(function(){
		$("#add_email_modal").modal({
			closable:false,
			onDeny:function(){
				return true;
			},
			onApprove:function(){
				var value=$("input[name=email_name]").last().val();
				if(value===""){
					return false;
				}
				
				$.ajax({
					url:"settings?action=add_email",
					method:"POST",
					data:{"email":value},
					success:function(){
						$("#add_email_modal").modal("hide");
						utils.loadContent("settings?action=settings",$("#content_seg"));
					},
					error:function(){
						
					}
					
					
				});
				//return true;
			}

		}).modal("show");
	});
	//===================delete department
	$("i[data-type=1]").click(function(){
		//var op_type= $(this).attr("data-type");
		var op_id=$(this).attr("data-id");
		$("#delete_dep_modal").modal({
			closable:false,
			onDeny:function(){
				return true;
			},
			onApprove:function(){
				$.ajax({
					url:"settings?action=deleteDep",
					method:"POST",
					data:{"dep_id":op_id},
					success:function(){
						utils.loadContent("settings?action=settings",$("#content_seg"));
					},
					error:function(){
						
					}
					
					
				});
				
				
				
			}
			
		}).modal("show");
		
	});
	
	
	//===================delete grantor
	$("i[data-type=2]").click(function(){
		//var op_type= $(this).attr("data-type");
		var op_id=$(this).attr("data-id");
		$("#delete_grantor_modal").modal({
			closable:false,
			onDeny:function(){
				return true;
			},
			onApprove:function(){
				$.ajax({
					url:"settings?action=deleteGrantor",
					method:"POST",
					data:{"grantor_id":op_id},
					success:function(){
						utils.loadContent("settings?action=settings",$("#content_seg"));
					},
					error:function(){
						
					}
					
					
				});
				
				
				
			}
			
		}).modal("show");
		
	});
	

	//==================delete email from email list
	$("i[data-type=3]").click(function(){
		var op_type= $(this).attr("data-type");
		var op_id=$(this).attr("data-id");
		$("#delete_modal").modal({
			closable:false,
			onDeny:function(){
				return true;
			},
			onApprove:function(){
				$.ajax({
					url:"settings?action=deleteEmail",
					method:"POST",
					data:{"op_type":op_type,"op_id":op_id},
					success:function(){
						utils.loadContent("settings?action=settings",$("#content_seg"));
					},
					error:function(){
						
					}
					
					
				});
				
				
				
			}
			
		}).modal("show");
		
	});
	
	//==================delete email from email list
	$("i[data-type=4]").click(function(){
		var op_type= $(this).attr("data-type");
		var op_id=$(this).attr("data-id");
		$("#delete_title_modal").modal({
			closable:false,
			onDeny:function(){
				return true;
			},
			onApprove:function(){
				$.ajax({
					url:"settings?action=deleteTitle",
					method:"POST",
					data:{"title_id":op_id},
					success:function(){
						utils.loadContent("settings?action=settings",$("#content_seg"));
					},
					error:function(){
						
					}
					
					
				});
				
				
				
			}
			
		}).modal("show");
		
	});
	
	
});