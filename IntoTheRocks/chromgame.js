
onload=(function(){    
    
var playerdiv=document.getElementById("char");
var grad=document.getElementById("gred");   
var gravity =0.9;
var scoreLable=document.getElementById("score");
var gameOver=document.getElementById("gameOver");
var score=-1;
var speed=10000;
var randonimgnum; 
 
var isjumping=false;
var isGamOver=false;
    
 function controll(key){
        if(key.keyCode==32){
            if(!isjumping){
                isjumping=true;
                jump();
            }
            
            
        }
        
    }
document.addEventListener('keyup',controll); 
    var position=0; 
    

    
    
function jump(){
    var count=0; 
    var timerup=setInterval(function(){
        if(count==25){
            clearInterval(timerup);
            console.log("down",position);
            var downtimer=setInterval(function(){
                if(count==0){
                    clearInterval(downtimer)
                    isjumping=false
                }
                position-=2;
                count--;
               position=position*gravity;
                playerdiv.style.bottom=position+'px'
                
                
            },40)
            
        
          }
        
        console.log("up",position);
        
        position +=40;
        count++;
        position=position*gravity;
        playerdiv.style.bottom=position+'px'
        
    },20)
    
}
    
    
 function createObstical(){
    
     var randomtime=Math.random()*speed;   
     var  obsPosition=1000;
     var obstical=document.createElement("div");
     if(!isGamOver)
        obstical.id="obs";
     randonimgnum=Math.floor(Math.random() * 3); 
     obstical.style.backgroundImage = "url('Alaa/"+randonimgnum+".png')"; 
      
    
     
     
     
     grad.appendChild(obstical);
     obstical.style.left=obsPosition+"px";
   //  obstical.appendChild(obsticalimg);
     
     var obstimer=setInterval(function(){
         
         if(obsPosition>0 && obsPosition<200&& position<150 ){
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
          obsPosition=obsPosition-10;
          obstical.style.left=obsPosition+"px";
         
     },20);
     
  if(!isGamOver){
        score++;
         scoreLable.innerHTML="Score"+score;
        
        if(score%5==15){
            speed-=500;
            randomtime=0;
            randomtime=Math.random()*speed;
        }
        setTimeout(createObstical,randomtime); 
        
      }
 }

    createObstical();

    
  });


