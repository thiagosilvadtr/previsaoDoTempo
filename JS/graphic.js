import { infoSem } from "./apis.js";

/*-------------temperature chart per hour-----------------*/
export function graph(hours, temp) {
  /*------receives time and temperature as parameter--------*/
  Highcharts.chart("charts", {
    chart: {
      type: "line",
    },
    title: {
      text: "Indice de temperatura por hora",
    },
    xAxis: {
      categories: hours,
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
        },
        enableMouseTracking: false,
      },
    },
    series: [
      {
        showInLegend: false,
        data: temp,
      },
    ],
  });
}
