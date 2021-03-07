$(document).ready(function(){
    
    $("#d1").hide();
    $("#d2").hide();
    $("#ms").hide();

    NextMessage("#dg", "#d1", 3000);
    NextMessage("#d1", "#d2", 7000);
    NextMessage("#d2", "#ms", 11000);
});

function NextMessage(hd, sh, tm){

    setTimeout(

        function(){

            $(hd).hide(1000);
            $(sh).show(1000);
        }, tm
    );
}

function fmaze(){

    window.location.href = 'Maze/Maze.html';
}

function fbrick(){

    window.location.href = 'BrickBreaker/Bricks_Breaker.html';
}

function frocks(){

    window.location.href = 'IntoTheRocks/chromgame.html';
}

function f2048(){

    window.location.href = 'Game2048/game_2048.html';
}