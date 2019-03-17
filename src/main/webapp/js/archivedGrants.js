 $(function(){
	  $('.ui.accordion').accordion(); 
	  $(".ui.selection.dropdown").dropdown();
	  
	  //=================================searching
		$("#searchGrant").click(function(){
			$(this).addClass("disabled").addClass("loading");
			var searchCond=utils.getSearchCond($("#searchDiv"));
			searchCond.status=4;
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
	  
	  
	  
	  
	  
	  
	  
	  //============================update awarded grant========================================
	  $(".ui.blue.mini.button").click(function(){
			$.ajax({
				  	url:"grantForm?type=3",//3 is view 
				  			
					method:"POST",
					 data:{"grant_id":$(this).attr("data-id")},
					 success:function(data){
							$("#model").children().remove();
							$("#model").append(data);
							$("#model").modal({
								 	closable  : true,
								    onVisible:function(){
								    	$(".ui.multiple.selection.dropdown").dropdown('restore defaults');
								    	$(".ui.selection.dropdown").dropdown();
								    },
								    onDeny: function(){
									      return true;
									    },
									onApprove : function($element) {
										return false;
									    }
								
								
								
							}).modal("show");
					 },
					 error:function(){
						 
					 }
				
			}); 
	  });
	  
	  
  });
  
  