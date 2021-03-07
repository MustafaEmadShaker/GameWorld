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

    if(TimerID === undefined){

        TimerID = setInterval(SetTimer, 1000);
    }
}

function StopTimer(){
   
    clearInterval(TimerID);
}
