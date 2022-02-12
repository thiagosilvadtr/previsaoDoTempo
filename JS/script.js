import { currentTime } from "./apis.js";

/*------------------------------*/
export var obj = {
  estado: " ",
  pais: " ",
  temperatura: " ",
  min: " ",
  max: " ",
  txt_clima: " ",
  icone: "",
};

/*------------displays current temperature data------------------*/
export function tempNow(estado, pais, temperatura, min, max, txt_clima, icone) {
  $("#local").text(`${estado}, ${pais}`);
  $("#temp > span").html(`${String(temperatura)}&deg`);
  $("#min").html(`${String(min)}&deg`);
  $("#max").html(`${String(max)}&deg`);
  $("#tempag").text(txt_clima);
  $("#icone").attr("src", icone);
  $("#date").text(dta);
}

/*----------clock--------------------*/
var d = new Date();
var month = d.getMonth() + 1;
var day = d.getDate();
var year = d.getFullYear();

var dta = `${day}/${month}/${year}`;

var $clock = $("#clock");

/*-----------watch functionality-------------------*/
setInterval(function () {
  $clock.html(new Date().toLocaleString().substr(11, 8));
}, 1000);

/*-----------mobile menu display-------------------*/
$(document).ready(function () {
  $("#btn-mobile").click(function () {
    $(this).toggleClass("active");
    $("#header").toggleClass("active");
  });
});

/*-----------smooth scroll when click on navigation link-------------------*/
$(".link").click(function (e) {
  e.preventDefault();
  let link = $(this).attr("href"),
    targetOffset = $(link).offset().top,
    menu = $("nav").innerHeight();
  $("html, body").animate(
    {
      scrollTop: targetOffset - menu,
    },
    500
  );
});
