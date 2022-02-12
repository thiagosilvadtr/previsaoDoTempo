import { currentTime } from "./apis.js";

export let InformationAdd = {
  humidade: "",
  vento: "",
  sens_termica: "",
  visibilidade: "",
  pressao: "",
  uv: "",
};

export function infoAdd(
  humidade,
  vento,
  sens_termica,
  visibilidade,
  pressao,
  uv
) {
  /*-----------displaying additional information via jquery functions-------------------*/
  $("#infoSpeed").text(`${vento} km/h`);
  $("#infoHumi").text(`${humidade}%`);
  $("#infoTerm").html(`${sens_termica}&deg`);
  $("#infoVisi").html(`${visibilidade} km`);
  $("#infoPressao").text(`${pressao} mb`);
}

/*----------displaying extra information--------------------*/
export function radiationUv(uv) {
  $("#infoUV").text(`${uv} de 10`);
}
