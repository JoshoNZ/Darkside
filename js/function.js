/* 
* Header Slidedown Effect Start 
*/
document.querySelector('.hamburger-button').addEventListener('click', function () {

  document.querySelector('.hamburger-animated').classList.toggle('open');

  $('.dropdown').on('show.bs.dropdown', function (e) {
    $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
  });

  $('.dropdown').on('hide.bs.dropdown', function (e) {
    $(this).find('.dropdown-menu').first().stop(true, true).slideUp(200);
  });
});
/* 
* Header Slidedown Effect End
*/
/* 
/* 
* Fade In Effect Start
*/
$(document).on("scroll", function() {
    var pageTop = $(document).scrollTop();
    var pageBottom = pageTop + $(window).height();
    var tags = $(".fade-in-section");
  
    for (var i = 0; i < tags.length; i++) {
      var tag = tags[i];
  
      if ($(tag).position().top < pageBottom) {
        $(tag).addClass("visible");
      } else {
        $(tag).removeClass("visible");
      }
    }
  });
  /* 
  * Fade In Effect End 
  */