var $ = require('jquery');

require("jquery-ui/ui/core");
require("jquery-ui/ui/widget");
require("jquery-ui/ui/mouse");
require("jquery-ui/ui/draggable");

require("./style.css");

$(function() {
	$("#draggable").draggable();
});
