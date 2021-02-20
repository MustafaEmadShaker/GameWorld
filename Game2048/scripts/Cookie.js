

(function(window){
    onerror = function(msg,url,l,col,e){
        console.log(msg);
        return true;
    }
    onload = function(){
        var dummy_date = new Date('October 15, 1996 05:35:32').toUTCString(); 
        
        var Cookiez = {
            // o Sets a cookie based on a cookie name, cookie value, and expiration date.
            setCookie: function(cookieName,cookieValue,expiryDate){
                if(arguments.length > 3 || arguments.length < 2)
                {
                    var e = new Error("setCookie() take 2 or 3 arguments");
                    throw e;
                }
                else{
                    document.cookie = cookieName+'='+encodeURIComponent(cookieValue);
                    if(expiryDate==undefined || arguments.length ==2)
                        document.cookie = cookieName+'='+encodeURIComponent(cookieValue+';expires='+ dummy_date);
                    else
                        document.cookie = cookieName+'='+encodeURIComponent(cookieValue+';expires='+ expiryDate);
                }
            },
    
            // o Retrieves a cookie value based on a cookie name.
            getCookie: function(cookieName){
                if(arguments.length > 1)
                {
                    var e = new Error("More than 1 arguments was passed to getCookie(). " + arguments.length + "was sent");
                    throw e;
                }
                else{
                    cookies_list = Cookiez.allCookieList();
                    if(Cookiez.hasCookie(cookieName))
                        return cookies_list[cookieName].split(';')[0];
                    return -1;
                }
            },
    
            // o Deletes a cookie based on a cookie name.
            deleteCookie: function(cookieName){
                if(arguments.length > 1)
                {
                    var e = new Error("More than 1 arguments was passed to deleteCookie(). " + arguments.length + "was sent");
                    throw e;
                }
                else{
                    cookies_list = Cookiez.allCookieList();
                    if(Cookiez.hasCookie(cookieName))
                        Cookiez.setCookie(cookieName,"",dummy_date);
                    else    
                    {
                        var e = new Error("This Cookie does NOT exist");
                        throw e;
                    } 
                }
            },
    
            // o returns a list of all stored cookies
            allCookieList: function(){
                if(arguments.length != 0){
                    var e = new Error("allCookieList() has no parameters");
                    throw e;
                }
                else{
                    var cookies_list = [];
                    var cookies = document.cookie;
                    var cookies_pair = cookies.split(';');
                    for(var i in cookies_pair)
                        cookies_list[cookies_pair[i].split('=')[0].trim()] = decodeURIComponent(cookies_pair[i].split('=')[1]); //don't forget to use trim function
                    return cookies_list;
                }
            },
    
            // o Check whether a cookie exists or not
            hasCookie: function(cookieName){
                if(arguments.length != 1){
                    var e = new Error("hasCookie() has 1 parameter");
                    throw e;
                }
                else{
                    cookies_list = Cookiez.allCookieList();
                    if(cookies_list[cookieName] == undefined)
                        return false;
                    return true;
                }
            }
        }

        // conflict handling //save the global value before overwrite it
        var _Cookiez = window.Cookiez;
        var _$L = window.$L

        //if Cookiez will let its variables' names to another library,
        // then we reset the global variables, and return our object.
        Cookiez.noConflict = function(){ 
            if(window.$L === Cookiez)
            {
                window.$L = _$L;
                window.Cookiez = _Cookiez;
            }
            return Cookiez;
        }

        window.Cookiez = window.$L = Cookiez;
    };
})(window);


