/* Initialize */
var entry = document.getElementById("entry");
var view = document.getElementById("view");

/* Food navigation */
var nav = "<input type=\"text\" class=\"float-left\" id=\"datepicker\">" +
    "<a class=\"button float-right\" href=\"add.html\">Add</a>";

entry.innerHTML = nav;
$("#datepicker").datepicker();
$("#datepicker").datepicker("option", "dateFormat", "dd.mm.yy");
$("#datepicker").datepicker("setDate", new Date());

/* Food list */
function renderEntries(list) {
    var phe = 0;
    var prot = 0;
    var kcal = 0;

    var table = "<table><thead><tr><th>" +
        "Description</th><th>" +
        "Phenyl&shy;alanine</th><th>" +
        "Protein</th><th>" +
        "Energy</th></tr></thead><tbody>";

    var pickeddate = $("#datepicker").datepicker("getDate");

    for (var i = 0; i < list.length; i++) {
        var fooddate = new Date(list[i].date);

        if (fooddate.getDate() == pickeddate.getDate() && fooddate.getMonth() == pickeddate.getMonth() && fooddate.getFullYear() == pickeddate.getFullYear()) {
            table += "<tr><td><a href=\"edit.html?" + list[i].id + "\" class=\"table-link\">" +
                list[i].wg.toFixed(2).replace(/\.?0+$/, "") + "&nbsp;g " +
                list[i].desc + "</a></td><td class=\"nowrap\">" +
                list[i].phe.toFixed(2).replace(/\.?0+$/, "") + " mg</td><td class=\"nowrap\">" +
                list[i].prot.toFixed(2).replace(/\.?0+$/, "") + " g</td><td>" +
                list[i].kcal.toFixed(2).replace(/\.?0+$/, "") + " kcal</td></tr>";

            phe += list[i].phe;
            prot += list[i].prot;
            kcal += list[i].kcal;
        }
    }

    table += "<tr><td>" +
        "Total</td><td class=\"nowrap\">" +
        phe.toFixed(2).replace(/\.?0+$/, "") + " mg</td><td class=\"nowrap\">" +
        prot.toFixed(2).replace(/\.?0+$/, "") + " g</td><td>" +
        kcal.toFixed(2).replace(/\.?0+$/, "") + " kcal</td></tr>";

    if (localStorage.getItem("tolerance") !== null) {
        var tolerance = JSON.parse(localStorage.getItem("tolerance"));
        var phetol = tolerance.phetol - phe;
        var prottol = tolerance.prottol - prot;
        var kcaltol = tolerance.kcaltol - kcal;

        table += "<tr><td>" +
            "Remaining</td><td class=\"nowrap\">" +
            phetol.toFixed(2).replace(/\.?0+$/, "") + " mg</td><td class=\"nowrap\">" +
            prottol.toFixed(2).replace(/\.?0+$/, "") + " g</td><td>" +
            kcaltol.toFixed(2).replace(/\.?0+$/, "") + " kcal</td></tr>";
    }

    table += "</tbody></table>";
    view.innerHTML = table;
}

/* Load data */
function loadData() {
    if (localStorage.getItem("day") !== null) {
        var list = JSON.parse(localStorage.getItem("day"));
        renderEntries(list);
    }
    // else {
    //     var empty = "<table><tbody><tr><td>No food entries.</td></tr></tbody></table>";
    //     view.innerHTML = empty;
    // }
}

/* Initialize data */
loadData();

/* Datepicker */
$("#datepicker").datepicker({
    onSelect: function() {
        $(this).change();
    }
});

$("#datepicker").change(function(){
    loadData();
});
