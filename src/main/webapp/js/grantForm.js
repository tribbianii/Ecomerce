$(function(){
	  $('.blue.circular.bell.link.icon')
	  .popup({
		//title   : 'Popup Title',  
	    popup : $('.ui.custom.popup.top'),
	    on    : 'click'
	  });
	  //=======================================remove progress report deadlines
	  function bindRemovePrd(){
		  $("i[name=remove_prd]").click(function(){
			  console.log($(this))
			  if($("div[name=prd_field_list]").children("div").length==0){
				  return;
			  }
			  $(this).parent().parent("div .field").remove();
		  });
	  }
	  bindRemovePrd();
	  //====================================add progress report deadlines
	  $("#add_progress_report_deadline").click(function(){
		  var list=$("div[name=prd_field_list]");
		  if(list.children("div").length==4){//4 max
			  return;
		  }
		  var child=list.children("div:first").clone();
		  var oldName=child.find("input").attr("name");
		  var newName=oldName.substr(0,oldName.length-1)+""+list.children("div").length;
		  child.find("input").attr("name",newName);
		  list.append(child);
		  bindRemovePrd()
	  });

	  
	  

	  
	  
	  
	  
	  
	  //bind remove application due date button
	  function removeAppDueDate(){
		  $("i[name=remove_due_date_rem]").click(function(){
			  //min 1
			  if($("#app_due_rem_div").children(".ui .icon .input").length===1){
				  return;
			  }
			  
			  $(this).parent(".ui.icon.input").remove();
		  });
	  }
	  removeAppDueDate();
	  
	  
	  
	  
	  //bind remove final report deadline reminders;
	  function removeFinalReRem(){
		  $("i[name=remove_final_rep_dead_rem]").click(function(){
			  //min 1
			  if($("#final_rep_dead_rem_div").children(".ui .icon .input").length===1){
				  return;
			  }
			  
			  $(this).parent(".ui.icon.input").remove();
		  });
	  }
	  removeFinalReRem();
	  
	  
	  
	  //====================================bind add application due date reminders
	  $("#add_due_rem").click(function(){
		  //max 3
		  if($("#app_due_rem_div").children(".ui .icon .input").length===3){
			  return;
		  }
		  
		  var child=$("#app_due_rem_div").children(".ui .icon .input:first").clone();
		  child.children("input").val("");
		  child.children("input").attr("name","app_due_date_rem"+($("#app_due_rem_div").children(".ui .icon .input").length));
		  //child.attr("name","hahahahah")
		  //console.log(child);
		  $("#app_due_rem_div").append(child);
		  removeAppDueDate();
		  
	  });
	  
	  //final_rep_dead_rem==============================bind add progress report deadline reminders=========
	  	  $("#add_final_rep_dead_rem").click(function(){
		  //max 3
		  if($("#final_rep_dead_rem_div").children(".ui .icon .input").length===3){
			  return;
		  }
		  
		  var child=$("#final_rep_dead_rem_div").children(".ui .icon .input:first").clone();
		  child.children("input").val("");
		  child.children("input").attr("name","final_rep_dead_rem"+($("#final_rep_dead_rem_div").children(".ui .icon .input").length));
		  //child.attr("name","hahahahah")
		  //console.log(child);
		  $("#final_rep_dead_rem_div").append(child);
		  removeFinalReRem();
		  
	  });

	  
	  
	  
	  
	  
	  
	  
	  function bindRemove(){
		  //remove button
		  $(".circular.ui.icon.negative.button").click(function(){
			  console.log("dsds");
				$(this).parents(".four.fields").remove();
		  });
	  }
	  
	  bindRemove();
	  
	  //plus button
	  $(".circular.ui.icon.positive.button").click(function(){
		  var fieldName=$(this).attr("field-list-name");
		if($("div[name="+fieldName+"]").children().length==5){
			return;
		}

		if($("div[name="+fieldName+"]").children().length==0){
			var dom="<div class='four fields'><div class='field'><label>Website:</label>"+
			"<input type='text' name='url0' ></div><div class='field'><label>Login Name:</label>"+
			"<input type='text' name='login_name0' ></div><div class='field'><label>Password:</label>"+
			"<input type='text' name='password0' ></div><div class='field'><label ></label>"+
		 	"<button class='circular ui icon negative button' field-list-name='lii_field_list' style='margin-top: 7%'>"+
				"<i class='icon  trash'></i></button></div></div>";
			$("div[name="+fieldName+"]").append(dom);
			return;
			
			
		}
		 // var child=new XMLSerializer().serializeToString($("div[name="+fieldName+"]").children(":last")[0]);
		
		  var child_div=$("div[name="+fieldName+"]").children(":first");
		  child_div=child_div.clone();
		  //determine how many inputs div has
		  child_div.find("input").each(function(i){
			  var name=$(this).attr("name");
			  var input_new_name=name.substr(0,name.length-1)+""+$("div[name="+fieldName+"]").children().length;
			  $(this).attr("name",input_new_name);
			  //console.log($(this));
		  });
		  
		  $("div[name="+fieldName+"]").append(child_div);
		  bindRemove();
	  });
	  
	  
  });