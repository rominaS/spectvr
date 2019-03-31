(function() {
  "use strict";

  api.onError(function(err) {
    console.error("[error]", err);
  });

  api.onError(function(err) {
    var error_box = document.querySelector("#error_box");
    error_box.innerHTML = err;
    error_box.style.visibility = "visible";
  });

  api.onUserUpdate(function(username) {
    document.querySelector("#signin_button").style.visibility = username
      ? "hidden"
      : "visible";
    document.querySelector("#signout_button").style.visibility = username
      ? "visible"
      : "hidden";
  });

  window.addEventListener("load", function() {
    document
      .getElementById("sign_up_form")
      .addEventListener("submit", function(e) {
        e.preventDefault();
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        document.getElementById("sign_up_form").reset();
        console.log(button);
        if(button == "signup"){
            backend.signUp(username, password, function(res, err) {});
        } else {
            backend.signIn(username, password, function(res, err) {});
        }
      });
    let button = "";

    document.getElementById("signup").addEventListener("click", function(){
      button = "signup";
    });

    document.getElementById("signin").addEventListener("click", function(){
      button = "signin";
    });
  });
})();
