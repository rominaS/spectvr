(function() {
  "use strict";

   function createConcertThumbnail(id, name){
    return '<li onclick="createVideoView(' + id + ')">'
        + name
        + '<button id="watchButton" class="btn">Watch</button>'
      + '</li>';
   }

   function createVideoView(id){
       backend.getVideo( id, function(err, res) { document.getElementById("listMyConcerts").innerHTML = '<video id="my-video" class="video-js vjs-default-skin" preload="auto" autoplay="autoplay" crossOrigin="anonymous" width="100%" height="100%" data-setup="{}" controls playsinline webkit-playsinline>' 
  + '<source src="' + res.url + '" type="' + res.mimeType + '"> <script src="../bundle.js" ></script>';);
   }

  window.addEventListener("load", function() {
    backend.getPaidForVideos(0, 100, function(err, res) {
        let concert;
        for(concert in res){
            document.getElementById("listMyConcerts").innerHTML += createConcertThumbnail(concert.id, concert.title);
        }
    });
  });
})();
