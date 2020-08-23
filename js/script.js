$(document).ready(function () {
    var clickImg, searchCells;
    var row = 4, column = 5, sumBurn = 1, maxColors = 6, onlyMixing = 2, MovesEnd = 50;
    var gamePoints = 0, gamePointsWin = 3000;

    var box_check = $("<div>").attr("class", "box_check"),
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
        $(".box_gamesOver").css({'display': 'none'});
        let k = 0;

        for (let i = 0; i < row; i++) {
            for (let j = 0; j < column; j++) {
                let img = $("<img>").attr("data-location-x", j).attr("data-location-y", i).attr("data-id", k)
                    .click(clickImg);
                randomColor(img);

                $("#box_cell").append(img);
                k++;
            }
        }
        displayСheckSomeCells();
        displayMixingCells(onlyMixing);
        displayMovesEnd();
        displaGamesPoints(0);
    });

    displayGamesWin = function () {
        $(".box_gamesOver").css({'display': 'block'});
        $(".text_gamesOver").html('Game Win');
    };

    displayGamesOver = function () {
        $(".box_gamesOver").css({'display': 'block'});
        $(".text_gamesOver").html('Game Over ');
    };

    displayСheckSomeCells = function () {
        // let bingoMax = checkSomeCells();

        let bingoMax = checkSomeCells2();

        if (bingoMax.length == 0) {
            if (onlyMixing == 1) {
                onlyMixing -= 1;
                console.log("GamesOver");
                let GamesOver = displayGamesOver();
            } else {
                onlyMixing -= 1;

                mixingCells();
                displayMixingCells();
                bingoMax = displayСheckSomeCells();
            }
        }

        let bingoMaxBox = bingoMax.length;
        $(".box_check").html('<p>Доступных тайтлов: ' + bingoMaxBox + '</p>');

        return bingoMax;
    };

    displayMixingCells = function () {
        $(".box_mixing").html('<p>Осталось перемешать: ' + onlyMixing + '</p>');
    };

    displayMovesEnd = function () {
        $(".box_moves").html('<p>Осталось ходов: ' + MovesEnd + '</p>');
    };

    displaGamesPoints = function (maxCells) {
        gamePoints += maxCells * maxCells * 10;
        $(".box_points").html('<p>Осталось очков: ' + gamePoints + '</p>');

        if (gamePoints >= gamePointsWin) {
            displayGamesWin();
        }
    };

    checkSomeCells = function () {      //функция отключена
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
            // let newOnly = onlyMixing;

            if (onlyMixing == 1) {
                let GamesOver = displayGamesOver();

            } else {
                let newBoxCells = mixingCells();
                onlyMixing -= 1;
                let newOnlyBox = displayMixingCells();          // ошибка долго думает
                let displayСheck = displayСheckSomeCells();
            }


        }

        return bingoMaxCells;
    };

    checkSomeCells2 = function () {
        let maxCells = row * column;
        let bingoMaxCells = [];

        for (let i = 0; i < maxCells; i++) {
            let searchBingo = searchCells(i);

            searchBingo.sort();

            if (searchBingo.length > 1) {
                bingoMaxCells.push(searchBingo);
            }
        }

        return unique(bingoMaxCells);
    };

    function unique(arr) {
        let result = [];

        for (let str of arr) {
            let isUnique = true;

            for (let i = 0; i < result.length; i++) {
                if (result[i][0] == str[0]) {
                    isUnique = false;
                    break;
                }
            }

            if (isUnique) {
                result.push(str);
            }
        }
        //
        // if (result.length == 0) {
        //     if (onlyMixing == 1) {
        //         let GamesOver = displayGamesOver();
        //     } else {
        //         let newBoxCells = mixingCells();
        //         onlyMixing -= 1;
        //         let newOnlyBox = displayMixingCells();
        //         let displayСheck = displayСheckSomeCells();
        //     }
        // }

        return result;
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
            nColor = $(this).attr("data-color"),
            maxCells = row * column;

        let arCells = searchCells(n);
        // console.log(arCells);
        deletCells(arCells, nColor);
        let newCells = addCells(maxCells);

        let displayСheck = displayСheckSomeCells();
        // searchCells;
        // console.log(arCells);
    };

    searchCells = function (n) {
        let bingoCells = [parseInt(n)];//$(n);
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
                bingoCells.push(parseInt(leftCellId));
            }

            if (mainCell == nextCellX) {
                bingoCells.push(parseInt(rightCellId));
            }

            if (mainCell == backCellY) {
                bingoCells.push(parseInt(topCellId));
            }

            if (mainCell == nextCellY) {
                bingoCells.push(parseInt(buttomCellId));
            }

            bingoCells = bingoCells.filter(function (item, pos) {
                return bingoCells.indexOf(item) == pos;
            });

            account++;
        }

        return bingoCells;
    };

    function deletCells(arCells, nColor) {
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

            if (MovesEnd == 1) {
                MovesEnd -= 1;
                displayMovesEnd();
                displayGamesOver();
            } else {
                MovesEnd -= 1;
                displayMovesEnd();
            }
            displaGamesPoints(maxCells);

            // console.log(nColor);
            // return deletCell;
        } else {
            let idCell = $('#box_cell img[data-id="' + arCells[0] + '"]');
            idCell.addClass('shake')
            setTimeout(() => {
                idCell.removeClass('shake');
            }, 700);
            console.log("--------");
            console.log(idCell);
        }
    };

    function addCells(maxCells) {
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

