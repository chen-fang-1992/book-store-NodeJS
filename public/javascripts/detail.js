$(document).ready(function() {
	if ($("div.alert-success span").text() != "") {
		$("div.alert-success").removeClass("hidden").slideDown();
	}

	$("button.btn-success").click(function() {
		var url = "/order/add";
		var bid = $(this).parent().siblings("input:hidden").val();
		$.StandardPost(url, {
			bid: bid
		});
	});
});

$.extend({
	StandardPost: function(url, args) {
		var form = $("<form method='POST'></form>");
		var input;
		form.attr("action", url);
		$.each(args, function(key, value) {
			input = $("<input type='hidden'>");
			input.attr({
				"name": key
			});
			input.val(value);
			form.append(input);
		});
		form.appendTo(document.body);
		form.submit();
		document.body.removeChild(form[0]);
	}
});