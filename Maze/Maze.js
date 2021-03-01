var sideLength = 50;
var borderWidth = 2;

var gridX = 100;
var gridY = 100;

var startJ = -1;
var startI = 3;

var finishJ = 8;
var finishI = 7;

var currentJ = startJ;
var currentI = startI;

var currentX = gridX + (sideLength * startJ) + borderWidth;
var currentY = gridY + (sideLength * startI) + borderWidth;

var moveCount = 0;

var maze = [
    [7, 8, 8, 8, 13, 6, 7, 6],
    [11, 7, 6, 7, 6, 10, 9, 11],
    [10, 9, 11, 11, 8, 8, 6, 11],
    [6, 5, 12, 12, 6, 7, 9, 11],
    [11, 7, 8, 6, 11, 11, 2, 11],
    [10, 9, 2, 11, 3, 11, 10, 15],
    [7, 8, 9, 10, 6, 10, 6, 11],
    [10, 8, 8, 8, 12, 8, 9, 10]
]

function CloneNode(nodeID, newID, stack){

    var $cln = $(nodeID).clone(true);
    $cln.attr("id", newID);
    $cln.appendTo(stack);
    return $cln;
}

function DrawGrid(){

    for(var i = 0; i < maze.length; i++){

        for(var j = 0; j < maze[0].length; j++){

            var newID = "node" + i + j;
            var $cln =  CloneNode("#playerNode", newID, "body")

            var pX = gridX + (sideLength * j);
            var pY = gridY + (sideLength * i);

            $cln.removeClass();
            $cln.addClass("node" + maze[i][j]);
            //$cln.text(maze[i][j]);
            $cln.css({top: pY, left: pX});
        }
    }
}

function ArrowKeyPressed(event){

    if(event.keyCode === 37){ //LEFT

        if(AllowMove('L') === true){

            MovePalyer(0, -1);
        }
    }
    else if(event.keyCode === 38){ //UP

        if(AllowMove('U') === true){

            MovePalyer(-1, 0);
        }
    }
    else if(event.keyCode === 39){ //RIGHT
        
        if(AllowMove('R') === true){

            MovePalyer(0, 1);
        }
    }
    else if(event.keyCode === 40){ //DOWN
        
        if(AllowMove('D') === true){

            MovePalyer(1, 0);
        }
    }
}

function AllowMove(moveType)
{
    if(currentJ === startJ && currentI === startI){

        if(moveType === 'R'){

            StartTimer();
            return true;
        }
    }
    else{

        var node = maze[currentI][currentJ];
        //console.log(maze[currentI][currentJ]);
        
        if(moveType === 'R'){

            if(node === 5 || node === 7 || node === 8 || node === 10 || node === 12 || node === 13 || node === 14 || node === 0){
     
                return true;
            }
        }

        else if(moveType === 'L'){

            if(node === 4 || node === 6 || node === 8 || node === 9 || node === 12 || node === 13 || node === 15 || node === 0){

                return true;
            }
        }

        else if(moveType === 'U'){

            if(node === 3 || node === 9 || node === 10 || node === 11 || node === 12 || node === 14 || node === 15 || node === 0){

                return true;
            }    
        }

        else if(moveType === 'D'){

            if(node === 2 || node === 6 || node === 7 || node === 11 || node === 13 || node === 14 || node === 15 || node === 0){

                return true;
            } 
        }

        return false;
    }
}

function MovePalyer(shiftTop, shiftLeft){

    currentX += shiftLeft * sideLength;
    currentY += shiftTop * sideLength;

    currentJ += shiftLeft;
    currentI += shiftTop;

    $("#playerNode").css({top: currentY, left: currentX});

    AddMove();
}

function AddMove(){

    moveCount++;
    $("#moveCounter").text("Move Count: " + moveCount);

    if(currentI === finishI && currentJ === finishJ){

        StopTimer();

        $("#comeToDaddy").css({top: currentY - sideLength * 1.5, left: currentX - sideLength * 0});
        $("#comeToDaddy").show();
    }
}

var sec = 0;
var min = 0;
var hur = 0;
function SetTimer(){

    sec++;
    if(sec === 60){

        sec = 0;
        min++;
    }
    if(min === 60){

        min = 0;
        hur++;
    }

    var timeStr = "Time >> ";

    if(hur < 10)
        timeStr += '0';
    timeStr += hur + ':';

    if(min < 10)
        timeStr += '0';
    timeStr += min + ':';

    if(sec < 10)
        timeStr += '0';
    timeStr += sec;

    $("#timer").text(timeStr);
}

var TimerID;
function StartTimer(){

    TimerID = setInterval(SetTimer, 1000);
}

function StopTimer(){
   
    clearInterval(TimerID);
}

$(document).ready(function(){
    
    $("#playerNode").css({width: sideLength - borderWidth, height: sideLength - borderWidth});
    $("#playerNode").css({top: currentY, left: currentX});

    DrawGrid();

    $("#comeToDaddy").hide();
});
