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
  
  var mySwiper3 = new Swiper ('#album .swiper-container', {
    // Optional parameters
    loop: true,
    slidesPerView : 'auto',
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar',
    },
  });
 var mySwiper4 = new Swiper ('#nav1 .swiper-container', {
    // Optional parameters
    slidesPerView : 'auto',
    // If we need pagination
    scrollbar: {
      el: '.swiper-scrollbar',
      dragSize : 152,
      hide: false,
    },
  });

  var mySwiper5 = new Swiper ('#content-header .swiper-container', {
    // Optional parameters
    loop: true,
    slidesPerView : 'auto',
    centeredSlides: true,
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable : 'true',
    },
  });
