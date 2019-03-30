(function() {
  "use strict";

   function createConcertThumbnail(url, name){
    return '<li href="url">
        name
        <button id="watchButton" class="btn">Watch</button>
      </li>'
   }

   function createVideoView(url){
       return '<video id="my-video" class="video-js vjs-default-skin" preload="auto" autoplay="autoplay" crossOrigin="anonymous" width="100%" height="100%" data-setup="{}" controls playsinline webkit-playsinline>
  <source src="url" type="video/mp4"> <script src="../bundle.js" ></script>'
   }

  window.addEventListener("load", function() {
    backend.getPaidForVideos(0, 100, function(err, res) {
        let concert;
        for(concert in res){
            document.getElementById("listMyConcerts").innerHTML += createConcertThumbnail(concert.url, concert.title);
        }
    });
  });
})();
