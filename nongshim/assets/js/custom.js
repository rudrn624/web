 var mySwiper = new Swiper ('#banner .swiper-container', {
    // Optional parameters
    loop: true,

    // If we need pagination
    pagination: {
      el: '#banner .swiper-pagination',
      clickable : 'true',
    },

    // Navigation arrows
    navigation: {
      nextEl: '#banner .swiper-button-next',
      prevEl: '#banner .swiper-button-prev',
    },
    autoplay: {
      delay: 5000,
    },
  });

  var mySwiper2 = new Swiper ('.notice .swiper-container', {
    // Optional parameters
    loop: true,
    spaceBetween: 60,
    slidesPerView: 'auto',
    centeredSlides: true
    
  });