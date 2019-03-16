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
    //document.querySelector('#create_message_form').style.visibility = (username)? 'visible' : 'hidden';
  });

  window.addEventListener("load", function() {
    document
      .getElementById("sign_up_form")
      .addEventListener("submit", function(e) {
        e.preventDefault();
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        document.getElementById("sign_up_form").reset();
        backend.signUp(username, password, function(res, err) {});
      });
  });
})();
