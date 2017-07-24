/* Dropdown */
$("#storage").on("click", function(){
    $("#dropdown").toggleClass("hidden");
});

/* Redirect */
var conf = confirm("Sorry, the new version is currently not working. I recommend using the old version. Use old version?");
if (conf == true) {
    window.location.assign("old/index.html");
}
