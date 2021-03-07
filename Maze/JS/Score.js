var bsTime;
var bsMove;

function GetHighScore(){

    var ck = new Cookie();

    //ck.DeleteAllCookies();
    
    bsMove = ck.GetCookieValue("bsMove");
    document.getElementById("hsMove").innerHTML = "Moves: " + bsMove;

    bsTime = ck.GetCookieValue("bsTime");
    document.getElementById("hsTime").innerHTML = "Time >> " + bsTime;
}

function SetHighScore(){

    var crTime = GetCurrenTime();
    var crMove = GetCurrentScore();

    var ckMove = GetBestScore(crMove);
    var ckTime = GetBesTime(crTime);

    var ck = new Cookie();
    ck.SetCookie("bsTime", ckTime, "auto");
    ck.SetCookie("bsMove", ckMove, "auto");
}

function GetCurrentScore(){

    var crMove = $("#moveCounter").text();
    n  = crMove.length;
    crMove = crMove.substring(12, n + 1);
    crMove = parseInt(crMove);
    return crMove;
}

function GetCurrenTime(){

    var crTime = $("#timer").text();
    var n  = crTime.length;
    crTime = crTime.substring(8, n + 1);
    return crTime;
}

function GetBestScore(crMove){

    var ckMove = bsMove;
    if(crMove < bsMove || bsMove === undefined){

        ckMove = crMove;
    }
    return ckMove;
}

function GetBesTime(crTime){

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
