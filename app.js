//variables
var noofinternals = 0;
var noofassignments = 0;
var noofsubjects = 0;
var semMark = 0;
var arrOfSubject = [];
var internalsMarks = [];
var assignmentMarks = [];
var semMarksArr = [];
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
      if (parseInt(numbersub.value) <= 20 && parseInt(numbersub.value) > 1) {
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
        alert("Enter a number between 2 to 20");
        numbersub.value = "";
      }
    } else {
      alert("Enter a number between 2 to 20");
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
    const iaInput = createIAInput(i);
    formSubjects.appendChild(iaInput);
  }

  for (let i = 0; i < noofassignments; i++) {
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
    var iaflag = false;
    var assignflag = false;
    console.log(buttonClick.getAttribute("id"));
    if (buttonClick.getAttribute("id") != "nextbutton") {
      const iaInputs = document.getElementsByClassName("iamarks");
      const assignmentInputs = document.getElementsByClassName("assignmarks");
      for (let i = 0; i < iaInputs.length; i++) {
        if (
          parseInt(iaInputs[i].value) != NaN &&
          parseInt(iaInputs[i].value) <= 30
        ) {
          iaflag = true;
        }
      }
      for (let i = 0; i < assignmentInputs.length; i++) {
        if (
          parseInt(assignmentInputs[i].value) != NaN &&
          parseInt(assignmentInputs[i].value) <= 10
        ) {
          assignflag = true;
        }
      }
      if (iaflag && assignflag) {
        event.preventDefault();
        const singlesubjectsection = document.querySelector(
          "#singlesubjectsection"
        );
        singlesubjectsection.remove();
        marksDisplay();
      } else {
        event.preventDefault();
        alert(
          "Enter all your marks IA marks should be between 0-30 and Assignment should be between 0-10"
        );
      }
    } else {
      const iaInputs = document.getElementsByClassName("iamarks");
      const assignmentInputs = document.getElementsByClassName("assignmarks");
      for (let i = 0; i < iaInputs.length; i++) {
        if (
          parseInt(iaInputs[i].value) != NaN &&
          parseInt(iaInputs[i].value) <= 30
        ) {
          iaflag = true;
        } else {
          iaflag = false;
        }
      }
      for (let i = 0; i < assignmentInputs.length; i++) {
        if (
          parseInt(assignmentInputs[i].value) != NaN &&
          parseInt(assignmentInputs[i].value) <= 10
        ) {
          assignflag = true;
        } else {
          assignflag = false;
        }
      }
      if (iaflag && assignflag) {
        event.preventDefault();
        const singlesubjectsection = document.querySelector(
          "#singlesubjectsection"
        );
        iaMarks();
        assignmentMark();
        singlesubjectsection.remove();
        subjectInputNextSection();
      } else {
        event.preventDefault();
        alert(
          "Enter all your marks IA marks should be between 0-30 and Assignment should be between 0-10"
        );
      }
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
    } else {
      subjectInputSection("calculatebutton", count, "Calculate");
      arrOfSubject.pop();
    }
  } else {
    location.reload();
  }
}

//Get IA Marks
function iaMarks() {
  const iaInputs = document.getElementsByClassName("iamarks");
  for (let i = 0; i < iaInputs.length; i++) {
    internalsMarks.push(parseInt(iaInputs[i].value));
  }
}

