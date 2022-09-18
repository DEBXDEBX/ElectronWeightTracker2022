"use strict";

//Select audio files
const addAudio = document.querySelector("#addAudio");
const addImageAudio = document.querySelector("#addImageAudio");
const clickAudio = document.querySelector("#clickAudio");
const warningEmptyAudio = document.querySelector("#warningEmptyAudio");
const warningSelectAudio = document.querySelector("#warningSelectAudio");
const warningNameTakenAudio = document.querySelector("#warningNameTakenAudio");
const tabAudio = document.querySelector("#tabAudio");
const btnAudio = document.querySelector("#btnAudio");
const cancelAudio = document.querySelector("#cancelAudio");
// D3 variables
let width = 600;
let height = 400;
let barPadding = 10;
let numBars = 12;
let barWidth = width / numBars - barPadding;

let tooltip = d3.select("body").append("div").classed("tooltip", true);
let padding = 30;
// Global variable's
// This is the Main array that holds all the year objects
const arrayOfYearObjs = [];
// create elements object
const el = new Elements();
// create display object
const display = new Display(el, $);

// create year index
let yearIndex = -243;
// create month index
let monthIndex = -243;

// temp hold for array
let settingsArrayContainer;

//The start of program exicution.
window.onload = function () {
  startUp();
};

// startUp
function startUp() {
  //get data from settings obect
  let settingsStorage = new SettingsStorage();
  let settings = settingsStorage.getSettingsFromFile();

  if (settings.type === "weightTracker") {
    // set the holding array
    settingsArrayContainer = settings.filePathArray;
    // loadsettings
    applySettings(settings);
    // update Form
    display.showAutoLoadList(settingsArrayContainer);

    if (el.autoLoadCheckBox.checked) {
      if (settings.filePathArray) {
        sendAutoLoadFilesToNode(settings.filePathArray);
      }
    }
  }
}

function sendAutoLoadFilesToNode(filePaths) {
  window.api.sendFilePathsForAutoload(filePaths);
}
//*************************************************** */
// Helper functions
//*************************************************** */
//*************************************************** */
function removeActiveClass(element) {
  if (element) {
    element.classList.remove("active");
  }
}

