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
           + " <!-- "
          + "  <form action='/charge' method='POST'>"
           + "   <script"
            + "    src='https://checkout.stripe.com/checkout.js'"
            + "    class='stripe-button'"
           + "     data-key='{{ pk_test_DkVbtkiYZlw3Pycj7dkwC4hM00UZQijvA9 }}'"
           + "     data-amount='5000'"
          + "      data-name='concert ticket'"
            + "    data-description='VR Concert ticket'"
            + "    data-image=''"
           + "     data-locale='auto'"
           + "   ></script>"
          + "  </form> -->"
          + "  <button"
           + "   class='btn btn-primary shop-item-button'"
         + "     type='button'"
          + "    id='buyConcert'"
          + "  >"
          + "    Buy VR Concert Ticket"
         + "   </button>"
       + "   </div>"
      + "  </div>"
      + "</div> </section>"
   }

  window.addEventListener("load", function() {
    backend.getVideos(0, 100, function(err, res) {
        console.log("here");
        document.getElementById("displayCart").innerHTML = "";
        let concert;
        for(concert in res){
            document.getElementById("displayCart").innerHTML += createConcertThumbnail(concert.url, concert.title);
        }
    });
  });
})();
