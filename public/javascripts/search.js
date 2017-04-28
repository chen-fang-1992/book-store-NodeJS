function dropDown(element) {
	this.dropdown = element;
	this.placeholder = this.dropdown.find(".placeholder");
	this.options = this.dropdown.find("ul.dropdown-menu > li");
	this.value = "0";
	this.initEvents();
}

dropDown.prototype = {
	initEvents: function() {
		var obj = this;
		obj.options.on("click", function() {
			var opt = $(this);
			obj.text = opt.find("a").text();
			obj.value = opt.attr("value");
			obj.placeholder.text(obj.text);
		});
	},
	getText: function() {
		return this.text;
	},
	getValue: function() {
		return this.value;
	}
};

$(document).ready(function() {
	var dropdown = new dropDown($("#key"));

	$("#submit").click(function() {
		var url = "/result";
		var key = dropdown.getValue();
		var content = $("#content").val();
		if (content == "") {
			alert("Please input content...");
		} else {
			url = url + "?key=" + key + "&content=" + content;
			document.location.href = url;
		}
	});
});