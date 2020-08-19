let imgArray = new Array();
let k = 0;
window.onload=function() {
    for (let i = 0; i < 4; i++) {
        imgArray[i] = document.createElement("img");
        for (let j = 0; j < 3; j++) {
            imgArray[i][j] = document.createElement("img");
            let random = Math.floor(Math.random() * 3);
            if (random == 0) {
                imgArray[i][j].setAttribute("src", "images/blue.jpg");
                imgArray[i][j].setAttribute("data-color", "blue");
            } else if (random == 1) {
                imgArray[i][j].setAttribute("src", "images/red.jpg");
                imgArray[i][j].setAttribute("data-color", "red");
            } else {
                imgArray[i][j].setAttribute("src", "images/green.jpg");
                imgArray[i][j].setAttribute("data-color", "green");
            }
            imgArray[i][j].setAttribute("data-location-x", i);
            imgArray[i][j].setAttribute("data-location-y", j);
            imgArray[i][j].setAttribute("data-id", k);
            document.getElementById("box_cell").appendChild(imgArray[i][j]);
            k++;
            console.log(random);
        }
    }
    console.log(imgArray);
}
$("#start").click(function() {
    console.log("Ok");
});