class Elements {
  constructor() {
    // select the lists
    this.yearList = document.querySelector("#yearList");
    this.monthList = document.querySelector("#monthList");
    this.autoLoadList = document.querySelector("#autoLoadList");
    // select headings
    this.yearHeading = document.querySelector("#yearHeading");
    this.monthHeading = document.querySelector("#monthHeading");
    // select forms
    this.myForm = document.querySelector("#myForm");
    this.settingsForm = document.querySelector("#settingsForm");
    // select svg
    this.mainSvg = document.querySelector("#mainSvg");
    this.leftSvg = document.querySelector("#leftSvg");
    this.svgDiv = document.querySelector("#svgDiv");

    // select form btns
    this.addWeightSubmitBtn = document.querySelector("#addWeightSubmitBtn");
    this.cancelBtn = document.querySelector("#weightCancel");
    this.saveSettingsSubmitBtn = document.querySelector(
      "#saveSettingsSubmitBtn"
    );
    this.settingsCancelBtn = document.querySelector("#settingsCancelBtn");
    this.factoryResetBtn = document.querySelector("#factoryResetBtn");
    this.settingsAddPathBtn = document.querySelector("#settingsAddPathBtn");
    // select textInput
    this.weightInput = document.querySelector("#weightInput");
    // this is for the fontSize
    this.root = document.querySelector(":root");
    this.autoLoadCheckBox = document.querySelector("#autoLoadCheckBox");
    this.xSmallRadio = document.querySelector("#xSmallRadio");
    this.smallRadio = document.querySelector("#smallRadio");
    this.normalRadio = document.querySelector("#normalRadio");
    this.largeRadio = document.querySelector("#largeRadio");
    this.xLargeRadio = document.querySelector("#xLargeRadio");
    // select message display
    this.messageDisplay = document.querySelector("#displayMessage");
    // select message border
    this.messageBorder = document.querySelector("#modalBorder");
  } // End constructor
} // End Elements class
