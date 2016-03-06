//Cagify an image passed as a parameter
function cagifyImage(image) {
    //Send a message out to the background script to get cagification up and running
      chrome.runtime.sendMessage(
      {
          message: "cagifyMeCaptain",
          imageSRC: image.src
      },
      //The background script will respond with a beautify caged-up canvas URL
      function (response)
      {
          //Make a cool new image off of the canvas url
          var img = document.createElement("img");
          img.src = response.cagedImage;
          img.setAttribute("data-caged", "Caged");

          //Replace the original image with the better one!
          $(image).replaceWith(img);
      }
    );
}

//Scans the document for uncaged images so we can make them better
//TODO: This method is garbage and needs to be cleaned up.  Needs efficiency boosts!
function searchAndEnCage() {
    //Run through every image that hasn't already been cagified
    $("img[data-caged!='Caged']").each(function () {
        var h = $(this).height();
        var w = $(this).width();
        $(this).attr('data-caged', 'Caged');
        //If the height and width are > 0 the image is loaded it's time to spruce it up
        if (h > 0 && w > 0) {
            cagifyImage(this);
        }
        //Otherwise time to wait for the image to load
        else {
            $(this).load(function () {
                cagifyImage(this);
            });
        }
    });
    //Keep the good times rolling
    setTimeout(searchAndEnCage, 1);
}
searchAndEnCage();