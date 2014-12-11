$(document).ready(function(){
	$('#input').keydown(function(e){
		if(e.which == 13) {
			var value = $(this).val();//accessing a string variable (below)
			$('#to_do_list').append('<li><input type="checkbox" class="checkbox">'+value+'</li>'); 
			$(this).val('');
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