function pushFileSettingsContainer(filePath) {
  // check if the fileNamePath already exists if it does alert and return
  // make a variable to return
  let isTaken = false;

  for (const element of settingsArrayContainer) {
    if (element === filePath) {
      isTaken = true;
    }
  }
  if (isTaken) {
    // warningNameTakenAudio.play();
    warningNameTakenAudio.play();
    display.showAlert("That file is already loaded!", "error");
    return;
  }

  // add it too tempHOld
  settingsArrayContainer.push(filePath);
}
function drawD3() {
  el.svgDiv.style.display = "flex";

  el.mainSvg.innerHTML = "";

  d3.select(el.mainSvg)
    .attr("width", width)
    .attr("height", height)
    .selectAll("rect")
    .data(arrayOfYearObjs[yearIndex].arrayOfMonthObjects)
    .enter()
    .append("rect")
    .attr("width", barWidth)
    .attr("height", function (d) {
      return d.weight;
    })
    .attr("y", function (d) {
      return height - d.weight;
    })
    .attr("x", function (d, i) {
      return (barWidth + barPadding) * i;
    })
    .attr("fill", "#0af30a")
    .on("mousemove", function (d) {
      tooltip
        .style("opacity", 1)
        .style("left", d3.event.x - tooltip.node().offsetWidth / 2 + "px")
        .style(
          "top",
          d3.event.y + 25 + "px"
        ).html(`<h5>${arrayOfYearObjs[yearIndex].name}</h5><h5>${d.name}</h5>
               <h5>${d.weight.toFixed(1)} LB</h5>`);
    })
    .on("mouseout", function () {
      tooltip.style("opacity", 0);
    });

  // add title
  d3.select(el.mainSvg)
    .append("text")
    .attr("x", width / 2)
    .attr("y", padding)
    .attr("dy", "1.5em")
    .style("text-anchor", "middle")
    .style("font-size", "1.5rem")
    .style("font-weight", "900")
    .text(arrayOfYearObjs[yearIndex].name);

  // left svg
  if (yearIndex === 0) {
    // do fake stuff
    el.leftSvg.innerHTML = "";
    //fake array
    let fakeArrayOfMonthObjects = [];
    // create the 12 months
    let January = new MonthObject("January", 10);
    fakeArrayOfMonthObjects.push(January);
    let February = new MonthObject("February", 15);
    fakeArrayOfMonthObjects.push(February);
    let March = new MonthObject("March", 20);
    fakeArrayOfMonthObjects.push(March);
    let April = new MonthObject("April", 25);
    fakeArrayOfMonthObjects.push(April);
    let May = new MonthObject("May", 30);
    fakeArrayOfMonthObjects.push(May);
    let June = new MonthObject("June", 35);
    fakeArrayOfMonthObjects.push(June);
    let July = new MonthObject("July", 40);
    fakeArrayOfMonthObjects.push(July);
    let August = new MonthObject("August", 45);
    fakeArrayOfMonthObjects.push(August);
    let September = new MonthObject("September", 50);
    fakeArrayOfMonthObjects.push(September);
    let October = new MonthObject("October", 55);
    fakeArrayOfMonthObjects.push(October);
    let November = new MonthObject("November", 60);
    fakeArrayOfMonthObjects.push(November);
    let December = new MonthObject("December", 65);
    fakeArrayOfMonthObjects.push(December);
    // next part draw fake graph with no real data
    el.leftSvg.innerHTML = "";
    d3.select(el.leftSvg)
      .attr("width", width)
      .attr("height", height)
      .selectAll("rect")
      .data(fakeArrayOfMonthObjects)
      .enter()
      .append("rect")
      .attr("width", barWidth)
      .attr("height", function (d) {
        return d.weight;
      })
      .attr("y", function (d) {
        return height - d.weight;
      })
      .attr("x", function (d, i) {
        return (barWidth + barPadding) * i;
      })
      .attr("fill", "#aba3f2")
      .on("mousemove", function (d) {
        tooltip
          .style("opacity", 1)
          .style("left", d3.event.x - tooltip.node().offsetWidth / 2 + "px")
          .style("top", d3.event.y + 25 + "px").html(`<h5>${d.name}</h5>
                 <h5>${d.weight.toFixed(1)} LB</h5>`);
      })
      .on("mouseout", function () {
        tooltip.style("opacity", 0);
      });
  } else {
    // Draw previous year on the left side
    el.leftSvg.innerHTML = "";
    d3.select(el.leftSvg)
      .attr("width", width)
      .attr("height", height)
      .selectAll("rect")
      .data(arrayOfYearObjs[yearIndex - 1].arrayOfMonthObjects)
      .enter()
      .append("rect")
      .attr("width", barWidth)
      .attr("height", function (d) {
        return d.weight;
      })
      .attr("y", function (d) {
        return height - d.weight;
      })
      .attr("x", function (d, i) {
        return (barWidth + barPadding) * i;
      })
      .attr("fill", "#aba3f2")
      .on("mousemove", function (d) {
        tooltip
          .style("opacity", 1)
          .style("left", d3.event.x - tooltip.node().offsetWidth / 2 + "px")
          .style(
            "top",
            d3.event.y + 25 + "px"
          ).html(`<h5>${arrayOfYearObjs[yearIndex - 1].name}</h5><h5>${d.name}</h5>
                 <h5>${d.weight.toFixed(1)} LB</h5>`);
      })
      .on("mouseout", function () {
        tooltip.style("opacity", 0);
      });

    // add title
    d3.select(el.leftSvg)
      .append("text")
      .attr("x", width / 2)
      .attr("y", padding)
      .attr("dy", "1.5em")
      .style("text-anchor", "middle")
      .style("font-size", "1.5rem")
      .style("font-weight", "900")
      .text(arrayOfYearObjs[yearIndex - 1].name);
  }
} //End function drawD3()

