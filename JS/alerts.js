/*------------getting data through the object------------------*/
export function alerts(info) {
  /*-----------object that receives the data-------------------*/
  var alertInf = {
    fonte: info[0].sender_name,
    event: info[0].event,
    start: info[0].start,
    end: info[0].end,
    description: info[0].description,
  };

  /*--------displaying data through jquery functions----------------------*/
  $("#informationSource").text(alertInf.fonte);
  $("#event").text(alertInf.event);
  $("#start").text(`${new Date(alertInf.start * 1000).getDate()}h`);
  $("#end").text(`${new Date(alertInf.end * 1000).getDate()}h`);
  $("#description").text(alertInf.description);
}
