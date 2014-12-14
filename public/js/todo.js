$(document).ready(function(){
	//auto-load the save file
	$.get("/item", function(data){
		for (var i = 0; i < data.length; i++) {
			// var new_item = $("<li></li>");
			// new_item.addClass("li_item");
			var new_checkbox = $("<input type='checkbox'>");
			var list_items = $('<li>', {
				class: "li_item",
				"data-object-id": data[i]._id
			});
			var list_delete = $('<button>', {
				text: "[delete]",
				click: function (e){
					var button = $(e.currentTarget);
					var object_id = button.closest("li").data ("object-id");

					$.ajax('/items/' + object_id, {
						type: "DELETE",
						success: function (data) {
							console.log('data',data);
							button.closest("li").remove();
						}
					});
				}
			});

			if(data[i].completed){
				new_checkbox.prop("checked", data[i].completed);
			}
			list_items.append(list_delete);
			list_items.append(new_checkbox);
			list_items.append("<span>" + data[i].title + "</span>");
			$("ul#to_do_list").append(list_items);
		}
	}); //$.get()
	
	$('#input').keydown(function(e){
		if(e.which == 13) {
			var value = $(this).val();//accessing a string variable (below)
			$('#to_do_list').append('<li class="li_item"><input type="checkbox" class="checkbox"><span>'+value+'</span></li>'); 
			var post_data = {
    			new_item : {
        	title : $("#input").val(),
        	checked : false
    		}
			}
			$(this).val('');

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