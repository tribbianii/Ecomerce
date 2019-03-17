//user type drop down
$(".ui.floating.dropdown.icon.button").dropdown();
//=======================================update
$(".ui.mini.blue.button").click(function(){
	var userId=$(this).attr("data-id");
	//var type_id=$(this).attr("type_id");
	//bind add button
		$.ajax({
			url:"user?action=getUpdatemodel",
			data:{user_id:userId},		
			success:function(data){
				//console.log(typeof(data))
				$("#model").children().remove();
				$("#model").append(data);
				$("#model").modal({
				    closable  : false,
				    onDeny    : function(){
				      //window.alert('Wait not yet!');
				      return true;
				    },
				    onApprove : function() {
				    	var isClose=true;
				    	//var errorMessage=""
				    	var formData=utils.validatev3($("#user_form"))
				    	formData.user_id=userId;
				    	console.log(formData);
				    		$.ajax({
				    			url:"user?action=updateUser",
				    			data:formData,
				    			method:"POST",
				    			success:function(data){
				    				utils.loadContent("user?action=userList",$("#content_seg"));
				    				
				    				
				    			},
				    			error:function(){
				    				utils.alert("Add user failed!");
				    			}
				    			
				    		});

				    	return true;
				    }
				  }).modal('show');
			}
			
		 });
	
});





//==================================reset

$(".ui.mini.green.button").click(function(){
	var userId=$(this).attr("data-id");
	$("#reset_modal").modal({
		closeable:false,
		onDeny:function(){
			return true;
		},
		onApprove:function(){
			if($("input[name=new_pwd]").val()===""){
				utils.alert("Please enter new password!");
				return false;
			}
			
			$.ajax({
				url:"user?action=resetPassword",
				method:"POST",
				data:{"userId":userId,"newPassword":$("input[name=new_pwd]").val()},
				success:function(){
					//utils.loadContent("user?action=userList",$("#content_seg"));
				},
				error:function(){
					
				}
				
			});
			return true;
		}
		
		
	}).modal("show");
	
});







//====================================delete user
$(".ui.mini.red.button").click(function(){
	var userId=$(this).attr("data-id");
	$("#delete_modal").modal({
		closeable:false,
		onDeny:function(){
			return true;
		},
		onApprove:function(){
			$.ajax({
				url:"user?action=removeUser",
				method:"POST",
				data:{"userId":userId},
				success:function(){
					utils.loadContent("user?action=userList",$("#content_seg"));
				},
				error:function(){
					
				}
				
			});
			return true;
		}
		
		
	}).modal("show");
});








//=======================================add user function
$("#user_type_menu").children(".item").click(function(){
	var type_id=$(this).attr("type_id");
	//bind add button
		$.ajax({
			url:"user?action=getAddmodel",
			data:{type_id:type_id},		
			success:function(data){
				//console.log(typeof(data))
				$("#model").children().remove();
				$("#model").append(data);
				$("#model").modal({
				    closable  : false,
				    onDeny    : function(){
				      //window.alert('Wait not yet!');
				      return true;
				    },
				    onApprove : function() {
				    	var isClose=true;
				    	//var errorMessage=""
				    	utils.validatev2($("#user_form"),function(form_data){//submit
				    		form_data.type_id=type_id;
				    		$.ajax({
				    			url:"user?action=createUser",
				    			data:form_data,
				    			method:"POST",
				    			success:function(data){
				    				utils.loadContent("user?action=userList",$("#content_seg"));
				    				
				    				
				    			},
				    			error:function(){
				    				utils.alert("Add user failed!");
				    			}
				    			
				    		});
				    		
				    		
				    		
				    		
				    		
				    	},function(){
				    		
				    	});
				    	return true;
				    }
				  }).modal('show');
			}
			
		 });

	
});