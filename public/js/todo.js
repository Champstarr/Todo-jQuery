$(document).ready(function(){
	//auto-load the save file
	$.get("/item", function(data){
		var list_items = data;
		for (var i = 0; i < list_items.length; i++) {
			var new_item = $("<li></li>");
			new_item.addClass("li_item");
			var new_checkbox = $("<input type='checkbox'>");
			new_item.append(new_checkbox);
			new_item.append("<span>"+list_items[i].title+"</span>");
			$("ul#to_do_list").append(new_item);
		}
	});
	
	$('#input').keydown(function(e){
		if(e.which == 13) {
			var value = $(this).val();//accessing a string variable (below)
			$('#to_do_list').append('<li class="li_item"><input type="checkbox" class="checkbox"><span>'+value+'</span></li>'); 
			$(this).val('');
			var post_data = {
    		new_item : {
        title : "my task",
        checked : false
    }
}

$.post('/item', post_data) 
		}

	});
	$('body').on("click", ".checkbox", function(e){
		var status = this.checked 
		console.log(status);
	})

	$('#to_do_list').on("change", ".to_do_list [type = checkbox]", function() {
		var listItem = $(this).parent();

		if (this.checked){
			listItem.addClass("to_do_list");
		}
		else {
			if (listItem.hasClass("to_do_list")){
				listItem.removeClass("to_do_list");
			}
		}

	});

});