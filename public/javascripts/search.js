$(document).ready(function() {
	$("button:submit").click(function() {
		var url = "/search/result";
		var title = $("input[name='title']").val();
		var author = $("input[name='author']").val();
		var type = $("input[name='type']").val();

		if (title == "" && author == "" && type == "") {
			alert("Please input content ...");
		} else {
			$("form").attr("action", url);
			$("form").attr("method", "GET");
			$("form").submit();
		}
	});
});