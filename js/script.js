$(document).ready(function() {
    let clickImg, searchCells;
    let row = 3, column = 4;

    $("#start").click(function () {
        $("#box_cell").empty();
        let k = 0;

        for (let i = 0; i < row; i++) {
            for (let j = 0; j < column; j++) {
                let img = $("<img>").attr("data-location-x", j).attr("data-location-y", i).attr("data-id", k)
                    .click(clickImg);
                let random = Math.floor(Math.random() * 3);

                if (random == 0) {
                    img.attr("src", "images/blue.jpg").attr("data-color", "blue");
                } else if (random == 1) {
                    img.attr("src", "images/red.jpg").attr("data-color", "red");
                } else {
                    img.attr("src", "images/green.jpg").attr("data-color", "green");
                }

                $("#box_cell").append(img);
                k++;
            }
        }
    });

    clickImg = function () {
        let n = $(this).attr("data-id"),
            mainX = $(this).attr("data-location-x"),
            mainY = $(this).attr("data-location-y");

        //searchCells(n, max, row);
        //searchCells(n, max, column);
        searchCells(n, mainX, mainY);
    };

    searchCells = function (n, mainX, mainY) {
        let bingoCells = new Array(n);//$(n);
        let account = 0,
            end = +n + 1;
        let start = bingoCells[account];

        while(bingoCells[account] != end ) {
            start = bingoCells[account];
            mainX = $('img[data-id="' + start + '"]').attr("data-location-x");
            mainY = $('img[data-id="' + start + '"]').attr("data-location-y");

            let mainCell = $('img[data-location-x="' + mainX + '"][data-location-y="' + mainY + '"]').attr("data-color"),
                backCellX = $('img[data-location-x="' + (mainX - 1) + '"][data-location-y="' + mainY + '"]')
                    .attr("data-color"),
                nextCellX = $('img[data-location-x="' + (+mainX + 1) + '"][data-location-y="' + mainY + '"]')
                    .attr("data-color"),
                backCellY = $('img[data-location-x="' + mainX + '"][data-location-y="' + (mainY - 1) + '"]')
                    .attr("data-color"),
                nextCellY = $('img[data-location-x="' + mainX + '"][data-location-y="' + (+mainY + 1) + '"]')
                    .attr("data-color");

            let leftCellId = $('img[data-location-x="' + (mainX - 1) + '"][data-location-y="' + mainY + '"]')
                    .attr("data-id"),
                rightCellId = $('img[data-location-x="' + (+mainX + 1) + '"][data-location-y="' + mainY + '"]')
                    .attr("data-id"),
                topCellId = $('img[data-location-x="' + mainX + '"][data-location-y="' + (mainY - 1) + '"]')
                    .attr("data-id"),
                buttomCellId = $('img[data-location-x="' + mainX + '"][data-location-y="' + (+mainY + 1) + '"]')
                    .attr("data-id");

            if (mainCell == backCellX) {
                bingoCells.push(leftCellId);

                bingoCells = bingoCells.filter(function (item, pos) {
                    return bingoCells.indexOf(item) == pos;
                });

                console.log(bingoCells);
                console.log("BingoLeft");
            }
            if (mainCell == nextCellX) {
                bingoCells.push(rightCellId);

                bingoCells = bingoCells.filter(function (item, pos) {
                    return bingoCells.indexOf(item) == pos;
                });

                console.log(bingoCells);
                console.log("BingoRight");
            }
            if (mainCell == backCellY) {
                bingoCells.push(topCellId);

                bingoCells = bingoCells.filter(function (item, pos) {
                    return bingoCells.indexOf(item) == pos;
                });

                console.log(bingoCells);
                console.log("BingoTop");
            }
            if (mainCell == nextCellY) {
                bingoCells.push(buttomCellId);

                bingoCells = bingoCells.filter(function (item, pos) {
                    return bingoCells.indexOf(item) == pos;
                });

                console.log(bingoCells);
                console.log("BingoButtom");
            }

            // bingoCells = bingoCells.filter(function (item, pos) {
            //     return bingoCells.indexOf(item) == pos;
            // });

            account++;
            end = bingoCells[bingoCells.length - 1];
            console.log(bingoCells[account]);
            console.log(end);
       }
    };
});

