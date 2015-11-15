////////////////////////////////////////////////////////////////
// Page preloader (display loading animation while page loads)
////////////////////////////////////////////////////////////////
var $container;
// Wait for window load
$(window).load(function() {
    // Animate loader off screen
    $("#preloader").fadeOut("slow");
});



//////////////////////////////////////////////////////////////////////////////////////////
// Off canvas menu (more info: http://codyhouse.co/gem/secondary-expandable-navigation/)
//////////////////////////////////////////////////////////////////////////////////////////

jQuery(document).ready(function($){
    var $lateral_menu_trigger = $('#cd-menu-trigger'),
        $content_wrapper = $('#body-content'),
        $navigation = $('header');

    //open-close lateral menu clicking on the menu icon
    $lateral_menu_trigger.on('click', function(event){
        event.preventDefault();
        
        $lateral_menu_trigger.toggleClass('is-clicked');
        $navigation.toggleClass('lateral-menu-is-open');
        $content_wrapper.toggleClass('lateral-menu-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
            // firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
            $('body').toggleClass('overflow-hidden');
        });
        $('#cd-lateral-nav').toggleClass('lateral-menu-is-open');
        
        //check if transitions are not supported - i.e. in IE9
        if($('html').hasClass('no-csstransitions')) {
            $('body').toggleClass('overflow-hidden');
        }
    });

    //close lateral menu clicking outside the menu itself
    $content_wrapper.on('click', function(event){
        if( !$(event.target).is('#cd-menu-trigger, #cd-menu-trigger span') ) {
            $lateral_menu_trigger.removeClass('is-clicked');
            $navigation.removeClass('lateral-menu-is-open');
            $content_wrapper.removeClass('lateral-menu-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                $('body').removeClass('overflow-hidden');
            });
            $('#cd-lateral-nav').removeClass('lateral-menu-is-open');
            //check if transitions are not supported
            if($('html').hasClass('no-csstransitions')) {
                $('body').removeClass('overflow-hidden');
            }

        }
    });

    //close lateral menu clicking on link
    $(".sub-menu > li > a, .cd-single-item-wrapper > li > a").click(function(e){
        $lateral_menu_trigger.removeClass('is-clicked');
        $navigation.removeClass('lateral-menu-is-open');
        $content_wrapper.removeClass('lateral-menu-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
            $('body').removeClass('overflow-hidden');
        });
        $('#cd-lateral-nav').removeClass('lateral-menu-is-open');
        //check if transitions are not supported
        if($('html').hasClass('no-csstransitions')) {
            $('body').removeClass('overflow-hidden');
        }
        e.stopPropagation();
    });

    //open (or close) submenu items in the lateral menu. Close all the other open submenu items.
    $('.item-has-children').children('a').on('click', function(event){
        event.preventDefault();
        $(this).toggleClass('submenu-open').next('.sub-menu').slideToggle(200).end().parent('.item-has-children').siblings('.item-has-children').children('a').removeClass('submenu-open').next('.sub-menu').slideUp(200);
    });
});



/////////////////////////////////////////////////////////////////////
// jQuery for page scrolling feature - requires jQuery Easing plugin
/////////////////////////////////////////////////////////////////////

$('.page-scroll').bind('click', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top -14
    }, 1500, 'easeInOutExpo');
    event.preventDefault();
});



/////////////////////////////////////////////////////////////////////////////////////////
// Stellar - parallax effect (more info: http://markdalgleish.com/projects/stellar.js)
////////////////////////////////////////////////////////////////////////////////////////

$(function() {  
    $(window).stellar({
        horizontalScrolling: false
    });
});



///////////////////////////////////////////////////////////////////////////////
// YTPlayer (BG Youtube video): https://github.com/pupunzi/jquery.mb.YTPlayer
///////////////////////////////////////////////////////////////////////////////

$(function(){
if (!jQuery.browser.mobile)
    $(".youtube-bg").mb_YTPlayer();
});



////////////////////////////////////////////////////////////////////
// OWL Carousel (more info: http://www.owlcarousel.owlgraphic.com)
////////////////////////////////////////////////////////////////////

