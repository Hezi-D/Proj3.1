var countReq = 0;
var graphHistory = new Array(5);

for (var i = 0; i < graphHistory.length; i++) {
  graphHistory[i] = new Array();
}

function drawTheGraph(response) {
  console.log("test");
  var allRates = Object.values(response);
  console.log(allRates);
  var allCoinsName = Object.keys(response);
  console.log(allCoinsName);

  var mainRow = $("#mainDiv");
  mainRow.empty();

  var curTime = new Date();
  var curTimeInNumber = curTime.getTime();

  var options = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Units Sold VS Profit"
    },
    subtitles: [
      {
        text: "Click Legend to Hide or Unhide Data Series"
      }
    ],
    axisX: {
      title: "States"
    },
    axisY: {
      title: "Units Sold",
      titleFontColor: "#4F81BC",
      lineColor: "#4F81BC",
      labelFontColor: "#4F81BC",
      tickColor: "#4F81BC",
      includeZero: false
    },
    // axisY2: {
    //     title: "Profit in USD",
    //     titleFontColor: "#C0504E",
    //     lineColor: "#C0504E",
    //     labelFontColor: "#C0504E",
    //     tickColor: "#C0504E",
    //     includeZero: false
    // },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: "pointer",
      itemclick: toggleDataSeries
    },
    data: [
      {
        type: "spline",
        name: allCoinsName[0],
        showInLegend: true,
        xValueFormatString: "MMM YYYY",
        yValueFormatString: "#,##0 Units",
        dataPoints: []
      },
      {
        type: "spline",
        name: allCoinsName[1],
        axisYType: "secondary",
        showInLegend: true,
        xValueFormatString: "MMM YYYY",
        yValueFormatString: "#,##0 Units",
        dataPoints: []
      },
      {
        type: "spline",
        name: allCoinsName[2],
        axisYType: "secondary",
        showInLegend: true,
        xValueFormatString: "MMM YYYY",
        yValueFormatString: "#,##0 Units",
        dataPoints: []
      },
      {
        type: "spline",
        name: allCoinsName[3],
        axisYType: "secondary",
        showInLegend: true,
        xValueFormatString: "MMM YYYY",
        yValueFormatString: "#,##0 Units",
        dataPoints: []
      },
      {
        type: "spline",
        name: allCoinsName[4],
        axisYType: "secondary",
        showInLegend: true,
        xValueFormatString: "MMM YYYY",
        yValueFormatString: "#,##0 Units",
        dataPoints: []
      }
    ]
  };

  for (let ind = 0; ind < allRates.length; ind++) {
    graphHistory[ind].push({ x: new Date(curTimeInNumber), y: allRates[ind] });
  }

  for (let index = 0; index < options.data.length; index++) {
    for (
      let graphIndex = 0;
      graphIndex < graphHistory[index].length;
      graphIndex++
    ) {
      options.data[index].dataPoints.push(graphHistory[index][graphIndex]);
    }
  }

  console.log(options);

  $("#chartContainer").CanvasJSChart(options);

  function toggleDataSeries(e) {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    e.chart.render();
  }
}
