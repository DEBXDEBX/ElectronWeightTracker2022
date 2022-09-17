class Display {
  constructor(elements, $) {
    this.elements = elements;
    //JQuery
    this.$ = $;
    this.tabColorIndex = 0;
    this.tabColors = [
      "#2de11d",
      "#4848e8",
      "#e84d4d",
      "Orange",
      "Violet",
      "#820ee8",
      "#8e7fc7",
      "#ff008b",
      "#4dc6e8",
      "#17abf5",
      "#4c69bd",
      "#e251dc",
      "#bbb70e",
    ];
  } // End constructor

  // Method
  showAlert(message, className, displayTime = 4000) {
    if (className === "success") {
      // remove error
      this.elements.messageDisplay.classList.remove("error");
      // add success
      this.elements.messageDisplay.classList.add("success");
      // remove red border
      this.elements.messageBorder.classList.remove("redBorder");
      // add green border
      this.elements.messageBorder.classList.add("greenBorder");
    } else {
      // remove success
      this.elements.messageDisplay.classList.remove("success");
      // add error
      this.elements.messageDisplay.classList.add("error");
      // remove green border
      this.elements.messageBorder.classList.remove("greenBorder");
      // add red border
      this.elements.messageBorder.classList.add("redBorder");
    }
    this.elements.messageDisplay.textContent = message;
    $("#myMessageModal").modal("hide");
    $("#myMessageModal").modal("show");
    setTimeout(() => {
      $("#myMessageModal").modal("hide");
    }, displayTime);
  } // End showAlert()

  //Method
  displayNone(element) {
    this.$(element).slideUp("slow");
  } // End displayNone(element)

  //Method
  displayBlock(element) {
    this.$(element).slideDown("slow");
  } // End displayBlock(element)

  //Method
  clearYearDisplay() {
    this.elements.yearList.innerHTML = "";
  } // End clearYearDisplay()

  //Method
  clearMonthDisplay() {
    this.elements.monthList.innerHTML = "";
  } // End clearYearDisplay()

  // Method
  paintYearTabs(mapedArray) {
    this.hideSettingsForm();
    this.displayNone(this.elements.leftSvg);
    this.displayNone(this.elements.mainSvg);
    this.displayNone(this.elements.monthHeading);
    this.displayNone(this.elements.monthList);
    this.displayNone(this.elements.addWeightHeading);
    this.displayNone(this.elements.myForm);
    this.displayBlock(this.elements.yearHeading);
    this.displayBlock(this.elements.yearList);
    this.clearYearDisplay();

    // this will paint all year tabs
    // make variable for html
    let html = "";
    mapedArray.forEach((element, index) => {
      html += `<li data-index="${index}" class="year">${element}</li>`;
    });
    // paint year tabs
    this.elements.yearList.innerHTML = html;
    // color tabs
    let tabList = document.getElementsByClassName("year");
    this.colorSetOfTabs(tabList);
  } // End paintFileCabTabs(mapedArray)

  // Method
  paintMonthTabs(array) {
    this.clearMonthDisplay();
    this.displayNone(this.elements.addWeightHeading);

    this.displayNone(this.elements.monthList);
    this.displayBlock(this.elements.monthList);
    this.displayNone(this.elements.monthHeading);
    this.displayNone(this.elements.myForm);
    this.displayBlock(this.elements.monthHeading);

    // this will paint all month tabs
    // make variable for html
    let html = "";
    array.forEach((element, index) => {
      html += `<div class="mainDiv"><div class='myFlexItem'><h4 class="month" data-index="${index}">${
        element.name
      }</h4></div><div class='weightDiv'><h4 data-index="${index}">${element.weight.toFixed(
        1
      )} LB</h4></div></div>`;
    });
    // paint file cab tabs
    this.elements.monthList.innerHTML = html;
  } // End paintFileCabTabs(mapedArray)

  //Method
  colorSetOfTabs(htmlCollection) {
    for (const item of htmlCollection) {
      item.style.backgroundColor = this.tabColors[this.tabColorIndex];
      if (this.tabColorIndex === this.tabColors.length - 1) {
        this.tabColorIndex = 0;
      } else {
        this.tabColorIndex++;
      }
    }
  } // End colorSetOfTabs(htmlCollection)

  //Method
  showSettingsForm() {
    //  hide everything
    this.displayNone(this.elements.yearList);
    this.displayNone(this.elements.monthList);
    this.displayNone(this.elements.monthHeading);
    this.displayNone(this.elements.myForm);
    this.displayNone(this.elements.yearHeading);
    this.displayNone(this.elements.svgDiv);
    //show settings form
    this.displayBlock(this.elements.settingsForm);
  } // End showSettingsForm()

  //Method
  hideSettingsForm() {
    this.displayNone(this.elements.settingsForm);
  } // End hideSettingsForm()

  //Method
  clearAutoLoadUL() {
    // clear the ul
    this.elements.autoLoadList.innerHTML = "";
  } // End clearAutoLoadUL()

  //Method
  showAutoLoadList(autoLoadArray) {
    // clear the ul
    this.clearAutoLoadUL();
    // make variable for html
    let html = "";
    autoLoadArray.forEach((element, index) => {
      html += `<li data-index="${index}" class="autoLoad"><span title='Delete'><i class="fas fa-trash-alt deleteFile"></i></span>${element}</li>`;
    });
    this.elements.autoLoadList.innerHTML = html;
  }

  //Method
  showMyForm() {
    this.displayBlock(this.elements.myForm);
  }
  //Method
  hideMyForm() {
    this.displayNone(this.elements.myForm);
  }
} // End Display class