// Sort an array by it's name
function sortArrayByName(array) {
  array.sort(function (a, b) {
    const nameA = a.name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // names must be eimagePathual
    return 0;
  }); //End sort function
}
// get the value of the selected radio button
function getRadioValue(form, name) {
  let val;
  // get list of radio buttons with specified name
  const radios = form.elements[name];
  // loop through list of radio buttons
  for (let i = 0, len = radios.length; i < len; i++) {
    if (radios[i].checked) {
      // radio checked?
      val = radios[i].value; // if so, hold its value in val
      break; // and break out of for loop
    }
  }
  return val; // return value of checked radio or undefined if none checked
}

function mapOutKey(key, array) {
  const newArray = array.map(function (item) {
    return item[key];
  });
  return newArray;
}

function loadUpSettingsForm() {
  let settingsStorage = new SettingsStorage();
  let settings = settingsStorage.getSettingsFromFile();
  settingsArrayContainer = settings.filePathArray;

  if (settings.type === "weightTracker") {
    // set check bo
    el.autoLoadCheckBox.checked = settings.autoLoad;

    // check the right font size
    switch (settings.fontSize) {
      case "x-small":
        el.xSmallRadio.checked = true;
        break;
      case "small":
        el.smallRadio.checked = true;
        break;
      case "normal":
        el.normalRadio.checked = true;
        break;
      case "large":
        el.largeRadio.checked = true;
        break;
      case "x-large":
        el.xLargeRadio.checked = true;
        break;
      default:
        console.log("No valid font size");
    }
  }
  // update autoload form ul
  display.showAutoLoadList(settingsArrayContainer);
} // End loadUpSettingsForm()

function applySettings(settings) {
  el.autoLoadCheckBox.checked = settings.autoLoad;
  switch (settings.fontSize) {
    case "x-small":
      el.root.style.fontSize = "10px";
      break;
    case "small":
      el.root.style.fontSize = "12px";
      break;
    case "normal":
      el.root.style.fontSize = "16px";
      break;
    case "large":
      el.root.style.fontSize = "20px";
      break;
    case "x-large":
      el.root.style.fontSize = "24px";
      break;
    default:
      console.log("No valid font-size");
  }
} // End
// *************************************************************
//  IPC Code
// *************************************************************
const saveYear = (year) => {
  window.api.saveYear(year);
}; //End saveYear

window.api.handleFontSizeChange((event, fontSize) => {
  switch (fontSize) {
    case "x-small":
      el.root.style.fontSize = "10px";
      break;
    case "small":
      el.root.style.fontSize = "12px";
      break;
    case "normal":
      el.root.style.fontSize = "16px";
      break;
    case "large":
      el.root.style.fontSize = "20px";
      break;
    case "x-large":
      el.root.style.fontSize = "24px";
      break;
    default:
      console.log("No valid font-size");
  }
});

window.api.handleShowAlert((event, { message, msgType }) => {
  display.showAlert(message, msgType);
});
window.api.handleShowSettingsForm((event, noData) => {
  loadUpSettingsForm();
  display.showSettingsForm();
});