// intro carousel
$(document).ready(function(){
    $('.intro-carousel').owlCarousel({
        items: 1,
        loop: true,
        margin: 0,
        autoplay: true,
        autoplayTimeout: 8000,
        autoplayHoverPause: true,
        autoplaySpeed: 600,
        nav: true,
        navText: ['<i class="fa fa-arrow-left"></i>', '<i class="fa fa-arrow-right"></i>'],
        navSpeed: 600,
        dots: true,
        dotsSpeed: 600
    })
});

// testimonial carousel
$(document).ready(function(){
    $('.testimonial-carousel').owlCarousel({
        items: 1,
        loop: true,
        margin: 0,
        autoplay: true,
        autoplayTimeout: 8000,
        autoplayHoverPause: true,
        autoplaySpeed: 600,
        nav: false,
        navText: ['<i class="fa fa-arrow-left"></i>', '<i class="fa fa-arrow-right"></i>'],
        navSpeed: 600,
        dots: true,
        dotsSpeed: 600
    })
});

// clients carousel
$(document).ready(function(){
    $('.clients-carousel').owlCarousel({
        loop: true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 8000,
        autoplayHoverPause: true,
        autoplaySpeed: 600,
        nav: false,
        navText: ['<i class="fa fa-arrow-left"></i>', '<i class="fa fa-arrow-right"></i>'],
        navSpeed: 600,
        dots: false,
        dotsSpeed: 600,
        responsive: {
            0: {
                items: 1,
            },
            480: {
                items: 2,
            },
            768: {
                items: 3,
            },
            992: {
                items: 4,
            },
            1200: {
                items: 5,
            }
        }
    })
});

// article carousel
$(document).ready(function(){
    $('.article-carousel').owlCarousel({
        center: false,
        loop: true,
        margin: 0,
        autoplay: true,
        autoplayTimeout: 8000,
        autoplayHoverPause: true,
        autoplaySpeed: 600,
        nav: true,
        navText: ['<i class="fa fa-arrow-left"></i>', '<i class="fa fa-arrow-right"></i>'],
        navSpeed: 600,
        dots: false,
        dotsSpeed: 600,
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 2,
            },
            992: {
                items: 3,
            },
            1200: {
                items: 4,
            }
        }
    })
});



/////////////////////////////////////////////////////////////////////////////////
// Masonry: http://masonry.desandro.com
// Imagesloaded: http://masonry.desandro.com/appendix.html#imagesloaded
// Code example: https://github.com/mconventi/integrating-bootstrap-and-masonry
/////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
    //Init jQuery Masonry layout
    init_masonry();
});

function init_masonry(){
    $container = $('.masonry');

    $container.imagesLoaded( function(){
        $container.masonry({
          itemSelector: '.masonry .box',
          isAnimated: true
        });        
    });
}



////////////////////////////////////////////////////////////////////////////////////////////
// Counter-Up (requires jQuery waypoints.js plugin): https://github.com/bfintal/Counter-Up
////////////////////////////////////////////////////////////////////////////////////////////

$('.counter').counterUp({
    delay: 10,
    time: 2000
});



//////////////////////////////////////////////////////////////////////////////////////////////////
//
// Deferring embed videos (Youtube, Vimeo).
// 
// When you have videos from Youtube, Vimeo or just about any other provider embedded 
// in your webpages it causes your page to load slower. Just about every video can be deferred 
// until after your initial pageload which will allow your page to load quickly 
// without having to gather all the files and resources that the video is requesting.
//
// More info: https://www.feedthebot.com/pagespeed/defer-videos.html
//
//////////////////////////////////////////////////////////////////////////////////////////////////

function init() {
var vidDefer = document.getElementsByTagName('iframe');
for (var i=0; i<vidDefer.length; i++) {
if(vidDefer[i].getAttribute('data-src')) {
vidDefer[i].setAttribute('src',vidDefer[i].getAttribute('data-src'));
} } }
window.onload = init;



/////////////////////////
// Scroll to top button
/////////////////////////

// Check to see if the window is top if not then display button
$(window).scroll(function(){
    if ($(this).scrollTop() > 800) {
        $('.scrolltotop').fadeIn();
    } else {
        $('.scrolltotop').fadeOut();
    }
});

// Click event to scroll to top
$('.scrolltotop').click(function(){
    $('html, body').animate({scrollTop : 0}, 1500, 'easeInOutExpo');
    return false;
});
