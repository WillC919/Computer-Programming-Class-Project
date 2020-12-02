$.ajaxSetup({async: false});
var data;     
function getData(){
  var apiURL = "https://data.cityofnewyork.us/resource/w7a6-9xrz.json";
  data = $.getJSON(apiURL).responseJSON;
}
      
function showInfo(){
  var template = document.getElementById("layout").innerHTML;
  var sName = document.getElementById("searchName").value           
  var output = document.getElementById("output");
  var build = "";
  var A=0, B=0, C=0, D=0;
  var Br=0, Bx=0, SI=0, QU=0, MA=0;

  for (var i=0; i<data.length; i++) {
    if (data[i].facility_name.toLowerCase().includes(sName.toLowerCase()) ) {
      build += Mustache.render(template, data[i]);
      try{
      if ( data[i].facility_type.includes("Child Health Center") )  A++;
      if ( data[i].facility_type.includes("Nursing Home") )  B++;
      if ( data[i].facility_type.includes("Diagnostic & Treatment Center") )  C++;
      if ( data[i].facility_type.includes("Acute Care Hospital") )  D++;

      if ( data[i].borough.includes("Brooklyn") )  Br++;
      if ( data[i].borough.includes("Bronx") )  Bx++;
      if ( data[i].borough.includes("Staten Island") )  SI++;
      if ( data[i].borough.includes("Queens") )  QU++;
      if ( data[i].borough.includes("Manhattan") )  MA++;
      }catch(err){}; 

    }
  }
  var chartData1 = [
    ["Child Health Centers", A],
    ["Nursing Home", B],
    ["Diagnostic & Treatment Center", C],
    ["Acute Care Hospital", D]			
  ];
  c3.generate({
    bindto: "#myChart1",
    data: {
      columns: chartData1, //end columns
      type: "bar"				
    } //end data
  }); // end generate	
  var chartData2 = [
    ["Brooklyn", Br],
    ["Bronx", Bx],
    ["Staten Island", SI],
    ["Queens", QU],
    ["Manhattan", MA]			
  ];
  c3.generate({
    bindto: "#myChart2",
    data: {
      columns: chartData2, //end columns
      type: "pie"				
    } //end data
  }); // end generate	
  output.innerHTML = build;
}

function DrawMap(Lat, Lon){
  var key = "aJl1fy1cclDij43e7huApGjnhHi4mhlX";
  var setImgA = "<img class = imgPlaceA src=https://www.mapquestapi.com/staticmap/v5/map?key=";
  var setImgB = "<img class = imgPlaceB src=https://www.mapquestapi.com/staticmap/v5/map?key=";
  var sizeA = "&zoom=15&size=" + Math.round(screen.width*0.8) + "," + Math.round(screen.width*0.8) + ">"
  var sizeB = "&zoom=15&size=" + Math.round(screen.width*0.255) + "," + Math.round(screen.width*0.255) + ">"
  var sizeC = "&zoom=15&size=" + Math.round(screen.width*0.25) + "," + Math.round(screen.width*0.175) + ">"
  var sizeD = "&zoom=15&size=" + Math.round(screen.width*0.471) + "," + Math.round(screen.width*0.121) + ">"
  function myFunction(mS, mHT, mT, sL, lL, lxL, lxLk) {
    if (mS.matches) { //Mobile Small Map Viewpoint
      var buildMap = "";
      buildMap += setImgA + key + "&locations=" + Lat + "," + Lon + sizeA;
      document.getElementById("MapQuest").innerHTML = buildMap;

    } else if (mHT.matches) {
      var buildMap = "";
      buildMap += setImgA + key + "&locations=" + Lat + "," + Lon + sizeA;
      document.getElementById("MapQuest").innerHTML = buildMap;

    } else if (mT.matches) {//Tablet Map Viewpoint
      var buildMap = "";
      buildMap += setImgA + key + "&locations=" + Lat + "," + Lon + sizeA;
      document.getElementById("MapQuest").innerHTML = buildMap;

    } else if (sL.matches) {//Laptop Map Viewpoint
      var buildMap = "";
      buildMap += setImgB + key + "&locations=" + Lat + "," + Lon + sizeB;
      document.getElementById("MapQuest").innerHTML = buildMap;

    } else if (lL.matches) { //Large Lapotop Map Viewpoint
      var buildMap = "";
      buildMap += setImgB + key + "&locations=" + Lat + "," + Lon + sizeB;
      document.getElementById("MapQuest").innerHTML = buildMap;

    } else if (lxL.matches) { //Extra Large Lapotop Map Viewpoint
      var buildMap = "";
      buildMap += setImgB + key + "&locations=" + Lat + "," + Lon + sizeC;
      document.getElementById("MapQuest").innerHTML = buildMap;

    } else if (lxLk.matches) { //Extra Large Lapotop Map Viewpoint
      var buildMap = "";
      buildMap += setImgB + key + "&locations=" + Lat + "," + Lon + sizeC;
      document.getElementById("MapQuest").innerHTML = buildMap;

    } else { //4k Map Viewpoint
      var buildMap = "";
      buildMap += setImgB + key + "&locations=" + Lat + "," + Lon + sizeD;
      document.getElementById("MapQuest").innerHTML = buildMap;

    }
  }
  //Viewpoints
  var mS = window.matchMedia("(max-width: 320px)");
  var mHT = window.matchMedia("(max-width: 568px)");
  var mT = window.matchMedia("(max-width: 768px)");
  var sL = window.matchMedia("(max-width: 1024px)");
  var lL = window.matchMedia("(max-width: 1440px)");
  var lxL = window.matchMedia("(max-width: 1670px)");
  var lxLk = window.matchMedia("(max-width: 2559px)");
  myFunction(mS, mHT, mT, sL, lL, lxL, lxLk);
  mS.addListener(myFunction);
  mHT.addListener(myFunction);
  mT.addListener(myFunction);
  sL.addListener(myFunction);
  lL.addListener(myFunction);
  lxL.addListener(myFunction);
  lxLk.addListener(myFunction);
}