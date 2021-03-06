﻿/// <reference path="theme.js" />
var api_key = "5a49f9bc4403d5816d94e7ff13d464bf";
var setList = ["72157658900187533", "72157661201415862", "72157661162797856","72157661240915805","72157661207035702"];
var nitsetid = "72157658900187533";
var ucesetid = "72157661201415862";
var pmecsetid = "72157661162797856";
var trekkingid = "72157661240915805";
var campingId = "72157661207035702";
$(window).resize(function () {
    setTimeout(function () {   //calls click event after a certain time
        $container.masonry('layout');
    }, 1000);
});
$(document).ready(function () {
    GetFixedImgages();
    setTimeout(function () {   //calls click event after a certain time
        $container.masonry('layout');
    }, 10000);
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

function GetURL(setid)
{
    var URL = "https://api.flickr.com/services/rest/" +  // Wake up the Flickr API gods.
     "?method=flickr.photosets.getPhotos" +  // Get photo from a photoset. http://www.flickr.com/services/api/flickr.photosets.getPhotos.htm
     "&api_key=" + api_key +  // API key. Get one here: http://www.flickr.com/services/apps/create/apply/
     "&photoset_id=" + setid +  // The set ID.
     "&privacy_filter=1" +  // 1 signifies all public photos.
     "&per_page=100" + // For the sake of this example I am limiting it to 20 photos.
     "&format=json&nojsoncallback=1" +   // Er, nothing much to explain here.
     "&extras=original_format"; //original sizes of the images

    return URL;
}

function GetFixedImgages() {
    for (var i = 0; i < setList.length; i++) {
        // See the API in action here: http://www.flickr.com/services/api/explore/flickr.photosets.getPhotos
        $.getJSON(GetURL(setList[i]), function (data) {
            if (data.stat == 'ok') {
                $.each(data.photoset.photo, function (i, item) {
                    // Creating the image URL. Info: http://www.flickr.com/services/api/misc.urls.html
                    var img_src = "http://farm" + item.farm + ".static.flickr.com/" + item.server + "/" + item.id + "_" + item.secret + "_m.jpg";
                    var img_thumb = $("<img/>").attr("src", img_src).css("margin", "8px")
                    $("img[imageId='" + item.id + "']").attr("src", img_src);
                });
            }
        });
    }

    setTimeout(function () {   //calls click event after a certain time
        $container.masonry('layout');
    },5000);
}