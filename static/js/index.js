(function(){
    "use strict";
        
    window.addEventListener('load', function(){
        document.getElementById('sign_up_form').addEventListener('submit', function(e){
            e.preventDefault();
            let username = document.getElementById('username').value;
            let password = document.getElementById('password').value;
            document.getElementById('sign_up_form').reset();
            backend.signUp(username, password, function(res, err){});
        });
    });
    
}());

