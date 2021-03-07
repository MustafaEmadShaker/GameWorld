var sideLength = 50;
var borderWidth = 2;

var gridX = 450;
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
    [7, 8, 8, 8, 8, 6, 7, 6],
    [11, 7, 6, 7, 4, 10, 9, 11],
    [10, 9, 11, 14, 8, 8, 6, 11],
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
            var $cln =  CloneNode("#tempNode", newID, "body")

            var pX = gridX + (sideLength * j);
            var pY = gridY + (sideLength * i);

            $cln.removeClass();
            $cln.addClass("node" + maze[i][j]);
            //$cln.text(maze[i][j]);
            $cln.css({top: pY, left: pX});
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

var currentAngle = 90;
function changeImage(src)
{
    var angle = currentAngle;
    if(src === 'U'){

        angle = 0;
    }
    else if(src === 'R'){

        angle = 90;
    }
    else if(src === 'D'){

        angle = 180;
    }
    else if(src === 'L'){

        angle = 270;
    }

    rotateImage(angle - currentAngle);

    angle = currentAngle;

    //var pln = "Pics/Plane" + src + ".png";
    //$("#playerNode").attr("src", pln);
}

function rotateImage(degree){

    $("#playerNode").css({

        '-webkit-transform': 'rotate(' + degree + 'deg)',
        '-webkit-transition-duration' : '1s'
    })    
}
