//Index
var coinsBasicData = {};
var coinSelectForReportArray = [];
var isCoinExistInArrayForReport;

var chooseToReplaceCoin = false;

$(document).ready(function() {
  $("#btnTest").on("click", function() {
    $("input[name='checkboxName1']").prop("checked", false);
  });

  this.twoMinutesPassCheck = function twoMinutesPassCheck(
    lastClickedTime,
    curTime
  ) {
    if (curTime - lastClickedTime > 5000 || lastClickedTime == null) {
      return true;
    } else {
      return false;
    }
  };

  this.coinsForReport = function(id) {
    isCoinExistInArrayForReport = false;

    if (coinSelectForReportArray.length < 5) {
      //If exist - Remove from array
      for (let index = 0; index < coinSelectForReportArray.length; index++) {
        if (coinSelectForReportArray[index] == coinsBasicData[id]) {
          coinSelectForReportArray.splice(index, 1);
          isCoinExistInArrayForReport = true;
          break;
        }
      }

      //If NOT exist - Add to array
      if (isCoinExistInArrayForReport == false) {
        coinSelectForReportArray.push(coinsBasicData[id]);
        
      }
    } else {
      for (let index = 0; index < coinSelectForReportArray.length; index++) {
        if (coinSelectForReportArray[index] == coinsBasicData[id]) {
          coinSelectForReportArray.splice(index, 1);
          isCoinExistInArrayForReport = true;
          break;
        }
      }

      if (isCoinExistInArrayForReport == false) {
        //coinSelectForReportArray.push(coinsBasicData[id]);
        drawSelectedCoinsIntoModal(id);
      }
    }
    console.log(coinSelectForReportArray);
  };

  function drawSelectedCoinsIntoModal(sixCoinForExchangeId) {
    //Clear the Modal
    $(".modal-body").empty();

    //Draw the modal
    for (let index = 0; index < coinSelectForReportArray.length; index++) {
      var selectedCoinBtn = $("<button></button>");
      selectedCoinBtn.attr("id", coinSelectForReportArray[index].index);

      selectedCoinBtn.attr("name", coinSelectForReportArray[index].symbol);
      selectedCoinBtn.attr("class", "btn btn-primary");
      selectedCoinBtn.text(coinSelectForReportArray[index].name);

      //Define the buttons event
      selectedCoinBtn.on("click", function() {
        replaceSelectedCoin(this.id, sixCoinForExchangeId);
        chooseToReplaceCoin = true;
      });

      $(".modal-body").append(selectedCoinBtn);
    }

    //Draw the six coin Buttoon
    //Clear the six coin button
    $("#sixCoinToReplace").empty();
    var sixCoinBtn = $("<button></button>");
    sixCoinBtn.attr("class", "btn btn-danger");
    sixCoinBtn.text(coinsBasicData[sixCoinForExchangeId].name);
    $("#sixCoinToReplace").append(sixCoinBtn);

    //Define th modal close button event
    noReplaceCoin(sixCoinForExchangeId);

    $("#myModal").modal("show");
  }

  function noReplaceCoin(sixCoinNotAdd) {
    $("#modal-close-btn").on("click", function() {
      if (!chooseToReplaceCoin) {
        $("input[name='checkboxName" + sixCoinNotAdd + "']").prop(
          "checked",
          false
        );
      }
    });
  }

  function replaceSelectedCoin(oldCoinId, newCoinId) {

    for (let index = 0; index < coinSelectForReportArray.length; index++) {
      if(coinSelectForReportArray[index].index == oldCoinId){
        coinSelectForReportArray[index] = coinsBasicData[newCoinId];
      }
    }  
    console.log(coinSelectForReportArray);
    $("input[name='checkboxName" + oldCoinId + "']").prop("checked", false);

    drawNewModal();
  }

  function drawNewModal() {
    $(".modal-body").empty();
    for (let index = 0; index < coinSelectForReportArray.length; index++) {
      var selectedCoinBtn = $("<button></button>");
      selectedCoinBtn.attr("id", index);
      selectedCoinBtn.attr("name", coinSelectForReportArray[index].symbol);
      selectedCoinBtn.attr("class", "btn btn-primary");
      selectedCoinBtn.text(coinSelectForReportArray[index].name);

      $(".modal-body").append(selectedCoinBtn);
    }

    console.log(coinSelectForReportArray);
  }
});
