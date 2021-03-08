
var grid;
  
$(function(){
    var tile_width = 105;
    var moved_flag;
    var achieved_flag = 0;
    var gen_timer;
    var animation_times = 0;
    var score=0, best;
    var empty = [];
    var expiry_date = new Date('March 15, 2021 11:59:59').toUTCString(); 
    hideMsg();
    
    function intializeBoard(){ //BOARD INTIALIZATION
        grid = [[0,0,0,0],
                [0,0,0,0], //up & down
                [0,0,0,0],
                [0,0,0,0]];//up
        achieved_flag = 0;
        animation_times = 0;
        
        hideMsg();
        //remove any previous cells
        $("#last").nextAll().remove();
        score = 0;
        $("#score").html(0);
        // choose randomly 2 tiles
        generate_cell(0);
        generate_cell(0);
    }

    function fillCell(row, col, value, scale_flag){
        if(value){
            if ($('#'+row+col).length > 0)//if exists, remove it first
                $("#"+row+col).remove();
            $('<div>', {class:'tile row_'+row+' col_'+col +" tile_"+value, id:row.toString()+col, text:value}).appendTo('#game_container');

            if(value >= 4096)// just for the color
                value = 4096; 
            if(scale_flag){
                var elem = $("#"+row+col);
                (function(elem){
                    var c = $(elem).css('background-color')
                    $(elem).animate({"border-color":c}), $(elem).animate({"border-color":"rgb(187, 173, 160)"}, {duration:1, easing: 'easeOutBounce'});
                })(elem);
                if(value == 2048)
                    gameWin()
            }  
        }
        else{
            $("#"+row+col).remove();
        } 
    }

    function generate_cell(){
        empty = [];
        var idx, num;
        var safe_game_flag = 0;
        var prev = null;
        for (var r = 0; r<4; r++){
            prev = null;
            for (var c = 0; c<4; c++)
                if (grid[r][c] == 0) 
                    empty.push([r, c]);
        }

        if(empty.length == 1){  // prone to end of game, so ==> generate it, then compare
            idx = empty[0];
            num = (Math.random()<0.5)? 2:4;
            var r = idx[0];
            var c = idx[1];
            grid[r][c] = num;
            fillCell(r, c, num);
            
            for (var c = 0; c<4 && !safe_game_flag; c++){
                prev = grid[0][c];
                for (var r = 1; r<4 && !safe_game_flag; r++)
                    if(prev == grid[r][c])
                        safe_game_flag = 1;
                    else
                        prev = grid[r][c];
            }
            for (var r = 0; r<4; r++){
                prev = grid[r][0];
                for (var c = 1; c<4; c++)
                    if(prev == grid[r][c])
                        safe_game_flag = 1;
                    else
                        prev = grid[r][c];
            }

            if(!safe_game_flag){ //then GAME OVER
                gameOver()
                return -1;
            }
        }
        else{
            idx = empty[Math.floor(Math.random() * empty.length)];
            num = (Math.random()<0.5)? 2:4;
            grid[idx[0]][idx[1]] = num;
            fillCell(idx[0], idx[1], num, false);
            return idx;
        }
    }

    function Fix_Delay(){
        var elem;
        for (var r = 0; r<4; r++)
            for (var c = 0; c<4; c++){
                elem = '#'+r+c;
                if ($(elem).length > 0){
                    if((+($(elem).text()) != grid[r][c]) && (grid[r][c] != 0)){
                        $(elem).text(grid[r][c]);
                        $(elem).removeClass().addClass('tile row_'+r+' col_'+c +" tile_"+grid[r][c]);

                    }
                }
                else if(grid[r][c] != 0){
                    $('<div>', {class:'tile row_'+r+' col_'+c +" tile_"+grid[r][c], id:r.toString()+c, text:grid[r][c]}).appendTo('#game_container');     
                }
            }
        generate_cell();
    }

    function moveRow(row, col, prev_val, prev_cell, dir)//dir=1--> left / =-1-->right
    {
        var moved_flag = 0;
        if(grid[row][col] !=0 ){ // then check the 3 possible cases
            if(prev_val == null){ // 1)Nothing previous to compare with, at least it'll be shifted
                prev_val = grid[row][col];
                if(prev_cell != col){
                    if(dir == 1)//left
                    (function(row, col, prev_cell, prev_val){
                        animation_times++;
                        $("#"+row+col).animate({'right': tile_width*(col-prev_cell)+"px" }, 20*(col-prev_cell), function(){
                            fillCell(row, prev_cell, prev_val);
                            fillCell(row, col, 0);
                            animation_times--;
                            if(animation_times == 0)
                                Fix_Delay();          
                        });
                    })(row, col, prev_cell, prev_val);
                    else
                    (function(row, col, prev_cell, prev_val){
                        animation_times++;
                        $("#"+row+col).animate({'left': tile_width*(prev_cell-col)+"px"  }, 20*(prev_cell-col), function(){
                            fillCell(row, prev_cell, prev_val);
                            fillCell(row, col, 0);
                            animation_times--;
                            if(animation_times == 0)
                            Fix_Delay();
                        });
                    })(row, col, prev_cell, prev_val);
                        
                    grid[row][prev_cell] = grid[row][col];
                    grid[row][col] = 0;
                    moved_flag += 1;
                }
            }
            else if(prev_val == grid[row][col]){ // 2)Same number
                score += 2 * prev_val;
                $("#score").html(score);
                if(dir == 1)//left
                    (function(row, col, prev_cell, prev_val){
                        animation_times++;
                        $("#"+row+col).animate({'right': tile_width*(col-prev_cell)+"px" }, 20*(col-prev_cell), function(){
                            fillCell(row, prev_cell, 2 * prev_val, true);
                            fillCell(row, col, 0);
                            animation_times--;
                            if(animation_times == 0)
                                Fix_Delay();
                        });
                    })(row, col, prev_cell, prev_val);
                else
                    (function(row, col, prev_cell, prev_val){
                        animation_times++;
                        $("#"+row+col).animate({'left': tile_width*(prev_cell-col)+"px"  }, 20*(prev_cell-col), function(){
                            fillCell(row, prev_cell, 2 * prev_val, true);
                            fillCell(row, col, 0);
                            animation_times--;
                            if(animation_times == 0)
                                Fix_Delay();
                        });
                    })(row, col, prev_cell, prev_val);

                grid[row][prev_cell] = 2 * prev_val;
                grid[row][col] = 0;

                prev_cell = prev_cell + dir;
                prev_val = null; // as it can't be merged again
                moved_flag += 1;
            }
            else{ // 3)Different number
                prev_cell = prev_cell + dir;
                if(prev_cell != col){
                    if(dir == 1)//left
                        (function(row, col, prev_cell, val){
                            animation_times++;
                            $("#"+row+col).animate({'right': tile_width*(col-prev_cell)+"px" }, 20*(col-prev_cell), function(){
                                fillCell(row, prev_cell, val);
                                fillCell(row, col, 0);
                                animation_times--;
                                if(animation_times == 0)
                                    Fix_Delay();
                            });
                        })(row, col, prev_cell, grid[row][col]);
                    else
                        (function(row, col, prev_cell, val){
                            animation_times++;
                            $("#"+row+col).animate({'left': tile_width*(prev_cell-col)+"px"  }, 20*(prev_cell-col), function(){
                                fillCell(row, prev_cell, val);
                                fillCell(row, col, 0);
                                animation_times--;
                                if(animation_times == 0)
                                    Fix_Delay();    
                            });
                        })(row, col, prev_cell, grid[row][col]);

                    grid[row][prev_cell] = grid[row][col]; 
                    grid[row][col] = 0;
                    moved_flag += 1;
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
                    if(dir == 1)//up
                        (function(row, col, prev_cell, prev_val){
                            animation_times++;
                            $("#"+row+col).animate({'bottom': tile_width*(row-prev_cell)+"px" }, 20*(row-prev_cell), function(){
                                fillCell(prev_cell, col, prev_val);
                                fillCell(row, col, 0);
                                animation_times--;
                                if(animation_times == 0)
                                    Fix_Delay();          
                            });
                        })(row, col, prev_cell, prev_val);
                    else
                        (function(row, col, prev_cell, prev_val){
                            animation_times++;
                            $("#"+row+col).animate({'top': tile_width*(prev_cell-row)+"px"  }, 20*(prev_cell-row), function(){
                                fillCell(prev_cell, col, prev_val);
                                fillCell(row, col, 0);
                                animation_times--;
                                if(animation_times == 0)
                                    Fix_Delay();
                            });
                        })(row, col, prev_cell, prev_val);
                    grid[prev_cell][col] = grid[row][col];
                    grid[row][col] = 0;
                    moved_flag += 1;
                }
            }
            else if(prev_val == grid[row][col]){ // 2)Same number
                score += 2 * prev_val; //sum of values
                $("#score").html(score);
                if(dir == 1)//up
                    (function(row, col, prev_cell, prev_val){
                        animation_times++;
                        $("#"+row+col).animate({'bottom': tile_width*(row-prev_cell)+"px" }, 20*(row-prev_cell), function(){
                            fillCell(prev_cell, col, 2 * prev_val, true);
                            fillCell(row, col, 0);
                            animation_times--;
                            if(animation_times == 0)
                                Fix_Delay();
                        });
                    })(row, col, prev_cell, prev_val);
                else
                    (function(row, col, prev_cell, prev_val){
                        animation_times++;
                        $("#"+row+col).animate({'top': tile_width*(prev_cell-row)+"px"  }, 20*(prev_cell-row), function(){
                            fillCell(prev_cell, col, 2 * prev_val, true);
                            fillCell(row, col, 0);
                            animation_times--;
                            if(animation_times == 0)
                                Fix_Delay();
                        });
                    })(row, col, prev_cell, prev_val);

                grid[prev_cell][col] = 2 * prev_val;
                grid[row][col] = 0;

                prev_cell = prev_cell + dir;
                prev_val = null; // as it can't be merged again
                moved_flag += 1;
            }
            else{ // 3)Different number
                prev_cell = prev_cell + dir;
                if(prev_cell != row){
                    if(dir == 1)//up
                        (function(row, col, prev_cell, val){
                            animation_times++;
                            $("#"+row+col).animate({'bottom': tile_width*(row-prev_cell)+"px" }, 20*(row-prev_cell), function(){
                                fillCell(prev_cell, col, val);
                                fillCell(row, col, 0);
                                animation_times--;
                                if(animation_times == 0)
                                    Fix_Delay();
                            });
                        })(row, col, prev_cell, grid[row][col]);
                    else
                        (function(row, col, prev_cell, val){
                            animation_times++;
                            $("#"+row+col).animate({'top': tile_width*(prev_cell-row)+"px"  }, 20*(prev_cell-row), function(){
                                fillCell(prev_cell, col, val);
                                fillCell(row, col, 0);
                                animation_times--;
                                if(animation_times == 0)
                                    Fix_Delay();    
                            });
                        })(row, col, prev_cell, grid[row][col]);

                    grid[prev_cell][col] = grid[row][col]; 
                    grid[row][col] = 0;
                    moved_flag += 1;
                }
                prev_val = grid[prev_cell][col];
            }
        }// else just increment
        return [prev_val, prev_cell, moved_flag];
    }

    // read best-score from cookies
    best = +(getCookie("best_2048"));
    if(best == -1){
        best = 0;
        achieved_flag =1;
    }
    else
        $("#best").html(best);
    
    $("input[id='start'],.againTxt,.again").click(intializeBoard);

    $(document).keydown(function(event){ //MOVE
        clearTimeout(gen_timer);
        moved_flag = 0;
        var prev_val = null;
        var prev_cell = 0;
        var temp;
        animation_times = 0;
        flag = 0;
        switch(event.keyCode){
            case 37: //left
                for(var row=0; row<4; row++){
                    prev_val = null;
                    prev_cell = 0;
                    for(var col=0; col<4; col++){
                        temp = moveRow(row, col, prev_val, prev_cell, 1, moved_flag);
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
                        temp = moveRow(row, col, prev_val, prev_cell, -1, moved_flag);
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
  
        if(score > best)
        {
            best = score;
            $("#best").html(best);
            setCookie("best_2048", best, expiry_date);
            if(!achieved_flag){
                $("#achive").show(50).delay(3000).hide(50);
                achieved_flag = 1;
            }     
        }
    });

    function hideMsg(){
        $("#gameOver").hide();
        $("#gameWin").hide();
        $("#achive").hide();
    }
    
    function gameOver(){
        $("#gameOver").show(2000);
    }
    
    function gameWin(){
        $("#gameWin").show(700).delay(2000).hide(50);
    }
    
});

function PlayAgain()
{
    intializeBoard();
}