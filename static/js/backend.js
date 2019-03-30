let backend = (function(){
    "use strict";
    
    let module = {};
    
    function sendFiles(method, url, data, callback){
        let formdata = new FormData();
        Object.keys(data).forEach(function(key){
            let value = data[key];
            formdata.append(key, value);
        });
        let xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (xhr.status !== 200) callback("[" + xhr.status + "]" + xhr.responseText, null);
            else callback(null, JSON.parse(xhr.responseText));
        };
        xhr.open(method, url, true);
        xhr.send(formdata);
    }
    
    function send(method, url, data, callback){
        let xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (xhr.status !== 200) callback("[" + xhr.status + "]" + xhr.responseText, null);
            else callback(null, JSON.parse(xhr.responseText));
        };
        xhr.open(method, url, true);
        if (!data) xhr.send();
        else{
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));
        }
    }
    
    module.signUp = function(username, password, callback){
        send("POST", "/signup/", {username, password}, function(err, res){
             callback(err, res);
        });
    };
    

    /*let getUsers = function(callback){
        send("GET", "/api/users/", null, callback);
    };*/
    
    module.getVideo(id, callback){
       send("GET", "/videos/"+id, null, callback);
    }

    module.getVideos(page, limit, callback){
       send("GET", "/allVideos/"+page+"/"+limit, null, callback);
    }


    module.getPaidForVideos(page, limit, callback){
       send("GET", "/paidVideos/"+page+"/"+limit, null, callback);
    }
    
    return module;
}());
