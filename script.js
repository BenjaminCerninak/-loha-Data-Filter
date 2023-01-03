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

let activeArrays = [];
let filteredData = [];
let testData;

// function to create an array for test data
const randomArr = (length, max) =>
  Array(length)
    .fill()
    .map(() => Math.floor(Math.random() * max));

// update UI
updateUI();

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
  testData = [...randomArr(80, -1000), ...randomArr(80, 1000)];
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
