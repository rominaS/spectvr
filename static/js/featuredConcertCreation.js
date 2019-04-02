(function() {
  "use strict";

   function createConcertThumbnail(url, name, artistName, date, time, price){
    return "    <section class='container content-section'><div class='shop-items'>"+
        +"<div class='shop-item'>"
         + "<span class='shop-item-title' name='concertName'"
            + ">"+name+"</span"
          + ">"
          + "<img"
            + "class='shop-item-image'"
            + "alt='concert-img'"
            + "src='" + url + "'"
          + "/>"
          + "<div class='shop-item-details'>"
           + " <span class='' name='artistName'>"+artistName+" </span>"
           + " <span class='' name='concertDate'>"+ date+"</span>"
           + " <span class='' name='concertTime'>"+time+"</span>"
           + " <span class='shop-item-price'>$"+price +"</span>"
           + "<a href='/concertPage.html' id='buyConcert'>"
           +  " Buy Ticket"
           + "</a>"
       + "   </div>"
      + "  </div>"
      + "</div> </section>"
   }
  window.addEventListener("load", function() {
    backend.getVideos(0, 100, function(err, res) {
        document.getElementById("featuredConcerts").innerHTML = "";
        let concert;   
        console.log(res);
        for(concert in res){
            document.getElementById("featuredConcerts").innerHTML += createConcertThumbnail(concert.url, concert.title, concert.artist, concert.from, concert.fromTime, concert.price);
        }
    });
  });
})();
