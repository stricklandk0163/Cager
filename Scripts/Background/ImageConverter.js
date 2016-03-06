//Takes an image from the image nabber passed as a request and makes it cool
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
      //Make sure this is the request you're looking for
      if (request.message == "cagifyMeCaptain") {
          //Make a canvas to draw a beautiful picture on
          var canvas = document.createElement("canvas");
          var canvasContext = canvas.getContext("2d");

          //Bring in nicks face to perform the transformation
          var theFaceOfAKing = document.createElement("img");
          theFaceOfAKing.src = "NickCage.png";

          //Bring in the picture from the request so it can begin it's metamorphousous into something more beautiful
          var img = document.createElement("img");
          img.src = request.imageSRC;

          //When the image loads it's time to ambush it and make it better
          img.addEventListener("load", function () {
              //Draw the not yet beautiful image to the canvas
              canvas.width = img.width;
              canvas.height = img.height;
              canvasContext.drawImage(img, 0, 0);

              //Track the faces of the soon to be cage drones using the tracking js library (This is really cool by the way check it out on github)
              var tracker = new tracking.ObjectTracker(['face']);
              tracker.on('track', function (event) {
                  event.data.forEach(function (rect) {
                      //Draw double size nick heads over the faces of those he is taking over
                      width = rect.width * 2;
                      height = rect.height * 2;
                      x = rect.x - width/4;
                      y = rect.y - height/4;
                      canvasContext.drawImage(theFaceOfAKing, x, y, width, height);
                  });
                  canvasContext.stroke();

                  //Send the beautiful new picture back to the main image replacer
                  sendResponse({ cagedImage: canvas.toDataURL() });
              });

              //Run the tracker on the c
              tracking.track(img, tracker);
              
          });
      }
      return true; // Required for async sendResponse()
    }
 
)