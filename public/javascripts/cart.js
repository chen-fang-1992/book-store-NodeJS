$(document).ready(function() {
	$("input.number").click(function() {
		$(this).parent().siblings("td").children("button.btn-danger").hide(500);
		$(this).parent().siblings("td").children("button.btn-success").show(1000);
		setTimeout(function () {
			$("button.btn-success").hide(500);
			$("button.btn-danger").show(1000);
		}, 5000);
	});

	$("button.btn-danger").click(function() {
		var url = "/order/remove";
		var bid = $(this).parent().siblings("input:hidden").val();
		$.StandardPost(url, {
			bid: bid
		});
	});

	$("button.btn-success").click(function() {
		var url = "/order/update";
		var bid = $(this).parent().siblings("input:hidden").val();
		var number = $("input.number").val();
		$.StandardPost(url, {
			bid: bid,
			number: number
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