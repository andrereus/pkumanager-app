/* Initialize */
var phenylalanine = document.getElementById("phenylalanine");
var protein = document.getElementById("protein");
var energy = document.getElementById("energy");
var save = document.getElementById("save");
var resetfood = document.getElementById("resetfood");
var reset = document.getElementById("reset");

function addListener(element, event, funct) {
    if (element.addEventListener) {
        return element.addEventListener(event, funct);
    } else if (element.attachEvent) {
        return element.attachEvent(event, funct);
    }
}

/* Save tolerance */
var tolerance, need;
addListener(save, "click", tolerance);

function tolerance() {
    need = {
        "phetol": Number(phenylalanine.value),
        "prottol": Number(protein.value),
        "kcaltol": Number(energy.value)
    };

    localStorage.setItem("tolerance", JSON.stringify(need));
    alert("Entries are saved.");
    location.reload();
}

/* Estimate protein */
var estimate;
addListener(phenylalanine, "blur", estimate);
addListener(protein, "blur", estimate);

function estimate() {
    if (phenylalanine.value.length !== 0 && protein.value.length === 0) {
        protein.value = (phenylalanine.value / 50).toFixed(2).replace(/\.?0+$/, "");
    } else if (protein.value.length !== 0 && phenylalanine.value.length === 0) {
        phenylalanine.value = (protein.value * 50).toFixed(2).replace(/\.?0+$/, "");
    }
}

/* Grab tolerance */
if (localStorage.getItem("tolerance") !== null) {
    var tol = JSON.parse(localStorage.getItem("tolerance"));
    phenylalanine.value = tol.phetol.toFixed(2).replace(/\.?0+$/, "");
    protein.value = tol.prottol.toFixed(2).replace(/\.?0+$/, "");
    energy.value = tol.kcaltol.toFixed(2).replace(/\.?0+$/, "");
}

/* Reset food list */
var resetlist, conf;
addListener(resetfood, "click", resetlist);

function resetlist() {
    conf = confirm("Please confirm to reset food list.");
    if (conf === true) {
        localStorage.removeItem("day");
        location.reload();
    }
}

/* Reset app */
var resetapp;
addListener(reset, "click", resetapp);

function resetapp() {
    conf = confirm("Please confirm to reset app.");
    if (conf === true) {
        localStorage.clear();
        location.reload();
    }
}
