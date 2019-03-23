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
  for(var i=0; i<medicationData.length; i++){
    var obj = {}
    obj = checkMedication(medicationData[i]);
    obj["name"] = medicationData[i]["name"];
    alerts.push(obj);
  }

  for(var i=0;i<alerts.length; i++){

    addAlert(alerts[i]["name"], alerts[i]["contraAlerts"], "major-danger", "diagnosis");
    addAlert(alerts[i]["name"], alerts[i]["majorAlerts"], "major-danger", "medication");
    addAlert(alerts[i]["name"], alerts[i]["moderateAlerts"], "moderate-danger", "medication");
    addAlert(alerts[i]["name"], alerts[i]["minorAlerts"], "minor-danger", "medication");
    }
}

function addAlert(name, alert, type, cate){
  console.log(name)
  console.log(alert)
  for(var i=0;i<alert.length; i++){
    var div = document.createElement("div");
    div.classList.add(type);
    div.classList.add("alert-div")
    div.innerHTML = name + " should not be taken with the "+ cate + " " + alert[i];
    if(type == "major-danger"){
      div.innerHTML += ". Contact your doctor immediately";
    } else {
      div.innerHTML += ". Contact your doctor."
    }
    myMedicationAlerts.appendChild(div);
  }
  console.log(myMedicationAlerts);
}
