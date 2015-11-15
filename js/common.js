/// <reference path="theme.js" />
var api_key = "5a49f9bc4403d5816d94e7ff13d464bf";
var nitsetid = "72157658900187533";

$(window).resize(function () {
    setTimeout(function () {   //calls click event after a certain time
        $container.masonry('layout');
    }, 1000);
});
$(document).ready(function () {
    GetFixedImgages();
});

function LoopAndFetchImages()
{
    $(".galleryImage").each(function () {
        var imageid = $(this).attr("imageid");
        if (imageid !== 'undefined' && imageid != null && imageid != "")
        {
            GetImgs(imageid, $(this))
        }
    });
}

function GetURL()
{
    var URL = "https://api.flickr.com/services/rest/" +  // Wake up the Flickr API gods.
     "?method=flickr.photosets.getPhotos" +  // Get photo from a photoset. http://www.flickr.com/services/api/flickr.photosets.getPhotos.htm
     "&api_key=" + api_key +  // API key. Get one here: http://www.flickr.com/services/apps/create/apply/
     "&photoset_id=" + nitsetid +  // The set ID.
     "&privacy_filter=1" +  // 1 signifies all public photos.
     "&per_page=100" + // For the sake of this example I am limiting it to 20 photos.
     "&format=json&nojsoncallback=1" +   // Er, nothing much to explain here.
     "&extras=original_format"; //original sizes of the images

    return URL;
}

function GetFixedImgages() {
    // See the API in action here: http://www.flickr.com/services/api/explore/flickr.photosets.getPhotos
    $.getJSON(GetURL(), function (data) {
        if (data.stat == 'ok') {
            $.each(data.photoset.photo, function (i, item) {
                // Creating the image URL. Info: http://www.flickr.com/services/api/misc.urls.html
                var img_src = "http://farm" + item.farm + ".static.flickr.com/" + item.server + "/" + item.id + "_" + item.secret + "_m.jpg";
                var img_thumb = $("<img/>").attr("src", img_src).css("margin", "8px")
                $("img[imageId='" + item.id + "']").attr("src", img_src);               
            });

            setTimeout(function () {   //calls click event after a certain time
                $container.masonry('layout');
            }, 1000);
        }
    });

}