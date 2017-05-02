$(document).ready(function() {
	$("tbody a.btn").click(function() {
		var url = "/search/detail";
		var id = $(this).parent().siblings("input:hidden").val();
		url = url + "?id=" + id;
		document.location.href = url;
	});
});