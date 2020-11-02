let rndInt = (min, max) => {

    // Generates random number based on min and max

    return Math.floor(Math.random() * (max - min)) + min;

}

let grid = document.getElementById("grid-container");
let arr = [];

let randomGeneratedArray = (res, amount, minInt, maxInt) => {

    // Generates unsorted array and creates the cells in the UI
    // Takes parameters for customisation, amount = amount of entries & min/max are the min and max ranges for the entries
    // Default values: amount = 100; minInt = -10; maxInt = 10
    // If statements to control the variables, column limits, new rows
    // Generates random number based on min/max
    // Creates new cell for UI and adjusts column/grid accordingly
    // Creates new object in array with the entries information

    arr = [];
    let count = 0;
    let row = 0;
    let column = 1;
    let transCount = 0;

    amount = (amount && amount <= 100 && amount) || 5;
    minInt = (minInt && minInt >= -1000 && minInt < maxInt && minInt) || -10;
    maxInt = (maxInt && maxInt <= 1000 && maxInt > minInt && maxInt) || 10;

    for (i = 0; i < amount; i++){

        if (count == 0){
            count++;     
            row++;
            column = 1;
        } else if (count == 9) {
            count = 0;
            column++;
        } else {
            count++;
            column++;
        }

        let randomInt = rndInt(minInt, maxInt);
        let cell = document.createElement("div");
        cell.innerHTML = randomInt;
        cell.style.opacity = "0";
        cell.style.transform = "scale(1.25)";
        grid.appendChild(cell);
        cell.style.gridColumn = column.toString();
        cell.style.gridRow = row.toString();
        cell.style.transition = ".25s";
        setTimeout( () => {
            cell.style.opacity = "1";
            cell.style.transform = "scale(1)";
        }, transCount);
        
        transCount = transCount + 50;

        arr.push({
            node: {
                num: randomInt, 
                cell: cell,
                column: column,
                row: row
            }
        });
    }
    
    setTimeout( () => {
        console.log('done!');
        res();
    }, transCount + 250);

}

let switchSpots = async (arr, c1, c2) => {

    // Swaps the two cells in the UI using transform and transition animation
    // Pauses for a second while transition is finishing
    // Switches the actual grid position of the cells and swaps the information in the node object
    // Now that they are in actual position it gets rid of the transformation and also changes transition to 0s to prevent cells from being animated
    // Timeout for a milisecond to give the cells a chance to get rid of their transformation then pause for 10 miliseconds to let the timeout finish its course, probably could have handled that last part a bit better

    let transTime = ".0625s";
    let sleepTime = 250;

    let c1Cell = c1.cell;
    let c2Cell = c2.cell;

    let c1Left = c1Cell.getBoundingClientRect().left;
    let c1Top = c1Cell.getBoundingClientRect().top;
    let c2Left = c2Cell.getBoundingClientRect().left;
    let c2Top = c2Cell.getBoundingClientRect().top;

    let c1LeftGoal = c2Left - c1Left;
    let c2LeftGoal = c1Left - c2Left;
    let c1TopGoal = c2Top - c1Top;
    let c2TopGoal = c1Top - c2Top;

    c1Cell.style.transition = transTime;
    c2Cell.style.transition = transTime;

    c1Cell.style.transform = "translate(" + c1LeftGoal + "px, " + c1TopGoal + "px)";
    c2Cell.style.transform = "translate(" + c2LeftGoal + "px, " + c2TopGoal + "px)";

    await sleep(sleepTime);

    c1Cell.style.gridColumn = c2.column.toString();
    c1Cell.style.gridRow = c2.row.toString();

    c2Cell.style.gridColumn = c1.column.toString();
    c2Cell.style.gridRow = c1.row.toString();
    
    let colPlaceHolder = c1.column;
    let rowPlaceHolder = c1.row;

    c1.column = c2.column;
    c1.row = c2.row;

    c2.column = colPlaceHolder;
    c2.row = rowPlaceHolder;
    
    c1Cell.style.transition = "0s";
    c2Cell.style.transition = "0s";

    c1Cell.style.transform = "translate(0px, 0px)";
    c2Cell.style.transform = "translate(0px, 0px)";

    let placeHolder = arr[v-1];
    arr[v-1] = arr[v];
    arr[v] = placeHolder;

   /* setTimeout(()=>{
        c1Cell.style.transition = ".25s";
        c2Cell.style.transition = ".25s";
    }, 50)*/

    await sleep(0);
    
    return;

}


let sleep = (delay) => {

    // Sets promise that is resolved after delay miliseconds

    return new Promise(resolve => setTimeout(resolve, delay));

}




let insertSort = async (amount, minInt, maxInt) => {

    // Iterate through the unsorted array
    // If number is less than the previous number then
    // Look through the previous numbers and swap accordingly
    // Once it runs into a number where the number is greater than the previous number then breal
    // Once done sorting print out all values

    let promise = new Promise( (res, rej) => {
        randomGeneratedArray(res, amount, minInt, maxInt);
    } );

    promise.then( async () => {
        for (i = 1; i < arr.length; i++){ 
            if (arr.length > 0 && arr[i].node.num < arr[i-1].node.num){ 
                for (v = i; v > 0; v--){ 
                    if (arr.length > 0 && arr[v].node.num < arr[v-1].node.num){ 
                        let currentNode = arr[v].node; 
                        let previousNode = arr[v-1].node;                   
                        await switchSpots(arr, currentNode, previousNode);
                    } else{
                        break;
                    }
                }
            }
        }
    
        let countTime = 0;
        for (i = 0; i < arr.length; i++){
            let cell = arr[i].node.cell;
            setTimeout(function(){
                cell.style.transition = "0.2s";
                cell.style.transform = "scale(1.1)";
                cell.style.border = "rgba(23, 245, 149, 0.913) solid 4px";
                setTimeout( function() {
                    cell.style.transform = "scale(1)";
                }, 200)
            }, countTime);
            countTime = countTime + 100;
        }
    } );
}

let clearGrid = () =>{
    for (i = 0; i < arr.length; i++){
        arr[i].node.cell.remove();
    }
    arr = [];
}

let minInt = document.getElementById("min-int-input");
let maxInt = document.getElementById("max-int-input");
let amount = document.getElementById("amount-input");

let algoButtons = document.getElementsByClassName("grid-nav-items");
let deBounce = true;

for (i = 0; i < algoButtons.length; i++){
    algoButtons[i].addEventListener("click", (obj) => {
        if (deBounce) {
            deBounce = false;
            clearGrid();
            setTimeout(() => {
                deBounce = true;
                insertSort(parseInt(amount.value), parseInt(minInt.value), parseInt(maxInt.value));
            }, 1000);
        }
    });
}

function hideSmallNavBar(e){
    if (!document.getElementById("small-nav-bar-items").contains(e.target)) {
        document.getElementById("menu-hamburger").style.visibility = "visible"
        document.getElementById("small-nav-bar-items").style.opacity = "0";
        document.removeEventListener('mouseup', hideSmallNavBar);
    }
}

document.getElementById("menu-hamburger").addEventListener("click", () => {
    document.getElementById("menu-hamburger").style.visibility = "hidden"
    setTimeout(function(){
        document.getElementById("small-nav-bar-items").style.opacity = "1";
        document.addEventListener('mouseup', hideSmallNavBar);
    }, 10);
});
