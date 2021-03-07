onload=(function (){    
  hideMsg();  
var playerdiv=document.getElementById("char");
var grad=document.getElementById("gred");   
var gravity =0.9;
var scoreLable=document.getElementById("score");
var gameOver=document.getElementById("gameOver");
var score=0;
var speed=25000;
var randonimgnum; 
var best;
var position=0; 
var flag=false;
var expireDate=new Date();
expireDate.setMonth(expireDate.getMonth()+1);
  
var isjumping=false;
var isGamOver=false;

best=+(window.getCookie("best_cheromGame"));
if(best==-1)
best=0;
else
$("#best").html("Best Score"+":"+parseInt(best));

    
 function controll(key){
        if(key.keyCode==32){
           
         if(!isjumping){
                isjumping=true;
                jump();
           }
           
        }
        
    }
document.addEventListener('keyup',controll); 
    
  

 var interverSecond=50; 
    
function jump(){
  var  count=0;
    var   background=document.getElementsByClassName("background")[0];
    var timerup=setInterval(function(){
        
        if(count==25){
            clearInterval(timerup);
           // console.log("down",position);
            var downtimer=setInterval(function(){
                
                if(count==0){
                    clearInterval(downtimer)
                    isjumping=false
                }
                //console.log(playerdiv.offsetTop," ",(background.offsetHeight-60));
                if(playerdiv.offsetTop<(background.offsetHeight-62)){
                position-=2;
                count--;
               position=position*gravity;
                playerdiv.style.bottom=position+'px'
                }else{
                    count=0;
                }
                
                
                
            },interverSecond)
            
        
          }
        
        //console.log("up",position);
        
        position +=40;
        count++;
        position=position*gravity;
        playerdiv.style.bottom=position+'px'
        
    },20)
    
}
    
   

    
 function createStar(){
     
     var randomtimestar=Math.random()*50000;   
     var  starPosition=1000;
     var starelement=document.createElement("div");
     if(!isGamOver)
     starelement.id="star";
     
     starelement.style.backgroundImage = "url('picture/star.png')"; 
  
     grad.appendChild(starelement);
     starelement.style.left=starPosition+"px";
   
     
     var startimer=setInterval(function(){
         
         if(starPosition>0 && starPosition<200&& position>280 ){
             
             flag=true;
            starelement.style.display="none";
             clearInterval(startimer);
            if(flag){
      //  console.log("star");
        score+=5;
        scoreLable.innerHTML="Score"+":"+score;
           
        $("#wow").show(600);
        $("#wow").hide(600);   
        flag=false;
        }
         }
          starPosition=starPosition-10;
          starelement.style.left=starPosition+"px";
         
     },20);
     
  if(!isGamOver){
       
        
     setTimeout(createStar,randomtimestar); 
     
      }
 }
    
    
    
    var obspositionspeed=10;
    //var obsflag=false;
    function createObstical(){
    
     var randomtime=Math.random()*speed;   
     var  obsPosition=1000;
     var obstical=document.createElement("div");
     if(!isGamOver)
        obstical.id="obs";
     randonimgnum=Math.floor(Math.random() * 3); 
     obstical.style.backgroundImage = "url('picture/"+randonimgnum+".png')"; 
      console.log(randonimgnum)
    
     
     grad.appendChild(obstical);
     obstical.style.left=obsPosition+"px";
   //  obstical.appendChild(obsticalimg);
     
     var obstimer=setInterval(function(){
        
         if(obsPosition>0 && obsPosition<200&& position<70 ){
             clearInterval(obstimer);
            
             isGamOver=true;
              
             while(grad.firstChild ){
                    if(obstical.firstChild ){
                 obstical.removeChild;
             }
                 grad.removeChild(grad.lastChild);
              
             }
             
        
             $("#gameOver").show(1000);
             
         }
         
          obsPosition=obsPosition-obspositionspeed;
          obstical.style.left=obsPosition+"px";
         
     },20);
   
  if(!isGamOver){
        score++;
        scoreLable.innerHTML="Score"+":"+score;
        if(score>best)
            {
            best=parseInt(score);
            $("#best").html("Best Score"+":"+best);
               // console.log(best);
               
            window.setCookie("best_cheromGame",best,expireDate);
            }
       // obsflag=false;
        if(score%5==0){
            speed-=200;
            obspositionspeed+=0.5;
            interverSecond-=3;
            randomtime=0;
            randomtime=Math.random()*speed;
        }
        setTimeout(createObstical,randomtime); 
        
      }
 }
    
    
    createStar();
    createObstical();

    

   });

function hideMsg(){

    $("#gameOver").hide();
   
}

 
function PlayAgain()
{
    location.reload();
}