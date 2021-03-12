function Cookie(){
    
    const MissingInputs = new Error("Missing inputs");
    const NoCookies = new Error("Cookie(s) was not found");
    const CookieUsed = new Error("Cookie alerady used");

    const Yesterday = new Date();
    Yesterday.setDate(Yesterday.getDate() - 1);

    const NextYear = new Date();
    NextYear.setDate(NextYear.getDate() + 365);

    function NoConflict(cookieName){

        try{
            
            this.GetCookie(cookieName);
            return false;
        }
        catch{
            
            return true;
        }
    }

    this.SetCookie = function(cookieName, cookieValue, expiryDate){

        if(NoConflict(cookieName) === true){
            
            this.EditCookie(cookieName, cookieValue, expiryDate);
        }
        else{

            throw CookieUsed;
        }
    }

    this.EditCookie = function(cookieName, cookieValue, expiryDate){

        if(arguments.length < 2){

            throw MissingInputs;
        }
        else{

            var ck = cookieName + '=' + cookieValue;
            if(expiryDate === "auto"){

                ck += ';expires=' + NextYear.toUTCString();
            }
            else if(expiryDate){

                var eDate = new Date();
                eDate.setTime(Date.parse(expiryDate));

                ck += ';expires=' + eDate.toUTCString();
            }
            document.cookie = ck + ';';
        }
    }

    this.GetCookie = function(cookieName){

        if(arguments.length < 1){

            throw MissingInputs;
        }
        else{

            var decodedCookie = document.cookie;
            var cArr = decodedCookie.split("; ");

            for(var i = 0; i < cArr.length; i++){

                var ck = cArr[i].split('=')[0];
                if(ck === cookieName){
                    
                    return cArr[i];
                }
            }

            return "=";
        }
    }

    this.GetCookieValue = function(cookieName){

        if(arguments.length < 1){

            throw MissingInputs;
        }
        else{

            var ck = this.GetCookie(cookieName);
            return ck.split('=')[1];
        }
    }

    this.DeleteCookie = function(cookieName){

        if(arguments.length < 1){

            throw MissingInputs;
        }
        else{

            var ck = this.GetCookie(cookieName);
            document.cookie = ck + ";expires=" + Yesterday.toUTCString();
        }
    }

    this.GetAllCookies = function(){

        var decodedCookie = document.cookie;
        if(decodedCookie === ''){

            throw NoCookies;
        }
        else{

            var cArr = decodedCookie.split("; ");
            return cArr;
        }
    }

    this.DeleteAllCookies = function(){

        var cArr = this.GetAllCookies();
        for(var i = 0; i < cArr.length; i++){

            var ck = cArr[i].split('=')[0];
            this.DeleteCookie(ck);
        }
    }
}
