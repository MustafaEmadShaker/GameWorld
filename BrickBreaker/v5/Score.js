var bsTime;
var bsMove;

function GetHighScore(){

    var ck = new Cookie();

    //ck.DeleteAllCookies();
    
    bsMove = ck.GetCookieValue("BBbsMove");
    document.getElementById("hsMove").innerHTML = "Score: " + bsMove;

    bsTime = ck.GetCookieValue("BBbsTime");
    document.getElementById("hsTime").innerHTML = "Time: " + bsTime;
}

var mvFlag = 0;
function SetHighScore(){

    var crTime = GetCurrenTime();
    var crMove = GetCurrentScore();

    var ckMove = GetBestScore(crMove);
    var ckTime = GetBesTime(crTime);

    console.log(crMove);
    console.log(crTime);

    var ck = new Cookie();
    ck.SetCookie("BBbsTime", ckTime, "auto");
    ck.SetCookie("BBbsMove", ckMove, "auto");
}

function GetCurrentScore(){

    var crMove = $("#score").text();
    n  = crMove.length;
    crMove = crMove.substring(7, n + 1);
    crMove = parseInt(crMove);
    return crMove;
}

function GetCurrenTime(){

    var crTime = $("#timeCount").text();
    var n  = crTime.length;
    crTime = crTime.substring(6, n + 1);
    return crTime;
}

function GetBestScore(crMove){

    var ckMove = bsMove;
    if(crMove > bsMove || bsMove === undefined){

        mvFlag = 1;
        ckMove = crMove;
    }
    else if(crMove === bsMove){

        mvFlag = 2;
    }
    return ckMove;
}

function GetBesTime(crTime){

    if(mvFlag === 1){

        return crTime;
    }
    else if(mvFlag === 0){

        return bsTime;
    }
    else{

        try{

            var crHur = parseInt(crTime.substring(0, 2));
            var crMin = parseInt(crTime.substring(3, 5));
            var crSec = parseInt(crTime.substring(6, 8));

            var bsHur = parseInt(bsTime.substring(0, 2));
            var bsMin = parseInt(bsTime.substring(3, 5));
            var bsSec = parseInt(bsTime.substring(6, 8));

            if(crHur < bsHur){

                return crTime;
            }
            else if(crHur > bsHur){

                return bsTime;
            }
            else if(crMin < bsMin){

                return crTime;
            }
            else if(crMin > bsMin){

                return bsTime;
            }
            else if(crSec < bsSec){

                return crTime;
            }
            else{

                return bsTime;
            }
        }
        catch{

            return crTime;
        }
    }
}
