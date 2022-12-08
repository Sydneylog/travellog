// enroll service worker
// if ('serviceWorker' in navigator){
//   navigator.serviceWorker
//   .register('./js/service_worker.js')
//   .then(function(){
//     console.log('서비스 워커가 등록됨');
//   })
// }







/** bottom_menu **/ 
/* width-recognition */
$(window).resize(function(){
  const windowWidth = $(window).width();
  if (windowWidth >= 800) {
    $(".bottom_menu_wrap").slideUp(0);
  } else{
    $(".bottom_menu_wrap").slideDown(0);
  }
});
/* height-recognition */
$(window).scroll(function(){
  const scrollHeight = $(window).scrollTop();
  if (scrollHeight > 80) {
    $(".bottom_menu_wrap").slideDown(0);
  } else {
    $(".bottom_menu_wrap").slideUp(0);
  }
})