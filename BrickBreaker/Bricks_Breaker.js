   var mywidow = document.getElementById("mydiv");
   var flag = 1;
   var ballRadius = 20;
   var x = mywidow.offsetWidth / 2 - 10;
   var y = mywidow.offsetHeight - 40;
   console.log(mywidow.offsetHeight);
   var dx = 2;
   var dy = -2;
   var paddleHeight = 20;
   var paddleWidth = 75;
   var paddleX = (mywidow.offsetWidth - paddleWidth) / 2;
   var rightPressed = false;
   var leftPressed = false;
   var brickRowCount = 6;
   var brickColumnCount = 5;
   var brickWidth = 75;
   var brickHeight = 20;
   var brickPadding = 10;
   var brickOffsetTop = 30;
   var brickOffsetLeft = 30;
   var score = 0;
   var lives = 3;
   console.log(mywidow.offsetWidth);
   var bricks = [];
   for (var c = 0; c < brickColumnCount; c++) {
       bricks[c] = [];
       for (var r = 0; r < brickRowCount; r++) {
           bricks[c][r] = {
               x: 0,
               y: 0,
               status: 1,
               id: c + "" + r
           };
       }
   }
   document.addEventListener("keydown", keyDownHandler, false);
   document.addEventListener("keyup", keyUpHandler, false);
   document.addEventListener("mousemove", mouseMoveHandler, false);
   function keyDownHandler(e) {
       if (e.keyCode == 39) {
           rightPressed = true;
       } else if (e.keyCode == 37) {
           leftPressed = true;
       }
   }
   function keyUpHandler(e) {
       if (e.keyCode == 39) {
           rightPressed = false;
       } else if (e.keyCode == 37) {
           leftPressed = false;
       }
   }
   function mouseMoveHandler(e) {
       var relativeX = e.clientX - mywidow.offsetLeft;
       if (relativeX > paddleWidth && relativeX < mywidow.offsetWidth) {
           paddleX = relativeX - paddleWidth;
       }
   }
   function collisionDetection() {
       for (var c = 0; c < brickColumnCount; c++) {
           for (var r = 0; r < brickRowCount; r++) {
               var b = bricks[c][r];
               if (b.status == 1) {
                   if ((x >= b.x && x <= b.x + brickWidth && y >= b.y && y <= b.y + brickHeight)) {
                       dy = -dy;
                       b.status = 0;
                       document.getElementById(b.id).style.opacity = 0;
                       score++;
                       if (score == brickRowCount * brickColumnCount) {
                           alert("YOU WIN, CONGRATS!");
                           document.location.reload();
                       }
                   }
               }
           }
       }
   }
   function drawBall() {
       document.getElementById("playerNode").style.position = "absolute";
       document.getElementById("playerNode").style.top = y + "px";
       document.getElementById("playerNode").style.left = x + "px";
   }
   function drawPaddle() {

       document.getElementById("paddle").style.position = "absolute";
       document.getElementById("paddle").style.top = mywidow.offsetHeight - paddleHeight + "px";
       document.getElementById("paddle").style.left = paddleX + "px";
       document.getElementById("paddle").style.borderRadius = "10px";
   }
   function drawBricks() {
       for (var c = 0; c < brickColumnCount; c++) {
           for (var r = 0; r < brickRowCount; r++) {
               if (bricks[c][r].status == 1) {
                   var brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
                   var brickY = (c * (brickHeight + brickPadding) + 40) + brickOffsetTop;
                   bricks[c][r].x = brickX;
                   bricks[c][r].y = brickY;
                   var brickDiv = document.createElement("div");
                   brickDiv.id = bricks[c][r].id;
                   brickDiv.style.width = brickWidth + "px";
                   brickDiv.style.height = brickHeight + "px";
                   brickDiv.style.background = "#4B2363";
                   brickDiv.style.position = "absolute";
                   brickDiv.style.top = bricks[c][r].y + "px";
                   brickDiv.style.left = bricks[c][r].x + "px";
                   brickDiv.style.borderRadius = "10px";
                   document.getElementById("cont").appendChild(brickDiv);


               }
           }
       }
   }
   function drawScore() {
       document.getElementById("score").style.position = "relative";
       document.getElementById("score").innerHTML = "Score: " + score;
       document.getElementById("score").style.fontWeight = "900";
       document.getElementById("score").style.color = "#E2D1F0";
       document.getElementById("score").style.fontSize = "x-large";
       document.getElementById("score").style.top = "8px";
       document.getElementById("score").style.left = "20px";
   }
   function drawLives() {
       document.getElementById("live").style.position = "relative";
       document.getElementById("live").innerHTML = "Lives: " + lives;
       document.getElementById("live").style.fontWeight = "900";
       document.getElementById("live").style.color = "#E2D1F0";
       document.getElementById("live").style.fontSize = "x-large";
       document.getElementById("live").style.top = "-16px";
       document.getElementById("live").style.left = "450px";

   }
   function draw() {
       drawBall();
       drawPaddle();
       drawScore();
       drawLives();
       collisionDetection();

       if (x + dx > mywidow.offsetWidth - ballRadius - 20 || x + dx < ballRadius) {
           dx = -dx;
       }
       if (y + dy < ballRadius) {
           dy = -dy;
       } else if (y + dy > mywidow.offsetHeight - ballRadius - 20) {
           if (x > paddleX && x < paddleX + paddleWidth) {
               dy = -dy;
           } else {
               lives--;
               if (!lives) {
                   flag = 0;
                   alert("GAME OVER");
                   document.location.reload();
               } else {
                   x = mywidow.offsetWidth / 2;
                   y = mywidow.offsetHeight - 40;
                   dx = 3;
                   dy = -3;
                   paddleX = (mywidow.offsetWidth - paddleWidth) / 2;
               }
           }
       }

       if (rightPressed && paddleX < mywidow.offsetWidth - paddleWidth) {
           paddleX += 7;
       } else if (leftPressed && paddleX > 0) {
           paddleX -= 7;
       }

       x += dx;
       y += dy;

   }
   onload = function () {
       drawBricks();
       setInterval(draw, 30);
   }
