// enroll service worker
// if ('serviceWorker' in navigator){
//   navigator.serviceWorker
//   .register('./js/service_worker.js')
//   .then(function(){
//     console.log('서비스 워커가 등록됨');
//   })
// }

const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'vertical',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  slidesPerView: 1,
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: false

});