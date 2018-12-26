////////
// Draw
function draw(obj) {
  var doc = document;
  var mainRow = $("#mainDiv");
  mainRow.empty();
  mainRow.hide();

  for (let index = 0; index < 15; index++) {
    var checkBox = $("<label></label>");
    var input = $("<input></input>");
    var span = $("<span></span>");

    checkBox.attr("class", "switch");
    checkBox.attr("id", index);
    checkBox.attr("name", index);

    input.attr("type", "checkbox");
    input.attr("name", "checkboxName" + index);

    span.attr("class", "slider round");

    checkBox.append(input, span);

    //Define checkBox Click event
    checkBox.on("change", function() {
      console.log(this.id);
      doc.coinsForReport(this.id);
    });

    //Define info button
    var infoBtn = $("<button></button>");
    infoBtn.attr("id", "infoBtn");
    infoBtn.attr("name", index);
    infoBtn.text("More Info");

    //Define info button click event
    infoBtn.on("click", function() {
      var curTime = new Date();
      var curTimeInNumber = curTime.getTime();

      var checkIfTimePass = doc.twoMinutesPassCheck(
        coinsBasicData[this.name].time,
        curTimeInNumber
      );

      if (checkIfTimePass) {
        getInfo(this.parentElement.id, this.name);
      }

      coinsBasicData[this.name].time = curTimeInNumber;
    });

    var title = $("<h2></h2>").text(obj[index].symbol);
    var text = $("<h5></h5>").text(obj[index].name);
    var infoText = $("<h5></h5>");
    var loaderPlace = $("<div><div/>");
    loaderPlace.attr("class", "loading");
    loaderPlace.attr("id", "loading" + index).hide();
    var loadingBar;

    var cardBody = $("<div></div>");
    var curDiv = $("<div></div>");

    curDiv.attr("class", "card");

    curDiv.attr("id", obj[index].id);
    cardBody.attr("class", "card-body");
    title.attr("class", "card-title");
    text.attr("class", "card-title");
    infoText.attr("class", "card-info");

    for (let index = 0; index < 4; index++) {
      loadingBar = $('<div class="loading-bar"/>');
      loaderPlace.append(loadingBar);
    }

    //loaderPlace.hide();
    $(".card-info").hide();

    cardBody.append(checkBox);
    cardBody.append(title);
    cardBody.append(text);
    curDiv.append(cardBody);
    curDiv.append(loaderPlace);
    curDiv.append(infoBtn);
    curDiv.append(infoText);

    mainRow.append(curDiv);
  }

  mainRow.slideDown("slow");
}
