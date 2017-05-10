$(document).ready(function() {
	if ($("div.alert-danger span").text() != "") {
		$("div.alert-danger").removeClass("hidden").slideDown();
	}

	$("li a.btn").click(function() {
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
});