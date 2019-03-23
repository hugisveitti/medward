// var aboutMe = document.getElementById("about-me");
// var newMedication = document.getElementById("new-medication");
var myMedication = document.getElementById("my-medication");
// myMedication.style.display = "block";

var aboutMeTab = document.getElementById("about-me-tab");
var newMedicationTab = document.getElementById("new-medication-tab");
var myMedicationTab = document.getElementById("my-medication-tab");


aboutMeTab.addEventListener("click", () => {
  //veit ekki af hverju virkar ekki ad hafa utan function about me og thad
  var aboutMe = document.getElementById("about-me");
  var newMedication = document.getElementById("new-medication");
  var myMedication = document.getElementById("my-medication");

  // aboutMe.style.display = "block"
  // aboutMe.classList.add("scale-in")
  aboutMe.classList.remove("hidden");

  myMedication.classList.add("hidden");
  newMedication.classList.add("hidden");

  aboutMeTab.classList.add("active");
  newMedicationTab.classList.remove("active");
  myMedicationTab.classList.remove("active");
});

newMedicationTab.addEventListener("click", () => {
  var aboutMe = document.getElementById("about-me");
  var newMedication = document.getElementById("new-medication");
  var myMedication = document.getElementById("my-medication");
  newMedication.classList.remove("hidden");
  myMedication.classList.add("hidden");
  aboutMe.classList.add("hidden");

  newMedicationTab.classList.add("active");
  aboutMeTab.classList.remove("active");
  myMedicationTab.classList.remove("active");
});

myMedicationTab.addEventListener("click", () => {
  var aboutMe = document.getElementById("about-me");
  var newMedication = document.getElementById("new-medication");
  var myMedication = document.getElementById("my-medication");
  myMedication.classList.remove("hidden");
  aboutMe.classList.add("hidden");
  newMedication.classList.add("hidden");

  myMedicationTab.classList.add("active");
  newMedicationTab.classList.remove("active");
  aboutMeTab.classList.remove("active");

  crossCheck();
});
