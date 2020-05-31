var swiper = new Swiper('.serviceList.swiper-container', {
  slidesPerView: 3,
  spaceBetween: 40,
});
var swiper1 = new Swiper('.slideContentinner .swiper-container', {
  slidesPerView: 'auto',
  spaceBetween: 40,
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
  },
});