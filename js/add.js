/* Initialize */
var description = document.getElementById("name");
var weight = document.getElementById("weight");
var phenylalanine = document.getElementById("phenylalanine");
var protein = document.getElementById("protein");
var energy = document.getElementById("energy");
var add = document.getElementById("add");
var calculate = document.getElementById("calculate");

function addListener(element, event, funct) {
    if (element.addEventListener) {
        return element.addEventListener(event, funct);
    } else if (element.attachEvent) {
        return element.attachEvent(event, funct);
    }
}

function addParameter(element, event, funct, p1, p2) {
    if (element.addEventListener) {
        return element.addEventListener(event, function () { funct(p1, p2); });
    } else if (element.attachEvent) {
        return element.attachEvent(event, function () { funct(p1, p2); });
    }
}

/* Save */
var save;
addListener(add, "click", save);

function save() {
    var day, id;
    var stamp = new Date();

    if (localStorage.getItem("day") !== null) {
        day = JSON.parse(localStorage.getItem("day"));
        id = day[day.length - 1].id + 1;
    } else {
        day = [];
        id = 1;
    }

    var food = {
        "id": id,
        "date": stamp.getTime(),
        "desc": description.value,
        "wg": Number(weight.value),
        "phe": Number(phenylalanine.value),
        "prot": Number(protein.value),
        "kcal": Number(energy.value)
    };

    day.push(food);
    localStorage.setItem("day", JSON.stringify(day));
    window.location.assign("index.html");
}

/* Calculate */
var check, calc;
addListener(calculate, "click", check);
addParameter(weight, "keyup", calc, weight, "weight");
addParameter(phenylalanine, "keyup", calc, phenylalanine, "phenylalanine");
addParameter(protein, "keyup", calc, protein, "protein");
addParameter(energy, "keyup", calc, energy, "energy");

function check() {
    if (calculate.checked) {
        localStorage.setItem("weight", weight.value);
        localStorage.setItem("phenylalanine", phenylalanine.value);
        localStorage.setItem("protein", protein.value);
        localStorage.setItem("energy", energy.value);
    }
}

function calc(original, saved) {
    if (calculate.checked && original.value.length !== 0) {
        weight.value = (original.value * localStorage.getItem("weight") / localStorage.getItem(saved)).toFixed(2).replace(/\.?0+$/, "");
        phenylalanine.value = (original.value * localStorage.getItem("phenylalanine") / localStorage.getItem(saved)).toFixed(2).replace(/\.?0+$/, "");
        protein.value = (original.value * localStorage.getItem("protein") / localStorage.getItem(saved)).toFixed(2).replace(/\.?0+$/, "");
        energy.value = (original.value * localStorage.getItem("energy") / localStorage.getItem(saved)).toFixed(2).replace(/\.?0+$/, "");
    }
}

/* Estimate */
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

/* Grab */
var searchId = decodeURI(location.search.replace("?", ""));
var xmlhttp = new XMLHttpRequest();
var grab;

xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        var searchFood = JSON.parse(xmlhttp.responseText);
        grab(searchFood);
    }
};
if (isNaN(searchId)) {
    xmlhttp.open("GET", "data/usda.json", true);
} else {
    xmlhttp.open("GET", "data/nwr.json", true);
}
xmlhttp.send();

function grab(list) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].ndbno == searchId) {
            description.value = list[i].desc;
            phenylalanine.value = (list[i].phe*1000).toFixed(2).replace(/\.?0+$/, "");
            protein.value = list[i].prot.toFixed(2).replace(/\.?0+$/, "");
            energy.value = list[i].kcal.toFixed(2).replace(/\.?0+$/, "");
        }
    }
}
