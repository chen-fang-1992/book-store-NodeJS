$(document).ready(function() {
	if ($("div.alert-danger span").text() != "") {
		$("div.alert-danger").removeClass("hidden").slideDown();
	}

	$("li.previous").click(function() {
		var url = "/user";
		if (Number($("#page").val()) <= 1) {
			var page = 1;
		} else {
			var page = Number($("#page").val()) - 1;
		}
		url = url + "?page=" + page;
		document.location.href = url;
	});

	$("li.next").click(function() {
		var url = "/user";
		if (Number($("#page").val()) >= Number($("#pages").val())) {
			var page = Number($("#pages").val());
		} else {
			var page = Number($("#page").val()) + 1;
		}
		url = url + "?page=" + page;
		document.location.href = url;
	});
});