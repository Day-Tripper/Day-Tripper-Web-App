function getJSON(url) {
    var response;
    var xmlHttp;

    response  = "";
    xmlHTTP = new XMLHttpRequest();

    if(xmlHTTP !== null)
    {
        xmlHTTP.open( "GET", url, false );
        xmlHTTP.send( null );
        response = xmlHTTP.responseText;
    }

    return response;
}

function formHandle() {
  var userInput1 = document.getElementById('usr1').value;
  var start = userInput1;
  var userInput2 = document.getElementById('usr2').value;
  var dest = userInput2;

  destCityBeg = dest.indexOf(",");
  destCitySub = dest.substring(destCityBeg + 1);
  destCityEnd = destCitySub.indexOf(",");
  destCityName = destCitySub.substring(0, destCityEnd);
  openWeather = getJSON("http://api.openweathermap.org/data/2.5/forecast/daily?q=" + destCityName +  "&cnt=1&appid=b68627eccd22e11a0fcad0c80ebbd610");

  condBeg = openWeather.indexOf("main") + 7;
  condSub = openWeather.substring(condBeg);

  condEnd = condSub.indexOf("\"");

  condition = condSub.substring(0, condEnd);

  var conditionElement;

  switch(condition) {
      case "Clouds" : document.getElementById('sky').innerHTML = "It's going to be cloudy.";
          break;
      case "Rain" : document.getElementById('sky').innerHTML = "You'll need an umbrella--it's going to be raining.";
          break;
      case "Clear" : document.getElementById('sky').innerHTML = "Clear skies ahead!";
          break;
  }

  tempMinBeg = openWeather.indexOf("day") + 5;
  tempMinSub = openWeather.substring(tempMinBeg);
  tempMinEnd = tempMinSub.indexOf(",");
  tempMin = tempMinSub.substring(0, tempMinEnd);

  fahrenheitTempMin = Math.round((1.8*(parseFloat(tempMin) - 273)) + 32);

  if (fahrenheitTempMin >= 80) {
      document.getElementById('temp').innerHTML = (Math.round(fahrenheitTempMin) + " degrees (F) - " + "It's going to be hot out. You will not need a jacket. Maybe some shorts and a T-shirt.");
  }
  else if (fahrenheitTempMin >= 70) {
      document.getElementById('temp').innerHTML = (Math.round(fahrenheitTempMin) + " degrees (F) - " + "It's going to be warm out. You probably will not need a jacket. Maybe some long pants and a T-shirt.");

  }
  else if (fahrenheitTempMin >= 50) {
      document.getElementById('temp').innerHTML = (Math.round(fahrenheitTempMin) + " degrees (F) - " + "It's going to be cool out. You might need a jacket. Long pants and a long-sleeved shirt would do as well.");
  }
  else if (fahrenheitTempMin < 50) {
      document.getElementById('temp').innerHTML = (Math.round(fahrenheitTempMin) + " degrees (F) - " + "It's going to be cold out. You should put on a jacket. Dress warmly in layers.");

  }

  mapsTravelTime=getJSON("http://www.mapquestapi.com/directions/v2/route?key=0HG8b7rdqIkwZdFNGenpycewpmvze9KB&from=" + start + "&to=" + dest + "&callback=renderNarrative");


  travelTimeBeg = mapsTravelTime.indexOf("formattedTime") + 16;
  travelTimeSub = mapsTravelTime.substring(travelTimeBeg);

  travelTimeString = travelTimeSub.substring(0, 5);

  travelTimeHours = travelTimeString.substring(0, 2);

  travelTimeMinutes = travelTimeString.substring(3);


  if (travelTimeHours.substring(0, 1)=="0") {
      travelTimeHours = travelTimeHours.substring(1);
  }

  if (travelTimeMinutes.substring(0, 1)=="0") {
      travelTimeMinutes = travelTimeMinutes.substring(1);
  }

  if (travelTimeHours=="0") {
      if(travelTimeMinutes == 1){
          document.getElementById('travel').innerHTML = ("It will take you " + travelTimeMinutes + " minute to get there.");
      }else{
          document.getElementById('travel').innerHTML = ("It will take you " + travelTimeMinutes + " minutes to get there.");
      }
  }
  else {
      if(travelTimeHours == 1){
          document.getElementById('travel').innerHTML = ("It will take you " + travelTimeHours + " hour and " + travelTimeMinutes + " minutes to get there.");
      }
      else{
          document.getElementById('travel').innerHTML = ("It will take you " + travelTimeHours + " hours and " + travelTimeMinutes + " minutes to get there.");
      }
  }


}
