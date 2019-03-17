  $(function(){
	  $('.ui.accordion').accordion(); 
	  $(".ui.selection.dropdown").dropdown();
	  //==============================reapply
	  $(".ui.mini.green.button").click(function(){
		  var grant_id=$(this).attr("data-id");
		  $("#reapply_modal").modal({
			  closeable:false,
			  onApprove:function(){
				  if($("input[name=app_due_date]").val()===""){
					  utils.alert("Please enter Application Due Date!");
					  return false;
				  }
				  
				  $.ajax({
					  url:"grant?action=reapply",
					  method:"POST",
					  data:{"grant_id":grant_id,"app_due_date":$("input[name=app_due_date]").val()},
					  success:function(){
						  utils.loadContent("nonAwardedGrants?mode=1",$(".ui.stacked.blue.segment"));
						  
						  
					  },
					  error:function(){
						  
					  }
					  
				  });
				  
				  
				  return true;
				  
			  },
			  onDeny:function(){
				return true;  
			  }
			  
			  
		  }).modal("show");
		  
		  
	  });
	  
	  
	  
	  
  });