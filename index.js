
$(function () {


    $("#HomeBtn").on("click", function () {

        $.ajax({
            method: "GET",
            url: "https://api.coingecko.com/api/v3/coins/list",

            success: function (response) {

                console.log(response);
                draw(response);

            },
            error: function (error) {
                console.log(error)
            }
        })
    })



})


function draw(obj) {

    var mainRow = $("#coinCardsDiv");
    mainRow.innerHTML = "";

    for (let index = 0; index < 10; index++) {

        var checkBox = $("<label></label>");
        var input = $("<input></input>");
        var span = $("<span></span>");

        checkBox.attr("class", "switch");
        input.attr("type", "checkbox");
        span.attr("class", "slider round");

        checkBox.append(input, span);

        var infoBtn = $("<button></button>");

        infoBtn.attr("id", "infoBtn");
        infoBtn.text("More Info");
        infoBtn.on("click", function () {

            console.log(this.parentElement.id);

            getInfo(this.parentElement.id);


        })

        var title = $("<h2></h2>").text(obj[index].symbol);
        var text = $("<h5></h5>").text(obj[index].name);
        var infoText = $("<h5></h5>");
        infoText.text("test");


        var cardBody = $("<div></div>");
        var curDiv = $("<div></div>");

        curDiv.attr("class", "card");
        curDiv.attr("id", obj[index].id);
        cardBody.attr("class", "card-body");
        title.attr("class", "card-title");
        text.attr("class", "card-title");
        infoText.attr("class", "card-info");

        cardBody.append(checkBox);
        cardBody.append(title);
        cardBody.append(text);
        curDiv.append(cardBody);
        curDiv.append(infoBtn);
        curDiv.append(infoText);
        mainRow.append(curDiv);
    }




}

function getInfo(id) {

    $.ajax({
        method: "GET",
        url: "https://api.coingecko.com/api/v3/coins/" + id,

        success: function (response) {

            console.log(response);
            //$("this").find('.card-info').css("visibility", "visible");
            $("this").find('.card-info').attr("class", "show-info");
        },
        error: function (error) {
            console.log(error)
        }
    })
}













