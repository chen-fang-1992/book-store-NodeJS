$(document).ready(function() {
	if ($("div.alert-danger span").text() != "") {
		$("div.alert-danger").removeClass("hidden").slideDown();
	}

	$("li a.btn-link").click(function() {
		$(".placeholder").text($(this).text());
	});

	$("button.btn-success").click(function() {
		var url = "/user/record";
		var key = $(".placeholder").text();
		var content = $("input").val();
		if (content == "") {
			alert("Please input content ...");
		} else {
			url = url + "?key=" + key + "&content=" + content;
			document.location.href = url;
		}
	});

	$("li.previous").click(function() {
		var url = "/user/record";
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
		var url = "/user/record";
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