/**service_worker**/



/**mobile_menu**/
/*mobile_toggle*/
$(".mobile_list").click(function(){
  $(".mobile_menu").fadeToggle()
});

/*arcordian_menu*/
$(".mobile_menu_list").click(function(){
  $(this).children('ul').slideToggle();
});
/*width-recognition*/
$(window).resize(function(){
  const windowWidth = $(window).width();
  if (windowWidth >= 768) {
    $(".mobile_menu legend").addClass("blind");
    $(".mobile_menu").show();
  } 
  if (windowWidth < 768) {
    $(".mobile_menu legend").removeClass("blind");
    $(".mobile_menu").hide();
  }
});


/** bottom_menu **/ 
/* width-recognition */
$(window).resize(function(){
  const windowWidth = $(window).width();
  if (windowWidth >= 768) {
    $(".bottom_menu_wrap").slideUp(0);
  } else{
    $(".bottom_menu_wrap").slideDown(0);
  }
});
/* height-recognition */
$(window).scroll(function(){
  const windowWidth = $(window).width();
  const scrollHeight = $(window).scrollTop();
  if (scrollHeight > 80 && windowWidth < 768) {
    $(".bottom_menu_wrap").slideDown(0);
  } else {
    $(".bottom_menu_wrap").slideUp(0);
  }
})
