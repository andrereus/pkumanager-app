/* Reset food list */
var conf, dropId;

document.getElementById("view").addEventListener("click", function(event) {
    if (event.target && event.target.matches("#resetfood")) {
        conf = confirm("Please confirm to reset food entries.");

        if (conf === true) {
            var pickeddate = $("#datepicker").datepicker("getDate");

            for (var i = 0; i < list.length; i++) {
                var fooddate = new Date(list[i].date);

                if (fooddate.getDate() == pickeddate.getDate()) {
                    list.splice(i, 1);
                    localStorage.setItem("day", JSON.stringify(list));
                }
            }

            if (list.length < 1) {
                localStorage.removeItem("day");
            }

            location.reload();
        }
    }
});

/* Reset food entries */
var resetentries, conf;
addListener(resetfood, "click", resetentries);

function resetentries() {
    conf = confirm("Please confirm to reset food entries.");
    if (conf === true) {
        localStorage.removeItem("day");
        window.location.assign("index.html");
    }
}
