// var medicationSearchBtn = document.getElementById("medicine-search-button");

var addToMyMedicationBtn = document.getElementById("add-to-my-medication");
var medicationName = document.getElementById("medication-name");

var currDrug;

document.addEventListener('DOMContentLoaded', function() {

    var data = {};
    for(var i=0; i<medication.length; i++){
      console.log(medication[i]["name"])

      data[medication[i]["name"]] = null;
    }

    var options = {};
    options["data"] = data;
    options["onAutocomplete"] = (val) => {
      var med;
      console.log(medicationInteractions)
      for(var i=0; i<medicationInteractions.length; i++){
        if(medicationInteractions[i]["name"] === val){
          med = medicationInteractions[i];
          currDrug = medicationInteractions[i];
          break;
        }
      }

      var obj = checkMedication(med);


      var newMedicationResults = document.getElementById("new-medication-results");
      newMedicationResults.innerHTML = "";
      newMedicationResults.classList.add("card");


      if(obj["count"] === 0){
        newMedicationResults.classList.add("no-danger");
        newMedicationResults.classList.remove("danger");

        newMedicationResults.classList.remove("hidden");
        newMedicationResults.innerHTML = "It's okay to take this medication"
      } else {
        newMedicationResults.classList.add("danger");
        newMedicationResults.classList.remove("no-danger");
        newMedicationResults.classList.remove("hidden");

        addNewMedicationResult(obj["contraAlerts"], "diagnosis");
        addNewMedicationResult(obj["majorAlerts"],"medication");
        addNewMedicationResult(obj["moderateAlerts"], "medication");
        addNewMedicationResult(obj["minorAlerts"], "medication");
        newMedicationResults.innerHTML += "You are advised to speak to your physician before taking this drug"
      }

      // newMedicationResults.style.maxHeight = "100%";


      addToMyMedicationBtn.classList.remove("hidden");
    }
    var instances = M.Autocomplete.init(medicationName, options);
    // instances.selectOption(medicationName);
  });


function checkMedication(med){
  count = 0; //count deseases.
  var contraAlerts = []
  var myDiagnoses = aboutMe["diagnosisData"];
  var contra = med["contraIndicationsICD"];
  if(contra){
    for(var i=0; i<contra.length; i++){
      for(var j=0;j< myDiagnoses.length; j++){
        if(contra[i]["icD10Code"].substring(0,3) === myDiagnoses[j]["icD10Code"].substring(0,3)){

          contraAlerts.push(myDiagnoses[j]["term"]);
          count++;
        }
      }
    }
  }

  var majorAlerts = [];
  var major = med["major"];
  if(major){
    for(var i=0; i<major.length; i++){
      for(var j=0; j<medicationData.length; j++){
        if(major[i]["atcCode"] === medicationData[j]["atcCode"]){
          majorAlerts.push(medicationData[j]["name"]);
          count++;
        }
      }
    }
  }

  var moderateAlerts = [];
  var moderate = med["moderate"];
  if(moderate){
    for(var i=0; i<moderate.length; i++){
      for(var j=0; j<medicationData.length; j++){
        if(moderate[i]["atcCode"] === medicationData[j]["atcCode"]){
          moderateAlerts.push(medicationData[j]["name"]);
          count++;
        }
      }
    }
  }

  var minorAlerts = [];
  var minor = med["minor"];
  if(minor){
    for(var i=0; i<minor.length; i++){
      for(var j=0; j<medicationData.length; j++){
        if(minor[i]["atcCode"] === medicationData[j]["atcCode"]){
          minorAlerts.push(medicationData[j]["name"]);
          count++;
        }
      }
    }
  }
  var obj = {"contraAlerts": contraAlerts, "majorAlerts" : majorAlerts,"moderateAlerts" : moderateAlerts,"minorAlerts": minorAlerts, "count":count}

  return obj;
}

function addNewMedicationResult(arr, cate){
      var newMedicationResults = document.getElementById("new-medication-results");
      for(var i=0; i<arr.length; i++){
        newMedicationResults.innerHTML += "This medication should not be taken with the " + cate +" " + arr[i];
        newMedicationResults.innerHTML += "<br>"
      }
      if(arr.length > 0){
        newMedicationResults.innerHTML += "<br>"
      }
}

addToMyMedicationBtn.addEventListener("click", () => {
  var medicationName = document.getElementById("medication-name");

  medicationData.push(currDrug);
  loadMyMedication();
  var newMedicationResults = document.getElementById("new-medication-results");
  newMedicationResults.innerHTML = "";
  newMedicationResults.classList.add("hidden");
  medicationName.value = "";
  addToMyMedicationBtn.classList.add("hidden");
  M.toast({html: 'Drug added to My Medicine'});
});


//dummy data for the drugs available

var medication = [{"atcCode": "M01AE01","name":"Ibufen", "strength":500,"strengthUnit":"mg"},
{"atcCode":"", name:"Immodium"},
{"atcCode":"", name:"Paracetamol"},
{"atcCode" :"B01AC06", name:"Aspirin"}
];



//dummy data for the drug interactions.

// var medicationInteractions = [{"atcCode":"M01AE01", "name":"Ibuprofen","major":[{"atcCode":"B01AC06", "name":"Aspirin"}],"moderate":[{"name":"Metoprolol","atcCode":"C07AB02"}],"minor":[]}]
var medicationInteractions = [{"atcCode":"M01AE01", name:"Ibufen", "contraIndicationsICD":[{"icD10Code": "I10"},{ "icD10Code": "J45"},{"icD10Code":"N18"}], "major":[{"atcCode":"B01AC06"}],"moderate":[{"atcCode":"C07AB02"},{"atcCode":"C09CA00"},{"atcCode":"C09CA03"}],"minor":[]},
    {"atcCode":"", name:"Immodium", "contraIndicationsICD":[{"icD10Code": "", "icD10Code": ""}], "major":[{"atcCode":""}],"moderate":[{"atcCode":""}],"minor":[]},
    {"atcCode":"", name:"Paracetamol", "contraIndicationsICD":[], "major":[],"moderate":[],"minor":[]},
    {"atcCode":"B01AC06", name:"Aspirin", "contraIndicationsICD":[], "major":[],"moderate":[{"atcCode":"C09CA00"},{"atcCode":"C09CA03"}],"minor":[{"atcCode":"C07AB02"}]}
  ]
