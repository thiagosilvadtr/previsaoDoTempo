import { infoSem } from "./apis.js";

/*-----------receive array of temperature data-------------------*/
export function infoSemanal(array) {
  const meses = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  const sem = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sabado",
    "Domingo",
  ];

  $("#cards").html("");

  /*----------collecting data to display--------------------*/
  for (var a = 1; a < array.length; a++) {
    var max = array[a].temp.max.toFixed(0);
    var min = array[a].temp.min.toFixed(0);
    var desc = array[a].weather[0].description;
    var inconUrl = array[a].weather[0].icon;
    var icon = `http://openweathermap.org/img/w/${inconUrl}.png`;
    var ts = array[a].dt;

    /*-----------stores the days of the week-------------------*/
    var dt = new Date(ts * 1000);
    var d = dt.getDate();
    var m = dt.getMonth() + 1;
    var diaSemana = sem[dt.getDay()];

    /*-------------display temperature data for the next days---html code via js----------*/
    var htmlArray = '<div class="card">';
    htmlArray += `<h4>${diaSemana} ${d}/${m}</h4>`;
    htmlArray += "<h4>Min / Max</h4>";
    htmlArray += "<div>";
    htmlArray += `<span class="card-min">${min}&deg </span>`;
    htmlArray += `<span class="card-max">/ ${max}&deg</span>`;
    htmlArray += "</div>";
    htmlArray += "<div>";
    htmlArray += `<img src="${icon}"/>`;
    htmlArray += "</div>";
    htmlArray += `<span class="desc">${desc}</span>`;
    htmlArray += "<div>";
    htmlArray += "</div>";
    htmlArray += "</div>";

    $("#cards").append(htmlArray);
  }
}
