
$("#myModal").modal({
  show: false
});

$("#save-button").click(function() {
  alert("Saved");
  $("#myModal").modal("hide");
});