// *************************************************************
//   End IPC Code
// *************************************************************
// *************************************************************
//  Year Code
// *************************************************************
el.yearList.addEventListener("click", (e) => {
  // event delegation
  if (e.target.classList.contains("year")) {
    const element = document.querySelector(".year.active");
    removeActiveClass(element);
    // add active class
    e.target.classList.add("active");

    // get the index from the html
    let index = e.target.dataset.index;
    index = parseInt(index);

    // Bug fix
    if (isNaN(index)) {
      return;
    }
    yearIndex = index;
    tabAudio.play();
    display.displayBlock(this.leftSvg);
    display.displayBlock(this.mainSvg);
    // get the array of months and send it to display
    display.paintMonthTabs(arrayOfYearObjs[yearIndex].arrayOfMonthObjects);
    drawD3();
    return;
  } // End code to set the active class
}); // End el.yearList.addEventListener()
// *************************************************************
//  End Year Code
// *************************************************************
// *************************************************************
//  Month Code
// *************************************************************
el.monthList.addEventListener("click", (e) => {
  // this is for clicking on the month list
  if (!e.target.classList.contains("month")) {
    return;
  }
  // event delegation
  if (e.target.classList.contains("month")) {
    const element = document.querySelector(".myFlexItem.active");
    removeActiveClass(element);
    // add active class
    e.target.parentElement.classList.add("active");

    // get the index from the html
    let index = e.target.dataset.index;
    index = parseInt(index);
    monthIndex = index;

    if (isNaN(monthIndex)) {
      return;
    }
    clickAudio.play();
    this.myForm.reset();
    display.hideMyForm();
    display.showMyForm();

    // set time out to focus
    window.setTimeout(function () {
      el.weightInput.focus();
    }, 1000);
    return;
    return;
  } // End code to set the active class
});
// *************************************************************
//  End Month Code
// *************************************************************
// *************************************************************
//  Weight Form Code
// *************************************************************
// Save Weight Btn
el.addWeightSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (isNaN(Number(el.weightInput.value))) {
    display.showAlert("You did not enter a number for the Weight!", "error");
    el.myForm.reset();
    return;
  }

  let weight = el.weightInput.value.trim();
  if (!weight) {
    warningEmptyAudio.play();
    display.showAlert("Please enter a weight!", "error");
    return;
  }
  weight = Number(weight);

  // set weight
  arrayOfYearObjs[yearIndex].arrayOfMonthObjects[monthIndex].weight = weight;
  addAudio.play();
  // save
  saveYear(arrayOfYearObjs[yearIndex]);
  display.showAlert("You added a weight!", "success", 3000);
  el.myForm.reset();
  display.hideMyForm();
  // get the array of months and send it to display
  display.paintMonthTabs(arrayOfYearObjs[yearIndex].arrayOfMonthObjects);
  drawD3();
});
// Cancel Btn Weight Form
el.cancelBtn.addEventListener("click", (e) => {
  cancelAudio.play();
  el.myForm.reset();
  display.hideMyForm();
  // get rid of active class
  const element = document.querySelector(".myFlexItem.active");
  removeActiveClass(element);
});
// *************************************************************
//  End Weight Form Code
// *************************************************************
// *************************************************************
// Settings Code
// *************************************************************
// when You click on save settings Btn
el.saveSettingsSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // get form data to create a settings object

  // fontsize radio code
  let fontSizeValue = getRadioValue(el.settingsForm, "fontSize");
  let settingsStorage = new SettingsStorage();
  let settingsObj = new SettingsObj();
  // set the object values

  settingsObj.fontSize = fontSizeValue;
  settingsObj.filePathArray = settingsArrayContainer;
  // set auto load true or false
  settingsObj.autoLoad = el.autoLoadCheckBox.checked;
  // save the object
  settingsStorage.saveSettings(settingsObj);
  addAudio.play();
  // reset form
  el.settingsForm.reset();
  if (settingsObj.autoLoad) {
    // clear two arrays
    // setting the length to Zero emptys the array
    arrayOfYearObjs.length = 0;
    settingsArrayContainer.length = 0;
    display.displayNone(el.settingsForm);
    startUp();
  } else {
    // let settings = settingsStorage.getSettingsFromFile();
    applySettings(settingsObj);
    // hide form
    display.displayNone(el.settingsForm);
    display.paintYearTabs(mapOutKey("name", arrayOfYearObjs));
    return;
  }
}); // End

// when You click on settings form cancel Btn
el.settingsCancelBtn.addEventListener("click", (e) => {
  cancelAudio.play();
  // hide form
  display.displayNone(el.settingsForm);
  display.paintYearTabs(mapOutKey("name", arrayOfYearObjs));
  return;
});

// when You click on settings form factory reset btn
el.factoryResetBtn.addEventListener("click", (e) => {
  btnAudio.play();
  let settingsStorage = new SettingsStorage();
  settingsStorage.clearFileFromLocalStorage();
  loadUpSettingsForm();
});

// When You click on settings form add path to autoload Btn
el.settingsAddPathBtn.addEventListener("click", (e) => {
  // e.preventDefault();
  window.api.showOpenDialog();
});

