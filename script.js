"use strict";
const main = document.querySelector(".main");
const options = document.querySelectorAll(".option");
const aside = document.querySelector(".aside");

// buttons
const duplicates = document.querySelector(".duplicates");
const sortLargeBtn = document.querySelector(".sort-large");
const oddBtn = document.querySelector(".odd");
const greaterBtn = document.querySelector(".greater-than");
const confirmBtn = document.querySelector(".confirm");
const resetBtn = document.querySelector(".reset");

// test data
const testData = [
  2, 3, 4, 2, 4, 65, 543487656789876, 987678987678987, 898767898763345, 665,
  332, 54, -99, -665, -87, 6787, 98789, 678, 8765, 45, 34567, 4567, 45678,
  45678, 567, 66, 55, 54, 3445, 5566, 7665,
];

let activeArrays = [];
let filteredData = [];

// Update DOM
updateDOM(testData);
function updateDOM(data) {
  main.innerHTML = "<h2>Numbers</h2>";
  data?.forEach((item) => {
    const element = document.createElement("div");
    element.innerHTML = `<p>${item}</p>`;
    main.appendChild(element);
  });
}

// reset UI
resetBtn.addEventListener("click", function () {
  updateUI();
  updateDOM(testData);
  filteredData = [];
});

// update UI function
function updateUI() {
  greaterBtn.classList = "greater-than option";
  oddBtn.classList = "odd option";
  sortLargeBtn.classList = "sort-large option";
  duplicates.classList = "duplicates option";
  confirmBtn.disabled = false;
}

// if no number left function
function noNumberLeft() {
  if (filteredData.length === 0) {
    filteredData = ["no number left (please reset)"];
    confirmBtn.disabled = true;
  }
}

// update selected conditions
function updateSelectedConditions() {
  const selectedBtns = document.querySelectorAll(".option.active");
  const btnsArr = Array.from(selectedBtns);

  activeArrays = btnsArr.map((item) => {
    return item.className.split(" ")[0];
  });
}

// toogle active class in selected btns
aside.addEventListener("click", function (e) {
  if (e.target.classList.contains("option")) {
    e.target.classList.toggle("active");
    updateSelectedConditions();
  }
});

// when confirm button is clicked
confirmBtn.addEventListener("click", function () {
  // Delete Duplicates
  if (duplicates.classList.contains("active")) {
    if (filteredData.length > 0) {
      filteredData = [...new Set(filteredData)];
      noNumberLeft();
    } else {
      filteredData = [...new Set(testData)];
      noNumberLeft();
    }
  }
  // Sort
  if (sortLargeBtn.classList.contains("active")) {
    if (filteredData.length > 0) {
      filteredData.sort((a, b) => b - a);
    } else {
      const sorted = [...testData];
      filteredData = sorted.sort((a, b) => b - a);
    }
  }
  //Delete Even Numbers
  if (oddBtn.classList.contains("active")) {
    if (filteredData.length > 0) {
      filteredData = filteredData.filter((num) => num % 2 !== 0);
      noNumberLeft();
    } else {
      filteredData = testData.filter((num) => num % 2 !== 0);
      noNumberLeft();
    }
  }
  // Delete numbers < 100
  if (greaterBtn.classList.contains("active")) {
    if (filteredData.length > 0) {
      filteredData = filteredData.filter((num) => num > 100);
      noNumberLeft();
    } else {
      filteredData = testData.filter((num) => num > 100);
      noNumberLeft();
    }
  }

  if (filteredData.length > 0) {
    updateDOM(filteredData);
  }
  updateUI();
});
