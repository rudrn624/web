 var mySwiper = new Swiper ('#album .swiper-container', {
    // Optional parameters
    loop: true,
    slidesPerView : 'auto',
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar',
    },
  });
 var mySwiper2 = new Swiper ('#nav .swiper-container', {
    // Optional parameters
    slidesPerView : 'auto',
    // If we need pagination
    scrollbar: {
      el: '.swiper-scrollbar',
      dragSize : 152,
      hide: false,
    },
  });
