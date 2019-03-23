var medicationData;
var myMedicationAlerts = document.getElementById("my-medication-alerts");


function loadMyMedication(){

  var ul = document.createElement("ul");
  ul.classList.add("collapsible");
  M.Collapsible.init(ul , true);

  for(var i=0; i<medicationData.length; i++){
    ul.appendChild(createCarousel(medicationData[i]["name"], [medicationData[i]],["instructions","strength","strengthUnit"], ["Instructions","Strength","Unit"]))
  }

  var myMedicationList = document.getElementById("my-medication-list");
  while (myMedicationList.firstChild) {
    myMedicationList.removeChild(myMedicationList.firstChild);
  }
  myMedicationList.appendChild(ul)
}


function crossCheck(){

  //hreinsa ef eitthvad er nuthegar...
  while(myMedicationAlerts.firstChild){
    myMedicationAlerts.removeChild(myMedicationAlerts.firstChild);
  }

  var alerts = [];
  var count = 0;
  for(var i=0; i<medicationData.length; i++){
    var obj = {}
    obj = checkMedication(medicationData[i]);
    console.log(obj);
    if(obj["count"] > count){
      count = obj["count"];
    }
    obj["name"] = medicationData[i]["name"];
    alerts.push(obj);
  }

  for(var i=0;i<alerts.length; i++){
    addAlert(alerts[i]["name"], alerts[i]["contraAlerts"], "major-danger", "diagnosis");
    addAlert(alerts[i]["name"], alerts[i]["majorAlerts"], "major-danger", "medication");
    addAlert(alerts[i]["name"], alerts[i]["moderateAlerts"], "moderate-danger", "medication");
    addAlert(alerts[i]["name"], alerts[i]["minorAlerts"], "minor-danger", "medication");
    }
    console.log(count)
    if(count === 0){
      var div = document.createElement("div");
      div.classList.add("no-danger");
      div.classList.add("alert-div");
      // div.classList.add("card");
      div.innerHTML = "No interaction or contraindications detected"
      myMedicationAlerts.appendChild(div);
    }
}

function addAlert(name, alert, type, cate){
  for(var i=0;i<alert.length; i++){
    var div = document.createElement("div");
    div.classList.add(type);
    // div.classList.add("card");
    div.classList.add("alert-div")

    div.innerHTML = name + " should not be taken with the "+ cate + " " + alert[i];
    if(type == "major-danger"){
      div.innerHTML += ". Contact your doctor immediately";
    } else {
      div.innerHTML += ". Contact your doctor."
    }
    myMedicationAlerts.appendChild(div);
  }
}
