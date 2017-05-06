$(document).ready(function() {
	if ($("div.alert span").text() != "") {
		$("div.alert").removeClass("hidden").slideDown();
	}

	$("input[name='username']").keyup(function() {
		if ($("input[name='username']").val() == "" || $("input[name='password']").val() == "" 
			|| $("input[name='passwordAgain']").val() == "" || $("input[name='email']").val() == "") {
			$("button:submit").attr("class", "btn btn-lg btn-warning btn-block");
		} else {
			$("button:submit").attr("class", "btn btn-lg btn-success btn-block");
		}
	});

	$("input[name='password']").keyup(function() {
		if ($("input[name='username']").val() == "" || $("input[name='password']").val() == "" 
			|| $("input[name='passwordAgain']").val() == "" || $("input[name='email']").val() == "") {
			$("button:submit").attr("class", "btn btn-lg btn-warning btn-block");
		} else {
			$("button:submit").attr("class", "btn btn-lg btn-success btn-block");
		}
	});

	$("input[name='passwordAgain']").keyup(function() {
		if ($("input[name='username']").val() == "" || $("input[name='password']").val() == "" 
			|| $("input[name='passwordAgain']").val() == "" || $("input[name='email']").val() == "") {
			$("button:submit").attr("class", "btn btn-lg btn-warning btn-block");
		} else {
			$("button:submit").attr("class", "btn btn-lg btn-success btn-block");
		}
	});

	$("input[name='email']").keyup(function() {
		if ($("input[name='username']").val() == "" || $("input[name='password']").val() == "" 
			|| $("input[name='passwordAgain']").val() == "" || $("input[name='email']").val() == "") {
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

	$("input[name='passwordAgain']").click(function() {
		$("div.alert").slideUp();
	});

	$("input[name='email']").click(function() {
		$("div.alert").slideUp();
	});

	$("button:submit").click(function() {
		if ($("input[name='username']").val() == "" || $("input[name='password']").val() == "" 
			|| $("input[name='passwordAgain']").val() == "" || $("input[name='email']").val() == "") {
			$("div.alert span").text("Please enter details");
			$("div.alert").slideDown();
			return false;
		} else {
			if ($("input[name='password']").val() != $("input[name='passwordAgain']").val()) {
				$("div.alert span").text("Please enter same passwords");
				$("div.alert").slideDown();
				return false;
			} else {
				$("form").attr("action", "/user/register");
				$("form").attr("method", "POST");
				$("form").submit();
			}
		}
	});
});