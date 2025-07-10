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
    return element.addEventListener(event, function () {
      funct(p1, p2);
    });
  } else if (element.attachEvent) {
    return element.attachEvent(event, function () {
      funct(p1, p2);
    });
  }
}

/* Get */
var searchId = location.search.replace("?", "");

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
    id: id,
    date: stamp.getTime(),
    desc: description.value,
    wg: Number(weight.value),
    phe: Number(phenylalanine.value),
    prot: Number(protein.value),
    kcal: Number(energy.value)
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
    weight.value = ((original.value * localStorage.getItem("weight")) / localStorage.getItem(saved))
      .toFixed(2)
      .replace(/\.?0+$/, "");
    phenylalanine.value = (
      (original.value * localStorage.getItem("phenylalanine")) /
      localStorage.getItem(saved)
    )
      .toFixed(2)
      .replace(/\.?0+$/, "");
    protein.value = (
      (original.value * localStorage.getItem("protein")) /
      localStorage.getItem(saved)
    )
      .toFixed(2)
      .replace(/\.?0+$/, "");
    energy.value = ((original.value * localStorage.getItem("energy")) / localStorage.getItem(saved))
      .toFixed(2)
      .replace(/\.?0+$/, "");
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
var list = JSON.parse(localStorage.getItem("day"));

for (var i = 0; i < list.length; i++) {
  if (list[i].id == searchId) {
    description.value = list[i].desc;
    weight.value = list[i].wg.toFixed(2).replace(/\.?0+$/, "");
    phenylalanine.value = list[i].phe.toFixed(2).replace(/\.?0+$/, "");
    protein.value = list[i].prot.toFixed(2).replace(/\.?0+$/, "");
    energy.value = list[i].kcal.toFixed(2).replace(/\.?0+$/, "");
  }
}

/* Hide */
if (localStorage.getItem("hide") === "true") {
  $(".energy").addClass("visuallyhidden");
}
