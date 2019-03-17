$(function(){
	//init table
	var dataTable=$("#mainTable").DataTable({
		"paging": false,
		 "info": false
	});
	

	
	//change status to active or unactive
	function changeStatus(active,grant_id){
		$.ajax({
			url:"grant?action=active",
			method:"POST",
			data:{active:active,grant_id:grant_id},	
			success:function(data){
				loadContent("grant?action=search");
			}
			
		});
		
		
	}
	

	//==========================check comment
	$("button[name=check_comment]")
	  .popup({
	    //popup : $('.custom.popup'),
	    on    : 'click'
	  });
	
	
	
	
	
	
	
	
	//=====================check login info 
	$("button[name=check_login]").click(function(){
		
		$.ajax({
			url:"grant?action=loginInfo",
			method:"POST",
			data:{grant_id:$(this).attr("data")},	
			success:function(data){
				$('#loginfo_model').children().remove();
				$('#loginfo_model').append(data).modal('show');
			}
			
		 });
		
		
		
	});


	$(".ui.dropdown.label").dropdown();
	

	//set table sticky
	$('.ui.sticky')
	  .sticky({
	    context: '#sticky_content'
	  })
	;
	
	
	
	//=============================================select a row event
//	$("td[name=grant_name]").click(function(){
//		var tr=$(this).parent("tr");
//		tr.toggleClass("selected");
////		if(tr.hasClass("selected")){//selected, click for unselected
////			tr.toggleClass("selected");
////
////		}else{
////			//select
////			
////		}
//		console.log(dataTable.rows('.selected').data());
//		
//		
//	});
	$("td[name=grant_name]").click(function(){
		var tr=$(this).parent("tr");
		tr.toggleClass("selected");
//		if(tr.hasClass("active")){//selected, click for unselected
//			tr.removeClass("active");
//		
//		}else{
//			//select
//			tr.addClass("active");
//		}
	
	
	});
	//============================================edit grant======================================
//	$("#edit").click(function(){
//		var rowData=dataTable.rows(".selected").data()[0][10];
//		
//		var grant_id=$(rowData).attr("data");
//		console.log(grant_id);
//		$.ajax({
//			url:"addGrant",
//			method:"POST",
//			data:{grant_id:grant_id},
//			success:function(data){
//				$("#model").children().remove();
//				$("#model").append(data);
//				$("#model").modal({
//				    closable  : false,
//				    onDeny    : function(){
//				      return true;
//				    },
//				    onApprove : function() {
//				    	
//				    	submitGrant("update");
//				    	return false;
//				    }
//				  }).modal('show');
//			}
//			
//		});
//		
//		
//	});


	
	//===================================add and update grant function==========================================
	function submitGrant(operation){
		//loop all inputs
		var formData={};
		var isValidate=true;
		formData.grant_id=0;
		//get grant id if operation is update
		if(operation==="update"){
			formData.grant_id=$("#submit_grant_segment").attr("grant_id");
		}
		
		
		
		//validate
		$("#submit_grant_segment").find("input").each(function(i){
			if($(this).is("input[type=text]")||$(this).is("input[type=date]")){//text or date
				if($(this).parent("div.field").attr("class")==="required field"
						&&$(this).val()===""){
					$(this).parent("div.field").removeClass("error").addClass("error")
					isValidate=false;
				}
				//console.log($(this).attr("name"));
				formData[$(this).attr("name")]=$(this).val();
			}
			if($(this).is("input[type=checkbox]")){//check box
				formData[$(this).attr("name")]=($(this).attr("checked")==="checked")?1:0;
				
				
			}
			
			
			
			if($(this).is("input[type=hidden]")){//drop down
				var required_field=$(this).parent(".ui.selection.dropdown").parent(".required.field");
				if(required_field.find(".menu.transition.hidden").has(".item.active.selected").length===0){
					required_field.removeClass("error").addClass("error");
					isValidate=false;
				}else{//get value of dropdown
					
					var dropDownValue=required_field.find(".menu.transition.hidden").find(".item.active.selected").attr("data-value");
					formData[$(this).attr("name")]=dropDownValue;
				}
				
				
				
			}
			
		});
		var textArea=$("#submit_grant_segment").find("textarea");
		formData[textArea.attr("name")]=textArea.val();
		
		
		if(!isValidate){
			return false;
		}
		console.log(formData);
		$.ajax({
		    url: 'grant?action='+operation+'Grant',
		    type: 'POST',
		    cache: false,
		    data: formData
		}).done(function(res) {
			
			
		}).fail(function(res) {
			
			
		});
		
		
	}


//==================================================export=========================================
	$("#export").click(function(){
		//get all ids that selected
		var table_data=dataTable.rows(".selected").data();
		var ids=[];
		$.each(table_data,function(k,v){
			console.log($(v))
			var nameDiv=$($(v)[0]);
			var id=nameDiv.attr("data-id");
			ids.push(id);

		});
		//console.log(ids);
		$.ajax({
			url:"export",
			method:"POST",
			data:{"ids":ids.toString()},
			success:function(data){
				$("#model").children().remove();
				$("#model").append(data);
				$("#model").modal({
				    closable  : false,
				    onDeny    : function(){
				      //window.alert('Wait not yet!');
				      return true;
				    },
				    onApprove : function() {//print
				   	 var trs=$("tr[name=print_tr]");
					 $.each($("#print_headers th input"),function(i,e){//loop all input
						 $(e).css({"display":"none"});
						 
						 if($(e).attr("checked")!="checked"){//checked
							 $(e).parent("th").css({"display":"none"});
							 
							 $.each(trs,function(i1,tr){
								 $(tr).children("td:eq("+i+")").css({'display':'none'});
							 });
						 } 
					 }); 
				    	$("#print_table").print({
				        	//globalStyles: true,
				        	//mediaPrint: false,
				        	//stylesheet: null,
				        	//noPrintSelector: ".no-print"
				        	//iframe: true,
//				        	append: null,
//				        	prepend: null,
//				        	manuallyCopyFormValues: true,
//				        	deferred: $.Deferred(),
//				        	timeout: 750,
				        	title: "Grant Report",
//				        	doctype: '<!doctype html>'
					});
				    	//submitGrant("add");
				    	return true;
				    }
				  }).modal('show');
			},
			error:function(){
				
			}
			
		});
	
	});
	
	
	
	
	
	
	
});