 var mySwiper = new Swiper ('#headSlider .swiper-container', {
    // Optional parameters
    loop: true,
    slidePerview : 1,
    // If we need pagination
    pagination: {
      el: '#headSlider .swiper-pagination',
      clickable : 'true',
    },

    // Navigation arrows
    navigation: {
      nextEl: '#headSlider .swiper-button-next',
      prevEl: '#headSlider .swiper-button-prev',
    },
    autoplay: {
      delay: 5000,
    },
  });
