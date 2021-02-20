


$(function(){
    var grid, score=0, best;
    var empty = [];
    var expiry_date = new Date('March 15, 2021 11:59:59').toUTCString(); 

    function fillCell(row, col, value){
        grid[row][col] = value;
        if(value)
            $("#"+row+col).html(value); // may change the ids
        else
            $("#"+row+col).html('');

        if(value >= 4096)
            value = 4096; // just for the color
        $("#"+row+col).removeClass().addClass("tile").addClass("tile_"+value);
    }

    function generate_cell(){
        empty = [];
        var idx, num;
        var safe_game_flag = 0; // will be 1 by ANY of these cases: 1)empty.length >1.   2)2 adjacents are same.   
        //this just away to reduce the work of checking ALL the adjacents every time.
        // so here check horizontal adjacents
        var prev = null;
        for (var r = 0; r<4; r++){
            prev = null;
            for (var c = 0; c<4; c++){
                if (grid[r][c] == 0) 
                    empty.push([r, c]);
                if(!safe_game_flag) //if not safe yet, check cases:
                    if(empty.length > 1 || prev == grid[r][c])
                        safe_game_flag = 1;
                    else
                        prev = grid[r][c];
            }
        }
        // and here check vertical adjacents
        if(!safe_game_flag){ // && empty.length == 1)// prone to end of game, so ==> Check all adjacents
            if(empty.length == 1){ // generate it, then compare
                idx = empty[0];
                num = (Math.random()<0.5)? 2:4;
                var r = idx[0];
                var c = idx[1];
                fillCell(r, c, num);
                if((c>1 && grid[r][c-1] == num) || (c<3 && grid[r][c+1] == num) ) //compare its horizontal adjacnts
                    safe_game_flag = 1;
            }

            for(var i=0; i<4 && !safe_game_flag; i++){
                if(grid[1][i] == grid[0][i] || grid[1][i] == grid[2][i] || grid[2][i] == grid[3][i])
                safe_game_flag = 1;
            }

            if(!safe_game_flag){ //STILL, then GAME OVER
                console.log("GAME OVER");
                return -1;
            }
        }
        else{
            idx = empty[Math.floor(Math.random() * empty.length)];
            num = (Math.random()<0.5)? 2:4;
            fillCell(idx[0], idx[1], num);
            return idx;
        }
    }

    function moveRow(row, col, prev_val, prev_cell, dir)//dir=1--> left / =-1-->right
    {
        var moved_flag = 0;
        if(grid[row][col] !=0 ){ // then check the 3 possible cases
            if(prev_val == null){ // 1)Nothing previous to compare with, at least it'll be shifted
                prev_val = grid[row][col];
                if(prev_cell != col){
                    fillCell(row, prev_cell, prev_val);
                    fillCell(row, col, 0);
                    moved_flag = 1;
                }
            }
            else if(prev_val == grid[row][col]){ // 2)Same number
                // score = Math.max(score, 2 * prev_val);
                score += 2 * prev_val;
                $("#score").html(score);
                fillCell(row, prev_cell, 2 * prev_val);
                fillCell(row, col, 0);
                prev_cell = prev_cell + dir;
                prev_val = null; // as it can't be merged again
                moved_flag = 1;
            }
            else{ // 3)Different number
                prev_cell = prev_cell + dir;
                if(prev_cell != col){
                    fillCell(row, prev_cell, grid[row][col]);
                    fillCell(row, col, 0);
                    moved_flag = 1;
                }
                prev_val = grid[row][prev_cell];
            }
        }// else just increment
        return [prev_val, prev_cell, moved_flag];
    }

    function moveColumn(row, col, prev_val, prev_cell, dir)//dir=1--> up / =-1-->down
    {
        var moved_flag = 0;
        if(grid[row][col] !=0 ){ // then check the 3 possible cases
            if(prev_val == null){ // 1)Nothing previous to compare with
                prev_val = grid[row][col];
                if(prev_cell != row){
                    fillCell(prev_cell, col, grid[row][col]);
                    fillCell(row, col, 0);
                    moved_flag = 1;
                }
            }
            else if(prev_val == grid[row][col]){ // 2)Same number
                // score = Math.max(score, 2 * prev_val); // max value
                score += 2 * prev_val; //sum of values
                $("#score").html(score);
                fillCell(prev_cell, col, 2 * prev_val);
                fillCell(row, col, 0);
                prev_cell = prev_cell + dir;
                prev_val = null; // as it can't be merged again
                moved_flag = 1;
            }
            else{ // 3)Different number
                prev_cell = prev_cell + dir;
                if(prev_cell != row){
                    fillCell(prev_cell, col, grid[row][col]);
                    fillCell(row, col, 0);
                    moved_flag = 1;
                }
                prev_val = grid[prev_cell][col];
            }
        }// else just increment
        return [prev_val, prev_cell, moved_flag];
    }

    best = +(window.$L.getCookie("best_2048"));
    if(best == -1)
        best = 0;
    else
        $("#best").html(best);

    $("input[id='start']").click(function(){ //BOARD INTIALIZATION
        grid = [[0,0,0,0],
                [0,0,0,0], //up & down
                [0,0,0,0],
                [0,0,0,0]];//up

        for(var r=0; r<4; r++)
            for(var c=0; c<4; c++){
                $("#"+r+c).html('');
                $("#"+r+c).removeClass().addClass("tile");
            }
        score = 0;
        $("#score").html(0);

        // choose randomly 2 tiles
        generate_cell();
        generate_cell();
    });

    var prev_val = null;
    var prev_cell = 0;
    var temp;
    var moved_flag;
    $(document).keydown(function(event){ //MOVE
        moved_flag = 0;
        switch(event.keyCode){
            case 37: //left
                for(var row=0; row<4; row++){
                    prev_val = null;
                    prev_cell = 0;
                    for(var col=0; col<4; col++){
                        temp = moveRow(row, col, prev_val, prev_cell, 1);
                        prev_val = temp[0];
                        prev_cell = temp[1];
                        moved_flag = (moved_flag == 0)? temp[2]:moved_flag;
                    }
                }
            break;
            case 38: //up
                for(var col=0; col<4; col++){
                    prev_val = null;
                    prev_cell = 0;
                    for(var row=0; row<4; row++){
                        temp = moveColumn(row, col, prev_val, prev_cell, 1);
                        prev_val = temp[0];
                        prev_cell = temp[1];
                        moved_flag = (moved_flag == 0)? temp[2]:moved_flag;
                    }
                }
            break;
            case 39: //right
                for(var row=0; row<4; row++){
                    prev_val = null;
                    prev_cell = 3;
                    for(var col=3; col>=0; col--){
                        temp = moveRow(row, col, prev_val, prev_cell, -1);
                        prev_val = temp[0];
                        prev_cell = temp[1];
                        moved_flag = (moved_flag == 0)? temp[2]:moved_flag;
                    }
                }
            break;
            case 40: //down
                for(var col=0; col<4; col++){
                    prev_val = null;
                    prev_cell = 3;
                    for(var row=3; row>=0; row--){
                        temp = moveColumn(row, col, prev_val, prev_cell, -1);
                        prev_val = temp[0];
                        prev_cell = temp[1];
                        moved_flag = (moved_flag == 0)? temp[2]:moved_flag;
                    }
                }
            break;
        } 
        if(moved_flag == 1)
            generate_cell();

        if(score > best)
        {
            best = score;
            $("#best").html(best);
            window.$L.setCookie("best_2048", best, expiry_date);
        }
        
    });
});


/* Game Board
1     2    3    4
5     6    7    8
9    10   11   12 
13   14   15   16

===============================================
* WORK ON: 
    - Game over
    - animation
    ---------------------
    - sound effects
    - music & video
    - achievments
    - change color

* DONE
    - random generation after each click is empty places     >>>>>>>> keep track of empty places 
    - A is_game_over method that determines if the game is finished or not
        check: 1)empty 2)possible merges
    - more modulare, for other directions
    - stop generating new numbers, by illegal moves
*/