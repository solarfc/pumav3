"use strict";

var myWidth = window.innerWidth,
    myHeight = window.innerHeight;
console.log("width ".concat(myWidth, " \n height ").concat(myHeight));
document.querySelector('html').style.overflowY = 'hidden';

window.onload = function () {
  setTimeout(function () {
    document.querySelector('.loader').style.cssText = 'opacity: 0; z-index: -5;';
    document.querySelector('html').style.overflowY = 'scroll';
  }, 1500);
  /*
      increase date
   */

  var today = new Date(),
      tomorrow = new Date(),
      day,
      month,
      year,
      i = 3,
      period = document.querySelectorAll('h6 output'),
      catalogPeriod = document.querySelectorAll('.catalog__block-model ul li p output');
  tomorrow.setDate(today.getDate() + i);
  day = tomorrow.getDate() > 9 ? tomorrow.getDate() : "0".concat(tomorrow.getDate());
  month = tomorrow.getMonth() + 1 > 9 ? tomorrow.getMonth() + 1 : "0".concat(tomorrow.getMonth() + 1);
  year = tomorrow.getFullYear();

  for (var _i = 0; _i < period.length; _i++) {
    period[_i].innerHTML = "".concat(day, ".").concat(month, ".").concat(year.toString().slice(2));
  }

  for (var _i2 = 0; _i2 < catalogPeriod.length; _i2++) {
    catalogPeriod[_i2].innerHTML = "".concat(year, "-").concat(year + 1);
  }

  document.querySelector('h6.address output').innerHTML = year;
  /*
      fancybox settings
   */

  $.fancybox.defaults.loop = true;
  $.fancybox.defaults.animationEffect = "fade";
  /*
      form styler
   */

  $(function () {
    $('select').styler({
      selectSmartPositioning: false
    });
  });
  /*
      review slider
   */

  $('.review__content-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    rows: 0,
    speed: 300,
    arrow: true,
    prevArrow: $('.prev-arrow'),
    nextArrow: $('.next-arrow')
  });
  /*
      send feedback
   */

  var bodyFilter = document.querySelector('.body-filter'),
      openFeedback = document.querySelector('p.send'),
      closeFeedback = document.querySelector('span.close'),
      feedback = document.querySelector('.feedback'),
      feedbackTitle = document.querySelector('.feedback p'),
      feedbackForm = document.querySelector('.feedback form'),
      inputValue = document.querySelector('.feedback form input'),
      textareaValue = document.querySelector('.feedback form textarea'),
      changeForm = function changeForm() {
    inputValue.value = '';
    textareaValue.value = '';
    feedbackTitle.style.display = 'none';
    feedbackForm.style.display = 'block';
  },
      toggleFeedback = function toggleFeedback(toggle) {
    if (toggle === false) {
      document.querySelector('html').style.overflowY = 'hidden';
      bodyFilter.style.cssText = 'z-index: 9999; background: rgba(0, 0, 0, 0.8)';
      feedback.style.cssText = 'opacity: 1; z-index: 99999;   transform: translate(-50%, -50%) rotateX(0deg);';
    } else {
      document.querySelector('html').style.overflowY = 'scroll';
      bodyFilter.style.cssText = 'z-index: -5; background: rgba(0, 0, 0, 0)';
      feedback.style.cssText = 'opacity: 0; z-index: -5;   transform: translate(-50%, -50%) rotateX(-90deg);';
      setTimeout(changeForm, 500);
    }
  };

  inputValue.addEventListener('change', function () {
    inputValue.value;
  });
  textareaValue.addEventListener('change', function () {
    textareaValue.value;
  });
  feedbackForm.addEventListener('submit', function (e) {
    e.preventDefault();
    feedback.style.opacity = '0';
    setTimeout(function () {
      feedbackForm.style.display = 'none';
      feedbackTitle.style.display = 'block';
    }, 500);
    setTimeout(function () {
      feedback.style.opacity = '1';
    }, 600);
  });
  openFeedback.addEventListener('click', function () {
    toggleFeedback(false);
  });
  closeFeedback.addEventListener('click', function () {
    toggleFeedback(true);
  });
  bodyFilter.addEventListener('click', function () {
    toggleFeedback(true);
  });
  /*
      toggle bucket
   */

  var toggleBucket = function toggleBucket() {
    var bucket = document.querySelector('a.bucket'),
        topOfWindow = window.pageYOffset + innerHeight,
        catalogTopPosition = document.querySelector('.catalog').offsetTop,
        photoTopPosition = document.querySelector('.photo').offsetTop;

    if (topOfWindow > catalogTopPosition && topOfWindow < photoTopPosition) {
      bucket.style.cssText = 'opacity: 0; z-index: -5';
    } else {
      bucket.style.cssText = 'opacity: 1; z-index: 999';
    }
  };
  /*
      slow scroll
   */


  var slowScroll = function slowScroll(href) {
    $('a.to-order, a.bucket').on('click', function () {
      $('html, body').animate({
        scrollTop: href
      }, 800);
      return false;
    });
  };

  if (/iPhone|iPod|iPad|Android/i.test(navigator.userAgent)) {
    console.log($('#mobileorder').offset().top);
    console.log($('#mobile-order').offset().top);
    var href = $('#mobileorder').offset().top > $('#mobile-order').offset().top ? $('#mobileorder').offset().top - innerHeight : $('#mobile-order').offset().top;
    slowScroll(href);
    window.addEventListener('scroll', function () {
      toggleBucket();
    });
    window.addEventListener('resize', function () {
      toggleBucket();
    });
  } else {
    var _href = $('#catalog').offset().top;
    slowScroll(_href);
  }
};