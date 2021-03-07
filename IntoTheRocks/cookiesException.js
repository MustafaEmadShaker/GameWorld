
onerror = function (msg,url,l,col,e) {
        console.log("error");
    console.log(msg);
    console.log(url);
    console.log(l);
    console.log(col);
    console.log(e);
        return false;
    }

var err = new Error("invalide value");


function getAllcookies() {

    var cookies = [];

    if (document.cookie && document.cookie != '') {
        var split = document.cookie.split(';');
        for (var i = 0; i < split.length; i++) {
            var name_value = split[i].split("=");
           // name_value[0] = name_value[0].replace(/^ /, '');
            cookies[decodeURIComponent(name_value[0])] = decodeURIComponent(name_value[1]);
        }
    }else throw "no cookies";

    return cookies;
   
}

setCookie=function(cookieName,cookieValue ,expiryDate)
{
    if(arguments[0]&& arguments[1]||arguments[3]){
     if(expiryDate!=undefined){
             document.cookie=cookieName+"="+cookieValue+ ";expires="+expiryDate.toUTCString();
     }
    else{
        document.cookie=cookieName+"="+cookieValue;
    }
    }
    else{
        throw err;
    }
    
     
}

function getCookie(cname) {
   if(arguments[0] ){
    var cookieArr = document.cookie.split(";");
    
   
    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        
        
        if(cname == cookiePair[0].trim()) {
           
            return decodeURIComponent(cookiePair[1]);
        }else return -1;
    }}else return "";
    
}

function checkCookie(name) {
    
    var name = getCookie("name");
    
   
    if( arguments[0] ){
        
        return true;
    }else{  throw err;} 
}

function deletcookie(name){
    if(arguments[0] ){
 var cookie = name + "=" +" ";
    
    
        cookie += "; expires=10-10-2010" ;
        
        document.cookie = cookie;
    }else throw err;
    
}
