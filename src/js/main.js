/* Dropdown */
var storage = $("#storage");
var dropdown = $("#dropdown");

storage.on("click", function () {
    dropdown.toggleClass("hidden");
});

$(document).on("click", function (e) {
    if (!$(e.target).is(storage) && !$(e.target).is(dropdown)) {
        dropdown.addClass("hidden");
    }
});
