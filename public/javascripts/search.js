$(document).ready(function() {
	$("button:submit").click(function() {
		var url = "/search/result";
		var btitle = $("input[name='btitle']").val();
		var author = $("input[name='author']").val();
		var type = $("input[name='type']").val();

		if (btitle == "" && author == "" && type == "") {
			alert("Please input content ...");
		} else {
			$("form").attr("action", url);
			$("form").attr("method", "GET");
			$("form").submit();
		}
	});
});