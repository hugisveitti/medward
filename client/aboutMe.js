// var ssn = 1507699999;
  var ssn = 2207399999;

  var kennitolur = ["0206929999",
    "1202119999",
    "1507699999",
    "1605899999",
    "2207399999",
    "2307869999",
    "2803899999"];

  var loginBtn = document.getElementById("login-btn");
  loginBtn.addEventListener("click", () => {
    var kennitala = document.getElementById("kennitala");
    ssn = kennitala.value;

    var ktala = document.getElementById("kt");
    ktala.innerHTML = ssn;
    var date = document.getElementById("date-of-birth");
    var kt = ssn + "";
    date.innerHTML = kt.substring(0,2) + "/" + kt.substring(2,4) + "/" + kt.substring(4,6);

      getAboutMe();
      var newMedication = document.getElementById("new-medication");
      newMedication.classList.remove("hidden");

      var loginContainer = document.getElementById("login-container");
      loginContainer.classList.add("hidden");

      var navBar = document.getElementById("nav-bar");
      navBar.classList.remove("hidden");
  });


  var aboutMe;


  function getAboutMe(){
    fetch("/ssn/" + ssn)
    .then((res) => {
      return res.json();
    })
    .then((myJson) => {
      console.log()
      console.log(myJson.returnData)
      aboutMe = myJson.returnData;
      addToSite(aboutMe);

    })
    .then(() => {
      medicationData = aboutMe["medicationData"];
      loadMyMedication();
    })



    function addToSite(aboutMe){
      var ul = document.createElement("ul");
      ul.classList.add("collapsible");
      M.Collapsible.init(ul , true);


      // var allergyCollapsible = [allergyData["component"], allergyData["atc"], allergyData["createDate"], allergyData["type"]]



      ul.appendChild(createCarousel("Allergies", aboutMe["allergyData"], ["component"], ["Component"]));
      ul.appendChild(createCarousel("Diagnoses", aboutMe["diagnosisData"],["icD10Code","term", "date"], ["ICD", "Term", "Year of diognosis"]))
      ul.appendChild(createCarousel("Vaccinations", aboutMe["vaccinationData"],["codeName", "codes"], ["Code Name","Disease"]))
      var medicalInfo = document.getElementById("medical-info");
      medicalInfo.appendChild(ul)

    }
  }

  function createCarousel(title, collapsible, info, infoHead){

    var li = document.createElement("li");
    var header = document.createElement("div");
    header.classList.add("collapsible-header");
    header.innerHTML = "<h5>"+title + "</h5>";

    var body = document.createElement("div");
    body.classList.add("collapsible-body");
    var table = document.createElement("table");
    table.classList.add("striped");
    var tableHead = document.createElement("thead");
    table.appendChild(tableHead);

    var tr = document.createElement("tr");
    tableHead.appendChild(tr);

    for(var i=0;i<info.length; i++){
      var th = document.createElement("th");
      th.innerHTML = infoHead[i];
      tr.appendChild(th);
    }




    var tbody = document.createElement("tbody");
    for(var j=0; j<collapsible.length; j++){

      var tr2 = document.createElement("tr");
      for(var i=0; i<info.length; i++){
        var td = document.createElement("td");
        if(info[i] === "date"){
          td.innerHTML = collapsible[j][info[i]].substring(0,4);
        } else if(info[i] === "codes"){
          for(var k=0; k<collapsible[j][info[i]].length; k++){

            td.innerHTML += collapsible[j][info[i]][k]["disease"] + " ";
          }
        } else {
          td.innerHTML = collapsible[j][info[i]];
        }
        tr2.appendChild(td);
      }
      tbody.appendChild(tr2)
      body.appendChild(document.createElement("br"));
    }
    table.appendChild(tbody);

    body.appendChild(table)


    li.appendChild(header);
    li.appendChild(body);
    return li;
  }
