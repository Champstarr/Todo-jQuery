$(document).ready(function(){
	$('#input').keydown(function(e){
		if(e.which == 13) {
			var value = $(this).val();//accessing a string variable (below)
			$('#to_do_list').append('<li><input type="checkbox">'+value+'</li>'); 
			$(this).val('');
		}
	});



});