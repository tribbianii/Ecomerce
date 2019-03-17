 $(function(){
	 //====================blind edit button
	 $(".ui.blue.icon.button").click(function(){
		 var file_id=$(this).attr("data-id");
		 $.ajax({
			 url:"singleUpload?type=1",//1 is edit success story
			 method:"POST",
			 data:{"file_id":file_id},
			 success:function(data){
					$("#model").children().remove();
					$("#model").append(data);
					$("#model").modal({
					    closable  : false,
					    onVisible:function(){
					    	$(".ui.multiple.selection.dropdown").dropdown('restore defaults');
					    },
					    onDeny    : function(){
						      //window.alert('Wait not yet!');
						      return true;
						    },
						    onApprove : function($element) {//edit
						    	//console.log($element.attr("data-id"))
						    	var file={'file_id':$element.attr("data-id")};
						    	
						    	//get data
//						    	if($("input[name=grants]").val()===""){
//						    		//alert();
//						    		return false;
//						    	}
						    	file.grants=$("input[name=grants]").val();
						    	
						    	if($("input[name=departments]").val()===""){
						    		return false;
						    	}
						    	file.deps=$("input[name=departments]").val();
						    	
//						    	if($("input[name=date]").length===0){
//						    		return;
//						    	}
						    	
//						    	file.dates=[];
//						    	$.each($("input[name=date]"),function(i,v){
//						    		if($(v).val()!=""){
//						    			file.dates.push($(v).val());
//						    		}
//						    	});
						    	//update
								console.log(file);
						    	$.ajax({
						    		url:"file?action=updateSuccessStory",
						    		method:"POST",
						    		data:file,
						    		success:function(){
						    			utils.loadContent("successStories",$(".ui.stacked.blue.segment"));
						    		},
						    		error:function(){
						    			
						    		}
						    		
						    	});
						    	
						    	
						    	
						    }
					}).modal("show");
				 
				 
				 
			 },
			 error:function(){
				 
			 }
			 
		 });
		 
	 });
//=====================================add success story
		$(".ui.small.positive.labeled.icon.button").click(function(){
			$.ajax({
				url:"singleUpload?type=0",//0 is add success story
				method:"POST",
				success:function(data){
					var formData = new FormData();
					$("#model").children().remove();
					$("#model").append(data);
					$("#model").modal({
					    closable  : false,
					    onVisible:function(){
					    	$(".ui.multiple.selection.dropdown").dropdown();
				  			//upload
				  			
				  			$("#upload").click(function(){
				  				$("input[type=file]").click();
				  			})
				  			//file change event
				  			$("input[type=file]").change(function(e){
				  				//console.log($('#file')[0].files[0]);
				  				$("input[name=file_name]").val($('#file')[0].files[0].name);
				  				
				  				formData.append("file", $('#file')[0].files[0]);
				  			});
					    },
					    onDeny    : function(){
					      //window.alert('Wait not yet!');
					      return true;
					    },
					    onApprove : function() {//submit
					    	if($("input[name=file_name]").val()===""){
					    		alert("Please select the file you want to upload!");
					    		return false;
					    	}
					    	
					    	formData.append("grants",$("input[name=grants]").val())
					    	
					    	//file.grants=$("input[name=grants]").val();
					    	
					    	if($("input[name=departments]").val()===""){
					    		utils.alert("Please select at least one department!");
					    		return false;
					    	}
					    	formData.append("deps",$("input[name=departments]").val());
					    	//file.deps=$("input[name=departments]").val();
					    	//get dates
//					    	var dates=[];
//					    	$.each($("input[name=date]"),function(i,v){
//					    		if($(v).val()!=""){
//					    			dates.push($(v).val());
//					    		}
//					    	});
//					    	formData.append("dates",dates);
					    	
							//console.log(formData);
			  				$.ajax({
			  				    url: 'file?action=uploadSuccessStory',
			  				    type: 'POST',
			  				    cache: false,
			  				    data: formData,
			  				    processData: false,
			  				    contentType: false
			  				}).done(function(res) {
			  					utils.loadContent("successStories",$(".ui.stacked.blue.segment"));
			  					
			  				}).fail(function(res) {
			  					utils.loadContent("successStories",$(".ui.stacked.blue.segment"));
			  				});
					    	
					    	
					    	
					    	return true;
					    }
					  }).modal('show');
					
					
					
				},
				error:function(){
					
				}
				
			});
		});
		//======================================remove success stories
		$(".ui.red.icon.button").click(function(){
			var fileId=$(this).attr("data-id");
			$("#delete_success_reminder").modal({
				closeable:false,
				onDeny:function(){
					return true;
				},
				onApprove:function(){
					$.ajax({
						url:"file?action=delSuccessStory",
						method:"POST",
						data:{"fileId":fileId},
						success:function(){
							utils.loadContent("successStories",$(".ui.stacked.blue.segment"));
						},
						error:function(){
							
						}
						
						
						
					});
					return true;
				}
				
				
			}).modal("show");
			
			
			
		});
		
  });