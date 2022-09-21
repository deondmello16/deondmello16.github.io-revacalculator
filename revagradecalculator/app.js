// Elements
const numberofinternal = document.querySelector("#numberofinternal");
const numberofassignment = document.querySelector("#numberofassignment");
const iasubmit = document.querySelector("#iasubmit");
const subjectnumbersection = document.querySelector("#subjectnumbersection");

iasubmit.addEventListener("click", (event) => {
  event.preventDefault();
  if (numberofinternal.value != "" && numberofassignment.value != "") {
    if (subjectnumbersection.style.visibility != "visible") {
      subjectnumbersection.style.visibility = "visible";
    }
    iasubmit.disabled = true;
  }
});
