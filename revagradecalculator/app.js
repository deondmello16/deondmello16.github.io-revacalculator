//variables
var noofinternals = 0;
var noofassignments = 0;
var noofsubjects = 0;
var arrOfSubject = [];
var internalsMarks = [];
var assignmentMarks = [];
var count = 2;

// Elements
const numberofinternal = document.querySelector("#numberofinternal");
const numberofassignment = document.querySelector("#numberofassignment");
const iasubmit = document.querySelector("#iasubmit");
const subjectnumbersection = document.querySelector("#subjectnumbersection");
const subjectsnumberprocess = document.querySelector("#subjectsnumberprocess");
const numbersub = document.querySelector("#numbersub");
const entrysection = document.querySelector("#entrysection");

//Number of internals and assignment
iasubmit.addEventListener("click", (event) => {
  event.preventDefault();
  if (iasubmit.disabled != true) {
    if (
      numberofinternal.value != "" &&
      numberofassignment.value != "" &&
      noofinternals == 0 &&
      noofassignments == 0
    ) {
      if (
        parseInt(numberofinternal.value) <= 5 &&
        parseInt(numberofassignment.value) <= 5 &&
        parseInt(numberofassignment.value) > 0 &&
        parseInt(numberofinternal.value) > 0
      ) {
        if (subjectnumbersection.style.visibility != "visible") {
          subjectnumbersection.style.visibility = "visible";
        }
        noofinternals = parseInt(numberofinternal.value);
        noofassignments = parseInt(numberofassignment.value);
        iasubmit.disabled = true;
        if (iasubmit.disabled != false) {
          iasubmit.classList.remove("number-form-button-hover");
        }
      } else {
        alert("Enter a number between 1 to 5");
        numberofinternal.value = "";
        numberofassignment.value = "";
      }
    } else {
      alert("Enter a number between 1 to 5");
      numberofinternal.value = "";
      numberofassignment.value = "";
    }
  }
});

//Number of subjects
subjectsnumberprocess.addEventListener("click", (event) => {
  event.preventDefault();
  if (subjectsnumberprocess.disabled != true) {
    if (numbersub.value != "" && noofsubjects == 0) {
      if (parseInt(numbersub.value) <= 20) {
        noofsubjects = parseInt(numbersub.value);
        subjectsnumberprocess.disabled = true;
        if (subjectsnumberprocess.disabled != false) {
          subjectsnumberprocess.classList.remove("number-form-button-hover");
        }
        entrysection.remove();
        subjectnumbersection.remove();
        console.log(arraySubjects(noofsubjects));
        subjectInputSection("nextbutton", 1, "Next");
      } else {
        alert("Enter a number between 1 to 20");
        numbersub.value = "";
      }
    } else {
      alert("Enter a number between 1 to 20");
      numbersub.value = "";
    }
  }
});

//Subject Section
function subjectInputSection(buttonId, subjectIndex, buttonText) {
  const subjectSection = document.createElement("div");
  subjectSection.setAttribute("class", "subjectsection");
  subjectSection.setAttribute("id", "singlesubjectsection");

  const formSubjects = document.createElement("form");
  formSubjects.setAttribute("class", "subjectform");

  for (let i = 0; i < noofinternals; i++) {
    console.log(i);
    const iaInput = createIAInput(i);
    formSubjects.appendChild(iaInput);
  }

  for (let i = 0; i < noofassignments; i++) {
    console.log(i);
    const assignmentInput = createAssignmentInput(i);
    formSubjects.appendChild(assignmentInput);
  }

  const nextButton = nextButtons(buttonId, buttonText);

  const subjectHeading = document.createElement("h1");
  subjectHeading.setAttribute("class", "subjectheading");
  console.log("Subject Index: " + subjectIndex);
  subjectHeading.innerText = `Subject-${subjectIndex}`;

  subjectSection.appendChild(subjectHeading);
  formSubjects.appendChild(nextButton);
  subjectSection.appendChild(formSubjects);

  document.body.insertBefore(subjectSection, document.getElementById("script"));

  const buttonClick = document.querySelector("button");
  buttonClick.addEventListener("click", (event) => {
    console.log(buttonClick.getAttribute("id"));
    if (buttonClick.getAttribute("id") != "nextbutton") {
      event.preventDefault();
      const singlesubjectsection = document.querySelector(
        "#singlesubjectsection"
      );
      singlesubjectsection.remove();
      marksDisplay();
      console.log("Calculate Button Clicked");
    } else {
      event.preventDefault();
      const singlesubjectsection = document.querySelector(
        "#singlesubjectsection"
      );
      iaMarks();
      assignmentMark();
      singlesubjectsection.remove();
      subjectInputNextSection();
    }
  });
}

