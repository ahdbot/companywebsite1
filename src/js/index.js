

// window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');
import 'bootstrap/dist/css/bootstrap.min.css';
require('bootstrap/dist/js/bootstrap.bundle');
import "@fortawesome/fontawesome-free/js/all.min";

import "jquery/dist/jquery.js";
import '../sass/style.scss';


$(function() {
  $('.thumbnail2').hover(function() {
      $(this).find('.project-category').hide();
      $(this).find('.caption2').slideDown(250);
  },
  function(){
      $(this).find('.caption2').slideUp(250);
      $(this).find('.project-category').show();    
  }
  );

  let modalId = $('#image-gallery');

$(document)
  .ready(function () {

    loadGallery(true, 'a.thumbnail');

    //This function disables buttons when needed
    function disableButtons(counter_max, counter_current) {
      $('#show-previous-image, #show-next-image')
        .show();
      if (counter_max === counter_current) {
        $('#show-next-image')
          .hide();
      } else if (counter_current === 1) {
        $('#show-previous-image')
          .hide();
      }
    }

    /**
     *
     * @param setIDs        Sets IDs when DOM is loaded. If using a PHP counter, set to false.
     * @param setClickAttr  Sets the attribute for the click handler.
     */

    function loadGallery(setIDs, setClickAttr) {
      let current_image,
        selector,
        counter = 0;

      $('#show-next-image, #show-previous-image')
        .click(function () {
          if ($(this)
            .attr('id') === 'show-previous-image') {
            current_image--;
          } else {
            current_image++;
          }

          selector = $('[data-image-id="' + current_image + '"]');
          updateGallery(selector);
        });

      function updateGallery(selector) {
        let $sel = selector;
        current_image = $sel.data('image-id');
        $('#image-gallery-title')
          .text($sel.data('title'));
        $('#image-gallery-image')
          .attr('src', $sel.data('image'));
        disableButtons(counter, $sel.data('image-id'));
      }

      if (setIDs == true) {
        $('[data-image-id]')
          .each(function () {
            counter++;
            $(this)
              .attr('data-image-id', counter);
          });
      }
      $(setClickAttr)
        .on('click', function () {
          updateGallery($(this));
        });
    }
  });

// build key actions
$(document)
  .keydown(function (e) {
    switch (e.which) {
      case 37: // left
        if ((modalId.data('bs.modal') || {})._isShown && $('#show-previous-image').is(":visible")) {
          $('#show-previous-image')
            .click();
        }
        break;

      case 39: // right
        if ((modalId.data('bs.modal') || {})._isShown && $('#show-next-image').is(":visible")) {
          $('#show-next-image')
            .click();
        }
        break;

      default:
        return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
  });


});

var pathname = window.location.pathname;

console.log(pathname);

$('.navbar-nav > li a[href="'+pathname+'"]').parent().addClass('active');

if (pathname == "/blog-details.html" || pathname == "/add.blog.html") {
  $('.navbar-nav > li > a[href="/blog.html"').parent().addClass('active');
}

if (pathname == "/project-details.html" ){
  $('.navbar-nav > li > a[href="/projects.html"').parent().addClass('active');
}

let date = new Date();
let year = date.getFullYear();
document.getElementById("date").innerHTML = year;


