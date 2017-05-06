$(document).ready(function() {
	if ($("div.alert-danger span").text() != "") {
		$("div.alert-danger").removeClass("hidden").slideDown();
	}

	if ($("div.alert-success span").text() != "") {
		$("div.alert-success").removeClass("hidden").slideDown();
	}

	$("input[name='username']").keyup(function() {
		if ($("input[name='username']").val() == "" || $("input[name='password']").val() == "") {
			$("button:submit").attr("class", "btn btn-lg btn-warning btn-block");
		} else {
			$("button:submit").attr("class", "btn btn-lg btn-success btn-block");
		}
	});

	$("input[name='password']").keyup(function() {
		if ($("input[name='username']").val() == "" || $("input[name='password']").val() == "") {
			$("button:submit").attr("class", "btn btn-lg btn-warning btn-block");
		} else {
			$("button:submit").attr("class", "btn btn-lg btn-success btn-block");
		}
	});

	$("input[name='username']").click(function() {
		$("div.alert").slideUp();
	});

	$("input[name='password']").click(function() {
		$("div.alert").slideUp();
	});

	$("button:submit").click(function() {
		if ($("input[name='username']").val() == "" || $("input[name='password']").val() == "") {
			$("div.alert-danger span").text("Please enter details");
			$("div.alert-danger").slideDown();
			return false;
		} else {
			$("form").attr("action", "/user");
			$("form").attr("method", "POST");
			$("form").submit();
		}
	});
});