// when You click on x to delete a file path
el.autoLoadList.addEventListener("click", (e) => {
  e.preventDefault();
  // event delegation
  if (e.target.classList.contains("deleteFile")) {
    if (!e.ctrlKey) {
      wrongAudio.play();
      display.showAlert(
        "You have to hold down ctrl key to make a deletion",
        "error"
      );
      return;
    }
    //check if control was down, if so delete
    if (e.ctrlKey) {
      // this gets the data I embedded into the html
      let dataIndex = e.target.parentElement.parentElement.dataset.index;
      let deleteIndex = parseInt(dataIndex);
      // delete path
      settingsArrayContainer.splice(deleteIndex, 1);
      warningSelectAudio.play();
      // update Form
      display.showAutoLoadList(settingsArrayContainer);
    }
  }
});
// *************************************************************
// End Settings Code
// *************************************************************
window.api.handleNewYear((event, { name, path }) => {
  if (!name || !path) {
    wrongAudio.play();
    display.showAlert("Error creating a year", "error");
    return;
  }

  if (isNaN(name)) {
    display.showAlert("You have to enter number's to create a year", "error");
    wrongAudio.play();
    return;
  }

  let pathIsTaken = false;

  for (const year of arrayOfYearObjs) {
    if (year.fileNamePath === path) {
      pathIsTaken = true;
    }
  }

  if (pathIsTaken) {
    display.showAlert("That year is already loaded", "error");
    return;
  }

  let nameIsTaken = false;

  for (const year of arrayOfYearObjs) {
    if (year.name === name) {
      nameIsTaken = true;
    }
  }
  if (nameIsTaken) {
    display.showAlert(`A year file called ${name} is already loaded`, "error");
    return;
  }

  // const newYear = new YearObject(dataObj.name, dataObj.fileNamePath);
  const newYear = new YearObject(name, path);
  // create the 12 months
  const January = new MonthObject("January");
  newYear.arrayOfMonthObjects.push(January);
  const February = new MonthObject("February");
  newYear.arrayOfMonthObjects.push(February);
  const March = new MonthObject("March");
  newYear.arrayOfMonthObjects.push(March);
  const April = new MonthObject("April");
  newYear.arrayOfMonthObjects.push(April);
  const May = new MonthObject("May");
  newYear.arrayOfMonthObjects.push(May);
  const June = new MonthObject("June");
  newYear.arrayOfMonthObjects.push(June);
  const July = new MonthObject("July");
  newYear.arrayOfMonthObjects.push(July);
  const August = new MonthObject("August");
  newYear.arrayOfMonthObjects.push(August);
  const September = new MonthObject("September");
  newYear.arrayOfMonthObjects.push(September);
  const October = new MonthObject("October");
  newYear.arrayOfMonthObjects.push(October);
  const November = new MonthObject("November");
  newYear.arrayOfMonthObjects.push(November);
  const December = new MonthObject("December");
  newYear.arrayOfMonthObjects.push(December);
  // push the year obj into the array of year objects
  arrayOfYearObjs.push(newYear);
  sortArrayByName(arrayOfYearObjs);
  // write the year object to disk
  // window api's #################################################################
  saveYear(newYear);
  display.paintYearTabs(mapOutKey("name", arrayOfYearObjs));
});
// window api's #################################################################

window.api.handleOpenFile((event, data) => {
  let isTaken = false;

  for (const element of arrayOfYearObjs) {
    if (element.fileNamePath === data.fileNamePath) {
      isTaken = true;
    }
  }
  if (isTaken) {
    display.showAlert("That file is already loaded!", "error");
    display.paintYearTabs(mapOutKey("name", arrayOfYearObjs));
    return;
  }
  // create a year object
  const newYear = new YearObject(
    data.name,
    data.fileNamePath,
    data.arrayOfMonthObjects
  );
  // push the year obj into the array of year Objects
  arrayOfYearObjs.push(newYear);
  sortArrayByName(arrayOfYearObjs);
  display.paintYearTabs(mapOutKey("name", arrayOfYearObjs));
  return;
});

// responding api
window.api.handleAuotLoadPaths((event, fileNames) => {
  if (!fileNames) {
    display.showAlert("Bad file names.", "error", 1500);
    return;
  }
  // push into array of paths
  for (const filePath of fileNames) {
    if (settingsArrayContainer.includes(filePath)) {
      continue;
    } else {
      settingsArrayContainer.push(filePath);
    }
  }
  addImageAudio.play();
  display.showAutoLoadList(settingsArrayContainer);
});
