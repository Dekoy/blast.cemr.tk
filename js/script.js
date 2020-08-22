$(document).ready(function () {
    let clickImg, searchCells;
    let row = 4, column = 5, sumBurn = 1, maxColors = 6, onlyMixing = 3, MovesEnd = 20;

    let box_check = $("<div>").attr("class", "box_check"),
        box_mixing = $("<div>").attr("class", "box_mixing"),
        box_moves = $("<div>").attr("class", "box_moves"),
        box_points = $("<div>").attr("class", "box_points");

    $("#box_status").append(box_check);
    $("#box_status").append(box_mixing);
    $("#box_status").append(box_moves);
    $("#box_status").append(box_points);

    $("#box_cell").css({'width': column * 100});


    $("#start").click(function () {
        $("#box_cell").empty();
        let k = 0;

        for (let i = 0; i < row; i++) {
            for (let j = 0; j < column; j++) {
                let img = $("<img>").attr("data-location-x", j).attr("data-location-y", i).attr("data-id", k)
                    .click(clickImg);
                let random = randomColor(img);

                $("#box_cell").append(img);
                k++;
            }
        }
        let displayСheck = displayСheckSomeCells();
        let displayMixing = displayMixingCells(onlyMixing);

    });

    displayСheckSomeCells = function () {
        let bingoMax = checkSomeCells();
        let bingoMaxBox = bingoMax.length;
        $(".box_check").html('<p>Доступных тайтлов: ' + bingoMaxBox + '</p>');
    };

    displayMixingCells = function (newOnlyMixing) {
        $(".box_mixing").html('<p>Осталось перемешать: ' + newOnlyMixing + '</p>');
    };

    displayMovesEnd = function(){

    };

    displaGamesPoints = function(){

    };

    checkSomeCells = function () {
        let maxCells = row * column;
        let bingoMaxCells = [];

        for (let i = 0; i < maxCells; i++) {
            let searchBingo = searchCells(i);
            searchBingo.splice(0, 1);
            searchBingo.sort();
            let maxCells = searchBingo.length;

            if (maxCells > sumBurn) {
                bingoMaxCells.push(searchBingo);
            }

            let j = bingoMaxCells.length;

            if (j > 1) {
                for (let l = 0; l < j; l++) {
                    for (let k = 0; k < j; k++) {
                        if (l != k) {
                            let doubl1 = parseInt(bingoMaxCells[l]),
                                doubl2 = parseInt(bingoMaxCells[k]);

                            if (doubl1 == doubl2) {
                                bingoMaxCells.splice((l), 1);
                            }
                        }
                    }
                }
            }
        }

        if (bingoMaxCells.length == 0) {
            let newOnly = onlyMixing;

            if (newOnly == 0) {
                console.log("Games end!")
            } else {
                let newBoxCells = mixingCells();
                //let newOnlyBox = displayMixingCells(newOnly); // ошибка долго думает
                let displayСheck = displayСheckSomeCells();
                console.log("-------------");
                console.log(newOnly);
            }
            console.log(parseInt(onlyMixing));
        }

        return bingoMaxCells;
    };

    mixingCells = function () {

        let maxCells = row * column;
        let arrCellsId = [];

        while (arrCellsId.length < maxCells) {
            let n = Math.floor(Math.random() * maxCells);
            if (arrCellsId.indexOf(n) == -1) {
                arrCellsId.push(n);
            }
        }
        let oldCellsSrc = [],
            oldCellsColor = [];

        for (let i = 0; i < maxCells; i++) {
            let oldCellSrc = $('img[data-id="' + i + '"]').attr("src"),
                oldCellColor = $('img[data-id="' + i + '"]').attr("data-color");

            oldCellsSrc.push(oldCellSrc);
            oldCellsColor.push(oldCellColor);
        }

        for (let i = 0; i < maxCells; i++) {
            let newCellsId = arrCellsId[i],
                newCellSrc = oldCellsSrc[i],
                newCellColor = oldCellsColor[i];
            let img = $('img[data-id="' + newCellsId + '"]');

            // img = img.attr("src", srcCell).attr("data-color", colorCell);

            img = img.attr("src", newCellSrc).attr("data-color", newCellColor);

            $("#box_cell").append(img);
        }
        let $sort = $('#box_cell');

        $sort.find('img').sort(function (a, b) {
            return +a.dataset.id - +b.dataset.id;
        })
            .appendTo($sort);
    };

    randomColor = function (img) {
        let random = Math.floor(Math.random() * maxColors);

        if (random == 0) {
            img.attr("src", "images/blue.jpg").attr("data-color", "blue");
        } else if (random == 1) {
            img.attr("src", "images/red.jpg").attr("data-color", "red");
        } else if (random == 2) {
            img.attr("src", "images/yellow.jpg").attr("data-color", "yellow");
        } else if (random == 3) {
            img.attr("src", "images/pink.jpg").attr("data-color", "pink");
        } else if (random == 4) {
            img.attr("src", "images/azure.jpg").attr("data-color", "azure");
        } else {
            img.attr("src", "images/green.jpg").attr("data-color", "green");
        }
    };

    clickImg = function () {
        let n = $(this).attr("data-id"),
            maxCells = row * column;

        let arCells = searchCells(n);
        let changeCells = deletCells(arCells);
        let newCells = addCells(changeCells, maxCells);

        let displayСheck = displayСheckSomeCells();

        // searchCells;
        // console.log(arCells);
    };

    searchCells = function (n) {
        let bingoCells = [n];//$(n);
        let account = 0;
        let start = bingoCells[account];

        while (bingoCells[account] != null) {
            start = bingoCells[account];
            let mainX = $('img[data-id="' + start + '"]').attr("data-location-x"),
                mainY = $('img[data-id="' + start + '"]').attr("data-location-y");

            let mainCell = $('img[data-location-x="' + mainX + '"][data-location-y="' + mainY + '"]')
                    .attr("data-color"),
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
            }

            if (mainCell == nextCellX) {
                bingoCells.push(rightCellId);
            }

            if (mainCell == backCellY) {
                bingoCells.push(topCellId);
            }

            if (mainCell == nextCellY) {
                bingoCells.push(buttomCellId);
            }

            bingoCells = bingoCells.filter(function (item, pos) {
                return bingoCells.indexOf(item) == pos;
            });

            account++;
        }

        return bingoCells;
    };

    function deletCells(arCells) {
        let maxCells = arCells.length;

        if (maxCells > sumBurn) {
            for (let i = 0; i < maxCells; i++) {
                let start = arCells[i];

                let deletCell = $('img[data-id="' + start + '"]').attr("src", "images/null.jpg")
                    .attr("data-color", "null");
                $("#box_cell").append(deletCell);
            }
            let $sort = $('#box_cell');

            $sort.find('img').sort(function (a, b) {
                return +a.dataset.id - +b.dataset.id;
            })
                .appendTo($sort);

            // console.log(maxCells);
            // return deletCell;
        }
    };

    function addCells(deletCells, maxCells) {
        let bool = false;

        while (bool == false) {
            bool = true;
            for (let i = 0; i < maxCells; i++) {
                let check = $('img[data-id="' + i + '"]').attr("data-color");

                if (check == "null") {
                    let img = $('img[data-id="' + i + '"]'),
                        topCellX = $('img[data-id="' + i + '"]').attr("data-location-x"),
                        topCellY = $('img[data-id="' + i + '"]').attr("data-location-y") - 1;

                    let topCell = $('img[data-location-x="' + topCellX + '"][data-location-y="' + topCellY + '"]')
                        .attr("data-id");

                    let srcCell = $('img[data-id="' + topCell + '"]').attr("src"),
                        colorCell = $('img[data-id="' + topCell + '"]').attr("data-color");


                    if (topCellY >= 0) {
                        img = img.attr("src", srcCell).attr("data-color", colorCell);

                        $("#box_cell").append(img);

                        img = $('img[data-id="' + topCell + '"]').attr("src", "images/null.jpg")
                            .attr("data-color", "null");

                    } else {
                        let random = randomColor(img);
                    }

                    $("#box_cell").append(img);

                    let $sort = $('#box_cell');

                    $sort.find('img').sort(function (a, b) {
                        return +a.dataset.id - +b.dataset.id;
                    })
                        .appendTo($sort);

                    // console.log(topCellY);

                    bool = false;
                }

            }
        }
    };

});

