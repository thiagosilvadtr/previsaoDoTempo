import { tempNow, obj } from "./script.js";
import { InformationAdd, infoAdd, radiationUv } from "./info_adc.js";
import { infoSemanal } from "./info_sem.js";
import { graph } from "./graphic.js";
import { alerts } from "./alerts.js";

/*------------keys and token-----------*/
var key = "257fc07a61a4bfb3e731d0faf7f3e9b0";
var mapToken =
  "pk.eyJ1IjoidGhpYWdvLWR1dHJhIiwiYSI6ImNreGg4NjVxczF0NGQzMHB6bDJhbzYwbnIifQ.BanXmeP4ermzpnap6Zag1Q";
/*-------------receive geographic coordinates and make calls 
---------------to other functions passing data via params
----------------*/
export function infoSem(lat, lon) {
  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=metric&lang=pt_br`,
    type: "GET",
    dataType: "json",
    success: function (data) {
      radiationUv(data.current.uvi);
      infoSemanal(data.daily);

      var hoursArray = data.hourly;
      var hours = [];
      var temp = [];

      /*------------collecting data for the chart------------------*/
      hoursArray.forEach((element, index, array) => {
        var hr = new Date(element.dt * 1000).getHours();
        var temps = element.temp;

        hours.push(`${hr}h`);
        temp.push(Math.ceil(temps));
      });

      graph(hours, temp);
      alerts(data.alerts);
      $("#loader").fadeOut();
    },
    error: function () {
      console.log("erro");
      $("#loader").fadeOut();
    },
  });
}
/*----------passing data to other functions through objects--------------------*/
export function currentTime(location) {
  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/weather?id=${location}&appid=${key}&units=metric&lang=pt_br`,
    type: "GET",
    dataType: "json",
    success: function (data) {
      obj.estado = data.name;
      obj.pais = data.sys.country;
      obj.temperatura = data.main.temp.toFixed(0);
      obj.txt_clima = data.weather[0].description;
      obj.max = data.main.temp_max.toFixed(0);
      obj.min = data.main.temp_min.toFixed(0);
      obj.icone = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;

      InformationAdd.humidade = data.main.humidity;
      InformationAdd.vento = data.wind.speed.toFixed(1);
      InformationAdd.sens_termica = data.main.feels_like.toFixed(0);
      InformationAdd.visibilidade = data.visibility;
      InformationAdd.pressao = data.main.pressure.toFixed(1);

      tempNow(
        obj.estado,
        obj.pais,
        obj.temperatura,
        obj.min,
        obj.max,
        obj.txt_clima,
        obj.icone
      );

      infoAdd(
        InformationAdd.humidade,
        InformationAdd.vento,
        InformationAdd.sens_termica,
        InformationAdd.visibilidade,
        InformationAdd.pressao
      );
      $("#loader").fadeOut();
    },

    error: function () {
      console.log("erro");
      $("#loader").fadeOut();
    },
  });
}

/*------------function that receives geo coordinates------------------*/
function userLocation(lat, lon) {
  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric&lang=pt_br`,
    type: "GET",
    dataType: "json",
    success: function (data) {
      var localCode = data.id;

      currentTime(localCode);
    },

    error: function () {
      console.log("erro");
    },
  });
}

/*-----------function that asks permission to access location-------------------*/
function GeoLocalizacao() {
  if (navigator.geolocation) {
    //----------------checking geolocation
    navigator.geolocation.getCurrentPosition(function (position) {
      userLocation(position.coords.latitude, position.coords.longitude);
      infoSem(position.coords.latitude, position.coords.longitude);
    });
  } else {
    $("#loader").fadeOut();
  }
}
GeoLocalizacao();

/*------------mapbox call function------------------*/
function searchInput(input) {
  $.ajax({
    url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
      input
    )}.json?access_token=${mapToken}`,
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log("mapbox", data);
      var lon = data.features[0].geometry.coordinates[0];
      var lat = data.features[0].geometry.coordinates[1];
      userLocation(lat, lon);
      infoSem(lat, lon);
      $("#loader").fadeOut();
    },

    error: function () {
      console.log("erro");
      $("#loader").fadeOut();
    },
  });
}

/*------------event that does the search when pressing the enter key------------------*/
$("#textSearch").on("keypress", (e) => {
  if (e.which == 13) {
    $("#loader").show();
    var local = $("input#textSearch").val();
    if (local) {
      searchInput(local);
    } else {
      alert("Não encontramos essa localização");
    }
  }
});

/*------------event that does the search when clicking on the icon------------------*/
$("#submit").click((e) => {
  $("#loader").show();
  var local = $("input#textSearch").val();
  if (local) {
    searchInput(local);
  } else {
    alert("Não encontramos essa localização");
  }
});
