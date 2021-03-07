//----------------------------------- RUN-TIME -----------------------------------//
function ArrowKeyPressed(event){

    if(event.keyCode === 37){ //LEFT

        if(AllowMove('L') === true){

            changeImage('L');
            MovePalyer(0, -1);
        }
    }
    else if(event.keyCode === 38){ //UP

        if(AllowMove('U') === true){

            changeImage('U');
            MovePalyer(-1, 0);
        }
    }
    else if(event.keyCode === 39){ //RIGHT
        
        if(AllowMove('R') === true){

            changeImage('R');
            MovePalyer(0, 1);
        }
    }
    else if(event.keyCode === 40){ //DOWN
        
        if(AllowMove('D') === true){

            changeImage('D');
            MovePalyer(1, 0);
        }
    }
}

function AddMove(){

    moveCount++;
    $("#moveCounter").text("Move Count: " + moveCount);

    if(currentI === finishI && currentJ === finishJ){

        WinGame();
    }
}
//--------------------------------------------------------------------------------//

//------------------------------------- START ------------------------------------//
function hideMsg(){

    $("#gameWin").hide();
}

$(document).ready(function(){
    
    TimerID = undefined;

    $("#tempNode").css({width: sideLength - borderWidth, height: sideLength - borderWidth});
    DrawGrid();
    $("#tempNode").hide();

    $("#playerNode").css({width: sideLength - borderWidth, height: sideLength - borderWidth});
    $("#playerNode").css({top: currentY, left: currentX});

    $("#comeToDaddy").hide();

    GetHighScore();

    hideMsg();
});
//--------------------------------------------------------------------------------//

//-------------------------------------- END -------------------------------------//
function gameWin(){

    $("#gameWin").show(2000);
}

function WinGame()
{
    StopTimer();

    $("#comeToDaddy").css({top: currentY - sideLength * 1.5, left: currentX - sideLength * 0});
    $("#comeToDaddy").show();

    SetHighScore();

    gameWin();
}

function PlayAgain()
{
    location.reload();
}
//--------------------------------------------------------------------------------//
