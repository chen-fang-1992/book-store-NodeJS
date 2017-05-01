$(document).ready(function() {
	if ($("div.alert span").text() != "") {
		$("div.alert").removeClass("hidden").slideDown();
	}

	$("input:text").keyup(function() {
		if ($("input:text").val() == "" || $("input:password").val() == "") {
			$("button:submit").attr("class", "btn btn-lg btn-warning btn-block");
		} else {
			$("button:submit").attr("class", "btn btn-lg btn-success btn-block");
		}
	});

	$("input:password").keyup(function() {
		if ($("input:text").val() == "" || $("input:password").val() == "") {
			$("button:submit").attr("class", "btn btn-lg btn-warning btn-block");
		} else {
			$("button:submit").attr("class", "btn btn-lg btn-success btn-block");
		}
	});

	$("input:text").click(function() {
		$("div.alert").slideUp();
	});

	$("input:password").click(function() {
		$("div.alert").slideUp();
	});

	$("button:submit").click(function() {
		if ($("input:text").val() == "" || $("input:password").val() == "") {
			$("div.alert span").text("Please enter details");
			$("div.alert").slideDown();
			return false;
		} else {
			$("form").attr("action", "/user");
			$("form").attr("method", "POST");
			$("form").submit();
		}
	});
});