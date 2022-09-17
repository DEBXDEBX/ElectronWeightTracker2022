//Declare class
class Weight {
  constructor(textValue) {
    this.textValue = textValue;

    this.numberValue = 0;
    this.isNumber = false;
    this.isNotEmpty = false;
    this.setNumber();
    this.checkForEmpty();
  }
  // Getter's  Notice You have to have different names than the variables
  // I did not use these getters, but they work is you call them
  numberVal() {
    return this.numberValue;
  }
  isNum() {
    return this.isNumber;
  }
  isNotEm() {
    return this.isNotEmpty;
  }

  // Method's
  setNumber() {
    this.numberValue = Number(this.textValue);
    if (isNaN(this.numberValue)) {
      console.log("This is not a number");
      this.isNumber = false;
    } else {
      console.log("This is a number");
      this.isNumber = true;
      this.isNotEmpty = true;
    }
  }

  checkForEmpty() {
    if (this.numberValue === 0) {
      this.isNotEmpty = false;
      console.log("equal to zero");
    } else {
      console.log("not equel to zero");
    }
  }
} //end of Weight class

//Select audio files
const btnAudio = document.querySelector("#btnAudio");
const cancelAudio = document.querySelector("#cancelAudio");
const warningNameTakenAudio = document.querySelector("#warningNameTakenAudio");
//Select HTML Elements
let displayMessage = document.querySelector("#display");
let avergeBtn = document.querySelector("#getAveBtn");
let clearBtn = document.querySelector("#clearFormBtn");
let weight1 = document.querySelector("#wOne");
let weight2 = document.querySelector("#wTwo");
let weight3 = document.querySelector("#wThree");
let weight4 = document.querySelector("#wFour");
let weight5 = document.querySelector("#wFive");
let weight6 = document.querySelector("#wSix");
let weight7 = document.querySelector("#wSeven");
//Set Display Message
let onLoadMessage = "Enter Numbers To Average";
displayMessage.innerHTML = onLoadMessage;

clearBtn.addEventListener("click", function () {
  //This clears the text fields
  weight1.value = "";
  weight2.value = "";
  weight3.value = "";
  weight4.value = "";
  weight5.value = "";
  weight6.value = "";
  weight7.value = "";
  //This updates the display
  displayMessage.innerHTML = onLoadMessage;
  cancelAudio.play();
});

avergeBtn.addEventListener("click", function (event) {
  event.preventDefault();
  //create objects
  let wObject1 = new Weight(weight1.value);
  let wObject2 = new Weight(weight2.value);
  let wObject3 = new Weight(weight3.value);
  let wObject4 = new Weight(weight4.value);
  let wObject5 = new Weight(weight5.value);
  let wObject6 = new Weight(weight6.value);
  let wObject7 = new Weight(weight7.value);

  let totalWeight = 0;
  let myArray = [];
  //add objects to the array if the are valid numbers and not empty
  if (wObject1.isNotEmpty && wObject1.isNumber) {
    myArray.push(wObject1);
  }
  if (wObject2.isNotEmpty && wObject2.isNumber) {
    myArray.push(wObject2);
  }
  if (wObject3.isNotEmpty && wObject3.isNumber) {
    myArray.push(wObject3);
  }
  if (wObject4.isNotEmpty && wObject4.isNumber) {
    myArray.push(wObject4);
  }
  if (wObject5.isNotEmpty && wObject5.isNumber) {
    myArray.push(wObject5);
  }
  if (wObject6.isNotEmpty && wObject6.isNumber) {
    myArray.push(wObject6);
  }
  if (wObject7.isNotEmpty && wObject7.isNumber) {
    myArray.push(wObject7);
  }

  //loop through to get the total weight
  myArray.forEach(function (weight) {
    totalWeight += weight.numberValue;
    //for debugging
    // console.table(weight);
  });
  //Calculate Average
  totalWeight = totalWeight / myArray.length;

  //Update Display
  let messagePartOne = "Your Average is:  ";

  if (
    !wObject1.isNumber ||
    !wObject2.isNumber ||
    !wObject3.isNumber ||
    !wObject4.isNumber ||
    !wObject5.isNumber ||
    !wObject6.isNumber ||
    !wObject7.isNumber
  ) {
    displayMessage.innerHTML = "Please enter numbers only!";
    warningNameTakenAudio.play();
  } else {
    if (isNaN(totalWeight)) {
      warningNameTakenAudio.play();
      displayMessage.innerHTML = "Please enter numbers to average!";
      return;
    }
    displayMessage.innerHTML = messagePartOne + totalWeight;
    btnAudio.play();
  }
});
