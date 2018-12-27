var intreval;

$("#HomeBtn").on("click", function() {
  //Stop the graph interval
  clearInterval(intreval);

  //Clearr the selectedCoinsArray

  $.ajax({
    method: "GET",
    url: "https://api.coingecko.com/api/v3/coins/list",
    beforeSend: function() {
      $(".loading").show();
    },
    success: function(response) {
      console.log(response);

      coinsBasicData = response;

      //Insert index to basic data
      var indexInData = "index";

      for (let index = 0; index < coinsBasicData.length; index++) {
        coinsBasicData[index][indexInData]= index;
        
      }

      var responseString = JSON.stringify(response);
      localStorage.setItem("allCoinsData", responseString);

      draw(response);

      $(".loading").hide();
    },
    error: function(error) {
      console.log(error);
    }
  });
});

$("#ReportBtn").on("click", function() {
  intreval = setInterval(function() {
    getSelectedCoinsParam();
  }, 5000);
});

function getSelectedCoinsParam() {
  $.ajax({
    method: "GET",
    url:
      "https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=" +
      coinSelectForReportArray[0].symbol.toUpperCase() +
      "," +
      coinSelectForReportArray[1].symbol.toUpperCase() +
      "," +
      coinSelectForReportArray[2].symbol.toUpperCase() +
      "," +
      coinSelectForReportArray[3].symbol.toUpperCase() +
      "," +
      coinSelectForReportArray[4].symbol.toUpperCase() +
      "&extraParams=your_app_name",
    beforeSend: function() {
      $(".loading").show();
    },
    success: function(response) {
      console.log(response);

      drawTheGraph(response);

      $(".loading").hide();
    },
    error: function(error) {
      console.log(error);
    }
  });
}

function getInfo(id, number) {
  console.log(number);

  $.ajax({
    method: "GET",
    url: "https://api.coingecko.com/api/v3/coins/" + id,
    beforeSend: function() {
      $("#loading" + number).show();
      console.log(id);
    },
    success: function(response) {
      var coinImage = $("<img />", {
        src: response.image.small
      });
      var USDheader = $("<h4></h4>").text("USD");
      var coinVsUSD = $("<h5></h5>").text(
        response.market_data.current_price.usd + " $"
      );
      var EURheader = $("<h4></h4>").text("EUR");
      var coinVsEUR = $("<h5></h5>").text(
        response.market_data.current_price.eur + " €"
      );
      var ILSheader = $("<h4></h4>").text("ILS");
      var coinVsILS = $("<h5></h5>").text(
        response.market_data.current_price.ils + " NIS"
      );

      $("#" + id)
        .find(".card-info")
        .empty();
      $("#" + id)
        .find(".card-info")
        .append(coinImage);
      $("#" + id)
        .find(".card-info")
        .append(
          USDheader,
          coinVsUSD,
          EURheader,
          coinVsEUR,
          ILSheader,
          coinVsILS
        );
    },
    error: function(error) {
      console.log(error);
    },
    complete: function() {
      $("#" + id)
        .find(".card-info")
        .slideToggle("slow");
      $("#loading" + number).hide();
    }
  });
}
