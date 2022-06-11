// define all the input boxes from the webpage
const mileIn = document.getElementById("mileInput");
const peopleIn = document.getElementById("peopleIn");
const calcBtn = document.getElementById("calcBtn");
const dieselCheck = document.getElementById("dieselCheck");
const resultBox = document.getElementById("result");

function calcualte() {

    // get inputs
    
    var miles = parseInt(mileIn.value);
    if (isNaN(miles)) {
        miles = 0;
    }
    var people = parseInt(peopleIn.value);
    if (isNaN(people)) {
        people = 1;
    }
    var isDiesel = dieselCheck.checked;

    // perform calculations

    // $3 per 5 miles for first 15
    // $1.5 per 5 miles after 15
    // 0-6 miles = $3
    // 6-11 miles = $6
    // 11-16 miles = $9
    // 16-21 miles = $10.5
    // 21-26 miles = $12
    // ...

    // round the mile count
    var roundedMiles = (Math.floor((miles - 1) / 5) + 1) * 5;
    if (roundedMiles == 0) {
        roundedMiles = 5;
    } else if (roundedMiles < 0) {
        resultBox.value = "Error";
        return;
    }

    // calculate price
    var totalGasPrice = 0;
    if (roundedMiles <= 15) {
        // $3 per 5 miles for first 15
        totalGasPrice = roundedMiles / 5 * 3;
    } else {
        // start with the $9 for the first 15
        // (because $3 per 5 miles for first 15)
        // and then add $1.5 per each 5 after
        totalGasPrice = 9 + (roundedMiles - 15) / 5 * 1.5;
    }

    // take into account an extra $2 for diesel
    if (isDiesel) {
        totalGasPrice += 2;
    }
    // display the result
    resultBox.value = "$" + (totalGasPrice / people).toFixed(2);
}

calcBtn.addEventListener("click", calcualte);