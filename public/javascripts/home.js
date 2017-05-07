$(document).ready(function() {
	// change content of dropdown
	$("li a.btn").click(function() {
		$(".placeholder").text($(this).text());
	});

	$("button.btn-success").click(function() {
		var url = "/search/result";
		var key = $(".placeholder").text();
		var content = $("input").val();
		if (content == "") {
			alert("Please input content ...");
		} else {
			url = url + "?key=" + key + "&content=" + content;
			document.location.href = url;
		}
	});

	$("tbody a.btn").click(function() {
		var url = "/search/detail";
		var bid = $(this).parent().siblings("input:hidden").val();
		url = url + "?bid=" + bid;
		document.location.href = url;
	});
});