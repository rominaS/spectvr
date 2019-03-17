let api = (function() {
  "use strict";
  function send(method, url, data, callback) {
    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
      if (xhr.status !== 200)
        callback("[" + xhr.status + "]" + xhr.responseText, null);
      else callback(null, JSON.parse(xhr.responseText));
    };
    xhr.open(method, url, true);
    if (!data) xhr.send();
    else {
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify(data));
    }
  }

  let module = {};
  let errorListeners = [];
  let userListeners = [];

  function notifyErrorListeners(err) {
    errorListeners.forEach(function(listener) {
      listener(err);
    });
  }

  module.onError = function(listener) {
    errorListeners.push(listener);
  };

  let getUsername = function() {
    return document.cookie.replace(
      /(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
  };

  function notifyUserListeners(username) {
    userListeners.forEach(function(listener) {
      listener(getUsername());
    });
  }

  module.onUserUpdate = function(listener) {
    userListeners.push(listener);
    listener(getUsername());
  };

  module.signin = function(username, password) {
    send("POST", "/signin", { username, password }, function(err, res) {
      if (err) return notifyErrorListeners(err);
      notifyUserListeners(getUsername());
    });
  };

  //   Take away comments after testing

  // (function refresh(){
  //     setTimeout(function(e){
  //         notifyMessageListeners();
  //         refresh();
  //     }, 2000);
  // }());

  return module;
})();
