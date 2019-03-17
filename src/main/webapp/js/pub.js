(function(window){
	var appPath=window.location.pathname.substr(0, window.location.pathname.lastIndexOf('/'));
	window.utils={};
	window.utils.appPath=appPath;
	
	//get search condition values within form area
	window.utils.getSearchCond=function($div){
		var searchCondition={};
		$.each($div.find("input"),function(i,v){
			searchCondition[$(v).attr("name")]=$(v).val();
		})
		return searchCondition;
		
	}
	
	
	window.utils.alert=function(msg){
		
//		$("#notify_msg").html(msg);
//		$("#notify_modal").modal("show");
		alert(msg);
	};
	
	//validate reminders
	window.utils.valReminders=function(reminders_div){
		$reminders_div=$(reminders_div);
		var reminders=[];
		$.each($reminders_div.find("input[type=date]"),function(i,k){
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
		return reminders;
		
	}
	
	
	
	
	
	
	
	
	
	
	window.utils.apiSettings=function(mapping){
		var apiMapping={};
		$.each(mapping,function(k,v){
			//console.log(k+" "+v);
			if(!k.includes(appPath)){
				apiMapping[k]=appPath+v
			}
		});
		console.log(apiMapping);
		//set action url 
		$.fn.api.settings.api=apiMapping;
		
		
	};
	
	$.fn.api.settings.successTest = function(response) {
		  if(response && response.success) {
		    return response.success;
		  }
		  return false;
		};
	//load first level segment
		window.utils.loadContent=function(url,content_seg){
			var content$=$(content_seg);
			//set segment to loading
			content$.removeClass("loading").addClass("loading")
			$.ajax({
			
				url:url,
				success:function(data){
					content$.children().remove();
					content$.append(data);
					content$.removeClass("loading");
					

				},
				error:function(){
					content$.removeClass("loading");
				}
				
			});
		}
	//load second level menue
//		window.utils.loadSecondMenu=function(menu_dom,content_seg){
//			$(menu_dom).
//			
//			
//			
//		}
		
		
	function getData(){
		//get all element marked 'data-name'
		var allEl=$("[data-name]");
		var data={};
		$.each(allEl,function(k,v){
			var el=$(v);
			var key=el.attr("data-name");
			if(el.is("input")){
				data[key]=el.val();
			}
		});
		return data;
		
	}
	
	
	//window.utils.post=function(action,dom,beforesend,success,failure,error)

	//rules
	  var regExp={
		    htmlID  : /^[a-zA-Z][\w:.-]*$/g,
		    bracket : /\[(.*)\]/i,
		    decimal : /^\d+\.?\d*$/,
		    email   : /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,
		    escape  : /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
		    flags   : /^\/(.*)\/(.*)?/,
		    integer : /^\-?\d+$/,
		    number  : /^\-?\d*(\.\d+)?$/,
		    url     : /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/i
		  }
	
	window.utils.rules={
			empty:function(value,a) {
				console.log(value+",")
		      return !(value === undefined || '' === value || $.isArray(value) && value.length === 0);
		    },
		    email: function(value,a){
		    	return regExp.email.test(value);
		    },

		    	// value is most likely url
		    url: function(value,a) {
		    	return regExp.url.test(value);
		    },
		    minLength: function(value, requiredLength) {
		    	console.log(value+","+requiredLength)
		        return (value !== undefined)
		          ? (value.length >= requiredLength)
		          : false
		        ;
		      },
		      // is less than length
		      maxLength: function(value, maxLength) {
		        return (value !== undefined)
		          ? (value.length <= maxLength): false;
		      }
		
		}
	  
	  //validate specific field
	  //$("")
	  
	  
	  
	  
	function excuteRule(type,arg1,arg2){
		  var result=false;
		  $.each(window.utils.rules,function(k,v){
			  if(k===type){
				  result=v(arg1,arg2);
			  }
		  });
		  return result;
	  }
	//test rules

	//change 
//	function validate_template(flag,prompt,parent_field){
//		console.log(flag+"*****"+prompt)
//		if(flag){//validated
//			parent_field.removeClass("error");
//			var lis=$(".ui.error.message").children("li");
//			
//				$.each(lis,function(k,v){
//					if($(this).html()===prompt){
//						$(this).remove();
//					}
//				});
//			
//		}else{//non validated
//			parent_field.removeClass("error").addClass("error");
//			var lis=$(".ui.error.message").children("li");
//			
//			var ul=$(".ui.error.message").children("ul.list");
//			//add <ul class=list></ul>
//			if(ul.length===0){
//				$(".ui.error.message").append("<ul class=list></ul>")
//			}
//			//if error message already existing
//			$.each(lis,function(k,v){
//				if($(this).html()===prompt){
//					$(this).remove();
//				}
//			});
//			$("ul.list").append("<li>"+prompt+"</li>")
//			
//		}
//		
//	}
	
	window.utils.excuteValidate=function(k,v,element){
		//var element=$("[data-name="+k+"]");
		var parentField=element.parents(".field");
		console.log(element)
		//valdate this input
		var val_rules=v.rules;
		//loop rules
		//var isValidated=true;
		var errorArr=[];
		var rules_temp=[];
		//==========================loop rules
		for(var i=0;i<val_rules.length;i++){
//			rules:[
//				{type:'email',prompt:"Please"},
//				{type:'empty'}
//			]
			rules_temp.push(val_rules[i].prompt);
			var type=val_rules[i].type;
			var arg1=element.val();
			var arg2="";
			//determine # of arg 
			
			if(type.includes('[')&&type.includes(']')){//2 arguments case
				arg2=type.substring(type.indexOf('[')+1,type.indexOf(']'));
				type=type.substring(0,type.indexOf('['));
				
				//console.log(type+","+arg2)
				
			}
			if(!excuteRule(type,arg1,arg2)){//invalidated
				//isValidated=false;
				errorArr.push(val_rules[i].prompt);
			}
		}
		//==============================validated
		if(errorArr.length===0){
			
			$.each($(".ui.error.message").children("ul.list").children("li"),function(index,el){
				//console.log(val_rules);
				if(rules_temp.includes($(el).html())){//delete error 
					$(el).remove();
				}
				
				
			});
			//set field to normal
			parentField.removeClass("error");
			//if all li removed
			if($(".ui.error.message").children("ul.list").children("li").length===0){
				
				$(".ui.form").removeClass("error");
			}
			//return;
		}else{
			//===============================invalidated==========================
			if(!parentField.hasClass("error")){
				parentField.addClass("error");
			}
			if(!$(".ui.form").hasClass("error")){//first time adding error
				$(".ui.form").addClass("error");
				//add error
				errorArr.forEach(function(error){
					$(".ui.error.message").children("ul").append("<li>"+error+"</li>");
				});
				
				return;
			}

			//list have error messages already
			$.each($("ul.list").children("li"),function(index,el){
				//console.log(errorArr);
				if((rules_temp.includes($(el).html())&&!errorArr.includes($(el).html()))||
						errorArr.includes($(el).html())){//delete error 
					$(el).remove();
				}
			});
			
			//add error
			errorArr.forEach(function(error){
				
				$(".ui.error.message").children("ul").append("<li>"+error+"</li>");
			});
	}
		//===============================invalidated end======================

	}
	
	
	
	
	
	
	
	
	
	window.utils.validate=function(validation){
		//var isValidated=false;
		
		$.each(validation,function(k,v){
			var element=$("[data-name="+k+"]");
			//console.log(element)
	//===============================blue event=======================================		
			element.blur(function(e){
				utils.excuteValidate(k,v,element)
			});
			//===============================blue event end=======================================	
		});
		
		
	};
	
	
	
	window.utils.post=function(config){

		
		
	  config.dom.api({
		  action:config.action,
		  method : 'POST',
		  
		  beforeSend: function(settings) {	
			 //prepare data
	        settings.data=getData(); 
	        config.dom.addClass("loading disabled");
	        //check form is validated
	        if($(".ui.form").hasClass("error")&&config.isForm){
	        	config.dom.removeClass("loading disabled");
	        	return false;
	        }
	        console.log(settings.data);
	        if(config.beforesend==undefined){
	        	return settings
	        }
	        
	        return config.beforesend(settings);
	      },
	
	      onSuccess: function(response) {
	          // valid response and response.success = true
	    	  console.log('success')
	    	  config.dom.removeClass("loading disabled");
	    	  config.success(response);
	        },
	      onFailure: function(response) {
	          // request failed, or valid response but response.success = false
	    	  console.log("failure");
	    	  config.dom.removeClass("loading disabled");
	    	  config.failure(response);
	        },
	      onError: function(errorMessage) {
	          // invalid response
	    	  console.log("error");
	    	  config.dom.removeClass("loading disabled");
	    	  config.error(errorMessage);
	        },
	      onAbort: function(errorMessage) {
	            // navigated to a new page, CORS issue, or user canceled request
	    	  console.log("onAbort");
	    	  config.dom.removeClass("loading disabled");
	    	  config.error(errorMessage);
	          }
	  
  });
		
		
		
		
	}
	
	//validate v2
	window.utils.validatev3=function(form_dom){
		var formData={};
		var isValidate=true;
		
		$(form_dom).find("input").each(function(i){
			//console.log($(this).val()==="");
			if($(this).is("input[type=text]")||$(this).is("input[type=date]")
					||$(this).is("input[type=password]")){//text or date
				//console.log($(this));
				if($(this).parent("div.field").hasClass("required")){//required field
					if($(this).val()===""){//non validated
						$(this).parent("div.field").removeClass("error").addClass("error");
						isValidate=false;
					}else{//validated
						$(this).parent("div.field").removeClass("error");
						formData[$(this).attr("name")]=$(this).val();
					}
				}else{//optional field
					
					formData[$(this).attr("name")]=$(this).val();
					
				}

			}
			if($(this).is("input[type=checkbox]")){//check box
				formData[$(this).attr("name")]=($(this).attr("checked")==="checked")?1:0;
				
				
			}

			if($(this).is("input[type=hidden]")&&!$(this).parent().hasClass("multiple")){//single drop down
				var required_field=$(this).parent(".ui.selection.dropdown").parent(".required.field");
				if(required_field.find(".menu.transition.hidden").has(".item.active.selected").length===0){//non validated
					required_field.removeClass("error").addClass("error");
					isValidate=false;
				}else{//get value of dropdown
					
					var dropDownValue=required_field.find(".menu.transition.hidden").find(".item.active.selected").attr("data-value");
					required_field.removeClass("error");
					formData[$(this).attr("name")]=dropDownValue;
				}
				
				
				
			}
			
			//mutiply drop down
			if($(this).is("input[type=hidden]")&&$(this).parent().hasClass("multiple")){
				var required_field=$(this).parent(".ui.selection.dropdown").parent(".required.field");
				if($(this).val()===""){//non-val
					required_field.removeClass("error").addClass("error");
					isValidate=false;
				}else{
					required_field.removeClass("error");
					formData[$(this).attr("name")]=$(this).val();
					
				}
				
			}
			
			
		});
		
		//textarea
		$(form_dom).find("textarea").each(function(i){
			if($(this).parent("div.field").hasClass("required")){//required field
				if($(this).val()===""){//non validated
					$(this).parent("div.field").removeClass("error").addClass("error");
					isValidate=false;
				}else{//validated
					$(this).parent("div.field").removeClass("error");
					formData[$(this).attr("name")]=$(this).val();
				}
			}else{//optional field
				
				formData[$(this).attr("name")]=$(this).val();
				
			}
			
		});
		formData.success=isValidate;
		return formData;
		
	}
	
	
	
	
	
	
	//validate v2
	window.utils.validatev2=function(form_dom,success,fail){
		var formData={};
		var isValidate=true;
		
		$(form_dom).find("input").each(function(i){
			//console.log($(this).val()==="");
			if($(this).is("input[type=text]")||$(this).is("input[type=date]")
					||$(this).is("input[type=password]")){//text or date
				//console.log($(this));
				if($(this).parent("div.field").hasClass("required")){//required field
					if($(this).val()===""){//non validated
						$(this).parent("div.field").removeClass("error").addClass("error");
						isValidate=false;
					}else{//validated
						$(this).parent("div.field").removeClass("error");
						formData[$(this).attr("name")]=$(this).val();
					}
				}else{//optional field
					
					formData[$(this).attr("name")]=$(this).val();
					
				}

			}
			if($(this).is("input[type=checkbox]")){//check box
				formData[$(this).attr("name")]=($(this).attr("checked")==="checked")?1:0;
				
				
			}

			if($(this).is("input[type=hidden]")&&!$(this).parent().hasClass("multiple")){//single drop down
				var required_field=$(this).parent(".ui.selection.dropdown").parent(".required.field");
				if(required_field.find(".menu.transition.hidden").has(".item.active.selected").length===0){//non validated
					required_field.removeClass("error").addClass("error");
					isValidate=false;
				}else{//get value of dropdown
					
					var dropDownValue=required_field.find(".menu.transition.hidden").find(".item.active.selected").attr("data-value");
					required_field.removeClass("error");
					formData[$(this).attr("name")]=dropDownValue;
				}
				
				
				
			}
			
			//mutiply drop down
			if($(this).is("input[type=hidden]")&&$(this).parent().hasClass("multiple")){
				var required_field=$(this).parent(".ui.selection.dropdown").parent(".required.field");
				if($(this).val()===""){//non-val
					required_field.removeClass("error").addClass("error");
					isValidate=false;
				}else{
					required_field.removeClass("error");
					formData[$(this).attr("name")]=$(this).val();
					
				}
				
			}
			
			
		});
		
		//textarea
		$(form_dom).find("textarea").each(function(i){
			if($(this).parent("div.field").hasClass("required")){//required field
				if($(this).val()===""){//non validated
					$(this).parent("div.field").removeClass("error").addClass("error");
					isValidate=false;
				}else{//validated
					$(this).parent("div.field").removeClass("error");
					formData[$(this).attr("name")]=$(this).val();
				}
			}else{//optional field
				
				formData[$(this).attr("name")]=$(this).val();
				
			}
			
		});
		
		console.log(formData);
		console.log(isValidate);
		if(isValidate){
			success(formData);
		}else{
			fail();
		}
		
		
		
	}
	
	window.utils.getSelectVal=function(selectName,formData){
		var selects_a=$("select[name="+selectName+"]").parent("div").children("a");
		if(selects_a.length==0){
			alert("Please select "+selectName);
			return false;
		}
		var data_array=[];
		$.each(selects_a,function(i,v){
			data_array.push($(v).attr("data-value"));
		});	
		formData.append(selectName,data_array);
	}
	
	
	
	
	
})(window)