//Subject Section with Next
function subjectInputNextSection() {
  if (arrOfSubject.length != 0) {
    if (arrOfSubject.length != 1) {
      subjectInputSection("nextbutton", count, "Next");
      count += 1;
      console.log("Count: " + count);
      arrOfSubject.pop();
      console.log("Array size: " + arrOfSubject.length);
    } else {
      subjectInputSection("calculatebutton", count, "Calculate");
      arrOfSubject.pop();
      console.log("Array size: " + arrOfSubject.length);
    }
  } else {
    location.reload();
  }
}

//Get IA Marks
function iaMarks() {
  const iaInputs = document.getElementsByClassName("iamarks");
  console.log(iaInputs);
  for (let i = 0; i < iaInputs.length; i++) {
    internalsMarks.push(parseInt(iaInputs[i].value));
  }
  console.log(internalsMarks);
}

//Get Assignment Marks
function assignmentMark() {
  const assignmentInputs = document.getElementsByClassName("assignmarks");
  console.log(assignmentInputs);
  for (let i = 0; i < assignmentInputs.length; i++) {
    assignmentMarks.push(parseInt(assignmentInputs[i].value));
  }
  console.log(assignmentMarks);
}

// Create IA input
function createIAInput(iaIndex) {
  const iaInput = document.createElement("input");
  iaInput.setAttribute("class", "iamarksinput");
  iaInput.setAttribute("type", "number");
  iaInput.setAttribute("placeholder", `IA-${iaIndex + 1} Marks`);
  iaInput.classList.add("iamarks");
  return iaInput;
}

// Create Assignment input
function createAssignmentInput(assignmentIndex) {
  const assignmentInput = document.createElement("input");
  assignmentInput.setAttribute("class", "assignmentmarksinput");
  assignmentInput.setAttribute("type", "number");
  assignmentInput.setAttribute(
    "placeholder",
    `Assignment ${assignmentIndex + 1} Marks`
  );
  assignmentInput.classList.add("assignmarks");
  return assignmentInput;
}

//Create Next button
function nextButtons(buttonId, buttonText) {
  const nextButton = document.createElement("button");
  nextButton.setAttribute("class", "nextbutton");
  nextButton.setAttribute("type", "submit");
  nextButton.setAttribute("id", buttonId);
  //nextButton.setAttribute();
  nextButton.innerText = buttonText;
  nextButton.classList.add("number-form-button-hover");
  return nextButton;
}

//Initialiazing Number of Subjects array
function arraySubjects(noofsubjects) {
  for (let i = 0; i < noofsubjects - 1; i++) {
    arrOfSubject.push(i);
  }
  return arrOfSubject;
}

//Calculate Internals marks
function internalsMarksTotal() {
  var internals = 0;
  for (let i of internalsMarks) {
    let divmarks = Math.ceil(i / 2);
    internals += divmarks;
  }
  return internals;
}

//Calculate Assignment marks
function assignmentMarksTotal() {
  var assignments = 0;
  for (let i of assignmentMarks) {
    assignments += i;
  }
  return assignments;
}

//Calculate to total marks
function totalMarks() {
  var totalMark = internalsMarksTotal() + assignmentMarksTotal();
  return totalMark;
}

//Create Marks Page
function marksDisplay() {
  const internalsAssignmentHeading = document.createElement("h4");
  internalsAssignmentHeading.innerText =
    "Total Marks with Internals and Assigments";
  internalsAssignmentHeading.setAttribute("id", "internalassignmentheading");

  const internalsAssignmentMarks = document.createElement("h1");
  internalsAssignmentMarks.innerText = totalMarks();
  internalsAssignmentMarks.setAttribute("id", "internalassignmentmarks");

  const internalMarksHolder = document.createElement("div");
  const internalsHeading = document.createElement("h4");
  const internalsMarks = document.createElement("h1");
  internalsHeading.innerText = "Internals";
  internalsMarks.innerText = internalsMarksTotal();
  internalMarksHolder.setAttribute("id", "internalsmarks");
  internalMarksHolder.setAttribute("class", "marks");
  internalMarksHolder.appendChild(internalsHeading);
  internalMarksHolder.appendChild(internalsMarks);

  const assignmentMarksHolder = document.createElement("div");
  const assignmentsHeading = document.createElement("h4");
  const assignmentsMarks = document.createElement("h1");
  assignmentsHeading.innerText = "Assignments";
  assignmentsMarks.innerText = assignmentMarksTotal();
  assignmentMarksHolder.setAttribute("id", "assignmentsmarks");
  assignmentMarksHolder.setAttribute("class", "marks");
  assignmentMarksHolder.appendChild(assignmentsHeading);
  assignmentMarksHolder.appendChild(assignmentsMarks);

  document.body.appendChild(internalsAssignmentHeading);
  document.body.appendChild(internalsAssignmentMarks);
  document.body.appendChild(internalMarksHolder);
  document.body.appendChild(assignmentMarksHolder);
}
