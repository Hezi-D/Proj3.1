
var coinSelectForReportArray = [];



$(function () {

    $("#HomeBtn").on("click", function () {

        $.ajax({
            method: "GET",
            url: "https://api.coingecko.com/api/v3/coins/list",

            beforeSend: function () {

                $(".loading").show();
            },

            success: function (response) {
                $(".loading").hide();
                console.log(response);
                draw(response);

            },
            error: function (error) {
                console.log(error)
            }
        })
    })


    $("#ReportBtn").on("click", function () {
        drawReport();
        console.log("test");
    });



    //------------------------------------------------------



})


function draw(obj) {

    var mainRow = $("#coinCardsDiv");
    mainRow.innerHTML = "";

    for (let index = 0; index < 30; index++) {

        var checkBox = $("<label></label>");
        var input = $("<input></input>");
        var span = $("<span></span>");

        checkBox.attr("class", "switch");
        input.attr("type", "checkbox");
        span.attr("class", "slider round");
        checkBox.attr("id", index);

        checkBox.append(input, span);

        checkBox.on("change", function () {




            coinsForReport(this.id);



        });

        var infoBtn = $("<button></button>");

        infoBtn.attr("id", "infoBtn");
        infoBtn.attr("name", index);
        infoBtn.text("More Info");

        infoBtn.on("click", function () {
            getInfo(this.parentElement.id, this.name);

        })

        var title = $("<h2></h2>").text(obj[index].symbol);
        var text = $("<h5></h5>").text(obj[index].name);
        var infoText = $("<h5></h5>");
        var loaderPlace = $('<div><div/>');
        loaderPlace.attr("class", "loading");
        loaderPlace.attr("id", "loading" + index).hide();
        var loadingBar;

        var cardBody = $("<div></div>");
        var curDiv = $("<div></div>");

        curDiv.attr("class", "card");

        curDiv.attr("id", obj[index].symbol);
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
}

function getInfo(id, number) {

    console.log(number);

    $.ajax({
        method: "GET",
        url: "https://api.coingecko.com/api/v3/coins/" + id,

        beforeSend: function () {

            $('#loading' + number).show();
            console.log(id);
        },

        success: function (response) {


            var coinImage = $('<img />', {
                src: response.image.small,
            });

            var USDheader = $("<h4></h4>").text("USD");
            var coinVsUSD = $("<h5></h5>").text(response.market_data.current_price.usd + " $");
            var EURheader = $("<h4></h4>").text("EUR");
            var coinVsEUR = $("<h5></h5>").text(response.market_data.current_price.eur + " €");
            var ILSheader = $("<h4></h4>").text("ILS");
            var coinVsILS = $("<h5></h5>").text(response.market_data.current_price.ils + " NIS");

            $("#" + id).find(".card-info").empty();
            $("#" + id).find(".card-info").append(coinImage);
            $("#" + id).find(".card-info").append(USDheader, coinVsUSD, EURheader, coinVsEUR, ILSheader, coinVsILS);

        },
        error: function (error) {
            console.log(error)
        },

        complete: function () {
            $('#loading' + number).hide();
            $("#" + id).find(".card-info").slideToggle('slow');
        },

    });

}

function coinsForReport(id) {

    if (coinSelectForReportArray.length >= 5) {

        //alert("no more place");
        drawSelectedCoinsIntoModal();
    }
    else {

        var isExist = false;

        for (let index = 0; index < coinSelectForReportArray.length; index++) {
            if (coinSelectForReportArray[index] == id) {
                coinSelectForReportArray.splice(index, 1);
                isExist = true;
                break;
            }
        }

        if (isExist == false) {
            coinSelectForReportArray.push(id);

        }

    }

    console.log(coinSelectForReportArray);
}

function drawReport() {

    var mainRow = $("#coinCardsDiv");
    mainRow.infoText = "test";
}


function drawSelectedCoinsIntoModal() {

    for (let index = 0; index < coinSelectForReportArray.length; index++) {
        var selectedCoinBtn = $("<button></button>");
        selectedCoinBtn.attr("id", "infoBtn");
        selectedCoinBtn.text(coinSelectForReportArray.index.value);
        $('.modal-body').append(selectedCoinBtn);
    }
}

















