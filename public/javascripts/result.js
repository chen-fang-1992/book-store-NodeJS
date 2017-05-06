$(document).ready(function() {
	$("tbody a.btn").click(function() {
		var url = "/search/detail";
		var bid = $(this).parent().siblings("input:hidden").val();
		url = url + "?bid=" + bid;
		document.location.href = url;
	});
});