//Get Assignment Marks
function assignmentMark() {
  const assignmentInputs = document.getElementsByClassName("assignmarks");
  for (let i = 0; i < assignmentInputs.length; i++) {
    assignmentMarks.push(parseInt(assignmentInputs[i].value));
  }
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

  const semSection = document.createElement("div");
  semSection.setAttribute("class", "subjectsection");
  semSection.setAttribute("id", "semsection");

  const semHeading = document.createElement("h1");
  semHeading.innerText = "Semester";
  semHeading.setAttribute("class", "subjectheading");
  semSection.appendChild(semHeading);

  //Add inputs
  for (let i = 0; i < noofsubjects; i++) {
    const input = displaySem(i);
    semSection.appendChild(input);
  }

  const semCalculateButton = document.createElement("button");
  semCalculateButton.setAttribute("class", "nextbutton");
  semCalculateButton.setAttribute("type", "submit");
  semCalculateButton.setAttribute("id", "semcalculatebutton");
  semCalculateButton.innerText = "Calculate";

  semCalculateButton.addEventListener("click", (event) => {
    event.preventDefault();
    semMarks();
    var flag = false;
    for (let i = 0; i < semMarksArr.length; i++) {
      if (semMarksArr[i] <= 100) {
        flag = true;
      } else {
        flag = false;
      }
    }
    if (flag) {
      for (let i = 0; i < semMarksArr.length; i++) {
        semMark += Math.ceil(semMarksArr[i] / 2);
      }
      semSection.remove();
      const semMarksSection = displaySemMarks(semMark);
      document.body.appendChild(semMarksSection);
    } else {
      event.preventDefault();
      alert("Enter marks between 0-100");
    }
  });

  semSection.appendChild(semCalculateButton);

  document.body.appendChild(internalsAssignmentHeading);
  document.body.appendChild(internalsAssignmentMarks);
  document.body.appendChild(internalMarksHolder);
  document.body.appendChild(assignmentMarksHolder);
  document.body.appendChild(semSection);
}

//Sem Marks
function displaySemMarks(marks) {
  const semSectionDiv = document.createElement("div");
  semSectionDiv.setAttribute("class", "marks");
  const semheading = document.createElement("h1");
  semheading.setAttribute("id", "semheading");
  const semMarks = document.createElement("h4");
  semMarks.setAttribute("id", "semmarks");
  semheading.innerText = "Semester marks";
  semMarks.innerText = marks;
  semSectionDiv.appendChild(semheading);
  semSectionDiv.appendChild(semMarks);
  return semSectionDiv;
}

//Create Cgpa and Sgpa
function displaySem(subjectIndex) {
  const semInput = document.createElement("input");
  semInput.setAttribute("class", "semmarksinput");
  semInput.setAttribute("type", "number");
  semInput.setAttribute("placeholder", `Subject-${subjectIndex + 1} Marks`);
  semInput.classList.add("iamarks");
  return semInput;
}

//Get Sem marks
function semMarks() {
  const semInputs = document.getElementsByClassName("semmarksinput");
  for (let i = 0; i < semInputs.length; i++) {
    semMarksArr.push(parseInt(semInputs[i].value));
  }
}

//Tables Internal Assigments
// function semTable(subjectSemMarks) {
//   const semDiv = document.createElement("div");
//   semDiv.setAttribute("class", "semdivtable");
//   const semTables = document.createElement("table");
//   semTables.setAttribute("class", "semtabletable");
//   const semMarkstableRow = document.createElement("tr");
//   semMarkstableRow.setAttribute("id", "semmarktablerow");
//   const subjectTableRow = document.createElement("tr");
//   subjectTableRow.setAttribute("id", "subjecttablerow");
//   const headingTableRow = document.createElement("th");
//   headingTableRow.setAttribute("id", "headingtablerow");
//   semDiv.appendChild(semTables);
//   semTables.appendChild(subjectTableRow);
//   semTables.appendChild(semMarkstableRow);
//   semTables.appendChild(headingTableRow);
//   const tdTableSubH = document.createElement("td");
//   const tdTableSemH = document.createElement("td");
//   tdTableSubH.innerText = "Subjects";
//   tdTableSemH.innerHTML = "Semester Marks";
//   headingTableRow.appendChild(tdTableSubH);
//   headingTableRow.appendChild(tdTableSemH);
//   console.log(subjectSemMarks);
//   for (let i = 0; i < subjectSemMarks.length; i++) {
//     const tdTableSub = document.createElement("td");
//     const tdTableSem = document.createElement("td");
//     tdTableSub.innerText = i + 1;
//     tdTableSem.innerText = subjectSemMarks[i];
//     subjectTableRow.appendChild(tdTableSub);
//     semMarkstableRow.appendChild(tdTableSem);
//   }
//   return semDiv;
// }
