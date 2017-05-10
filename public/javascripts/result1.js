$(document).ready(function() {
	$("tbody a.btn").click(function() {
		var url = "/search/detail";
		var bid = $(this).parent().siblings("input:hidden").val();
		url = url + "?bid=" + bid;
		document.location.href = url;
	});

	$("li.previous").click(function() {
		var url = "/search/result";
		var key = $("#key").val();
		var content = $("#content").val();
		if (Number($("#page").val()) <= 1) {
			var page = 1;
		} else {
			var page = Number($("#page").val()) - 1;
		}
		url = url + "?key=" + key + "&content=" + content + "&page=" + page;
		document.location.href = url;
	});

	$("li.next").click(function() {
		var url = "/search/result";
		var key = $("#key").val();
		var content = $("#content").val();
		if (Number($("#page").val()) >= Number($("#pages").val())) {
			var page = Number($("#pages").val());
		} else {
			var page = Number($("#page").val()) + 1;
		}
		url = url + "?key=" + key + "&content=" + content + "&page=" + page;
		document.location.href = url;
	});
});