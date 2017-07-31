(function (window, $) {
  'use strict';

  // STARBUCKS OBJECT
  var _sb = _sb || {};

  // DOCUMENT READY
  $(function () {
    init();
    initEvent();
  });

  // INIT
  function init() {
    _sb.$header = $('header');
    _sb.headerHeight = _sb.$header.height();
    _sb.mainMenuList = $('.main-menu > ul > li');
    _sb.$search = $('.search');
    _sb.$searchInput = _sb.$search.find('input');
    _sb.$searchBtn = _sb.$search.find('img');
    _sb.searchValue = '';
    _sb.ENTER_KEY = 13;
    _sb.$promotion = $('.promotion .inner');
    _sb.$togglePromotionBtn = $('.notice-line .toggle-promotion');
  }

  // INIT EVENT
  function initEvent() {
    toggleTopCard();
    animateToggleTopCardBtn();
    toTopBtnHandler();
    megaMenuHandler();
    searchHandler();
    firstTimeAnimations();
    sliderHandler();
    togglePromotionHandler();
    playTogglePromotionBtn();
    checkScrollLocate();
    checkSectionOffsetTop();
    setReturnToPosition();
    pluginNiceScroll();
  }

  function toggleTopCard() {
    $('.toggle-top-card').on({
      click: function () {
        $('.top-card').slideToggle();
      },
      mouseenter: function () {
        animateToggleTopCardBtn();
      }
    });
  }

  function animateToggleTopCardBtn() {
    // SET
    TweenMax.killChildTweensOf('.toggle-top-card');
    var cup = '.toggle-top-card .cup';
    var star = '.toggle-top-card .star';

    TweenMax.set(cup, { y: 44 });
    TweenMax.set(star, { y: -44, opacity: .6 });

    // PLAY
    TweenMax.to(cup, 1.5, { y: 5, ease: Back.easeOut.config(2) });

    var ani = new TimelineMax({ delay: .6 });
    ani.to(star, .8, { x: -12, y: -4, ease: Back.easeOut.config(2) })
      .to(star, .8, { x: -2, y: 0, ease: Back.easeOut.config(2) })
      .to(star, .4, { opacity: 1, yoyo: true, repeat: 7 }, '-=1.6');
  }

  function megaMenuHandler() {
    _sb.mainMenuList.on({
      mouseenter: function () {
        openMegaMenu($(this), 250);
      },
      mouseleave: function () {
        closeMegaMenu($(this), 250);
      }
    });
  }

  function openMegaMenu($this, duration) {
    $this.addClass('on');

    var megaHeight = $this.find('.mega-menu').height();
    _sb.$header
      .css({ borderBottomColor: '#2c2a29' })
      .stop()
      .animate({
        height: _sb.headerHeight + megaHeight
      }, duration);
  }

  function closeMegaMenu($this, duration) {
    $this.removeClass('on');

    _sb.$header
      .css({ borderBottomColor: '#c8c8c8' })
      .stop()
      .animate({
        height: _sb.headerHeight
      }, duration);
  }

  function searchHandler() {
    _sb.$searchInput.on({
      focus: function () {
        focusSearch(600);
      },
      blur: function () {
        blurSearch(600);
      },
      keydown: function (event) {
        submitSearch($(this), event);
      }
    });

    _sb.$searchBtn.on('click', function () {
      _sb.$searchInput.focus();
      focusSearch(600);
    });
  }

  function focusSearch(duration) {
    var maxWidth = 182;

    _sb.$search.stop().animate({ width: maxWidth }, duration);
    _sb.$searchBtn.stop(false, true).fadeOut(duration);
    _sb.$searchInput
      .stop()
      .animate({ width: maxWidth }, duration)
      .attr('placeholder', '통합검색');

    if (_sb.searchValue !== '') {
      _sb.$searchInput.val(_sb.searchValue);
    }
  }

  function blurSearch(duration) {
    var minWidth = 38;

    _sb.$search.stop().animate({ width: minWidth }, duration);
    _sb.$searchBtn.stop(false, true).fadeIn(duration);
    _sb.searchValue = _sb.$searchInput.val();
    _sb.$searchInput
      .stop()
      .animate({ width: minWidth }, duration)
      .val('')
      .attr('placeholder', '');
  }

  function submitSearch($this, event) {
    switch (event.which) {
      case _sb.ENTER_KEY:
        console.log('SEARCH: ' + $this.val());
        break;
    }
  }

  function firstTimeAnimations() {
    $('.visual .fade-in').each(function (index) {
      TweenMax.to(this, 1, { delay: (index + 1) * .7, opacity: 1 });
    });

    floatingObject('.beans .icon1', 1.5, 2.5, 1, 15);
    floatingObject('.beans .icon2', 1.5, 2.5, .5, 15);
    floatingObject('.beans .icon3', 1.5, 2.5, 1.5, 20);
  }

  function sliderHandler() {
    $('.notice-line .slider > ul').bxSlider({
      mode: 'vertical',
      pager: false,
      controls: false,
      auto: true,
      pause: 5000
    });

    _sb.promotionSlider = $('.promotion .slider > ul').bxSlider({
      slideMargin: 10,
      pager: true,
      pagerSelector: '.promotion .pager',
      controls: false,
      autoControls: true,
      startText: '',
      stopText: '',
      autoControlsCombine: true,
      autoControlsSelector: '.promotion .auto-controls',
      auto: true,
      pause: 5000,
      minSlides: 1,
      maxSlides: 3,
      moveSlides: 1,
      slideWidth: 819,
      onSliderLoad: function (currentIndex) {
        $('.promotion .slider li').removeClass('active');
        $('.promotion .slider li.first').addClass('active');
      },
      onSlideAfter: function ($slideElement, oldIndex, newIndex) {
        $('.promotion .slider li').removeClass('active');
        $slideElement.addClass('active');
      }
    });

    $('.promotion .prev').on('click', function () {
      _sb.promotionSlider.goToPrevSlide();
      _sb.promotionSlider.stopAuto();
    });
    $('.promotion .next').on('click', function () {
      _sb.promotionSlider.goToNextSlide();
      _sb.promotionSlider.stopAuto();
    });

    _sb.awardSlider = $('.award .slider ul').bxSlider({
      slideMargin: 35,
      pager: false,
      controls: false,
      auto: true,
      minSlides: 5,
      maxSlides: 5,
      moveSlides: 1,
      slideWidth: 192
    });

    $('.award .prev').on('click', function () {
      _sb.awardSlider.goToPrevSlide();
      _sb.awardSlider.stopAuto();
      restartAwardSlider();
    });
    $('.award .next').on('click', function () {
      _sb.awardSlider.goToNextSlide();
      _sb.awardSlider.stopAuto();
      restartAwardSlider();
    });
  }

  function togglePromotionHandler() {
    _sb.$togglePromotionBtn.on('click', function () {
      if (_sb.$promotion.data('opened') === 'opened') {
        closePromotion();
      } else {
        openPromotion();
      }
    });
  }

  function openPromotion() {
    _sb.$promotion
      .stop(false, true)
      .slideDown(400, function () {
        $('html').getNiceScroll().resize();
      })
      .data({ opened: 'opened' });
    _sb.promotionSlider.reloadSlider();
    pauseTogglePromotionBtn();
  }

  function closePromotion() {
    _sb.$promotion
      .stop(false, true)
      .slideUp(400, function () {
        _sb.promotionSlider.destroySlider();
      })
      .data({ opened: '' });
    playTogglePromotionBtn();
  }

  function playTogglePromotionBtn() {
    TweenMax.set(_sb.$togglePromotionBtn, { scale: .9 });
    TweenMax.to(_sb.$togglePromotionBtn, .5, { rotation: 0 });
    _sb.toggleZoom = TweenMax.to(_sb.$togglePromotionBtn, 1, { scale: 1.1, repeat: -1, yoyo: true });
  }

  function pauseTogglePromotionBtn() {
    TweenMax.set(_sb.$togglePromotionBtn, { scale: 1 });
    TweenMax.to(_sb.$togglePromotionBtn, .5, { rotation: -180 });
    _sb.toggleZoom.pause();
  }

  function restartAwardSlider() {
    setTimeout(function () {
      _sb.awardSlider.startAuto();
    }, 3000);
  }

  function random(min, max) {
    return parseFloat(
      (Math.random() * (max - min) + min)
        .toFixed(2)
    );
  }

  function floatingObject(selector, minTime, maxTime, delay, size) {
    TweenMax.to(selector, random(minTime, maxTime), { delay: random(0, delay), y: size, repeat: -1, yoyo: true, ease: Power0.easeNone });
  }

  function checkScrollLocate() {
    $(window).on('scroll', function () {
      _sb.scrollLocate = $(this).scrollTop() + ($(this).height() / 2);

      checkCurrentSection();
    });
  }

  function checkSectionOffsetTop() {
    _sb.secOffsetTop = [];
    $('.section').each(function () {
      _sb.secOffsetTop.push($(this).offset().top);
    });
  }

  function checkCurrentSection() {
    var secLength = _sb.secOffsetTop.length;

    for (var i = 0; i < secLength; i++) {
      if (_sb.scrollLocate >= _sb.secOffsetTop[i] && _sb.scrollLocate < _sb.secOffsetTop[i + 1]) {
        if (_sb.currentSecIndex === i) {
          return;
        } else {
          _sb.currentSecIndex = i;
          console.log('Current section is ' + i);

          changeSectionHandler(i);
        }
      }
    }
  }

  function changeSectionHandler(currentSection) {
    returnToPosition('.season-product', 1, currentSection, 4);
    returnToPosition('.reserve', 1, currentSection, 5);
    returnToPosition('.favorite', 1, currentSection, 6);
    returnToPosition('.find-store', 1, currentSection, 8);

    resetReturnToPosition(currentSection);
    toggleToTop(currentSection);
  }

  function setReturnToPosition() {
    $('.return-to-position').each(function () {
      var x = 100;

      if ($(this).hasClass('to-right')) {  // 왼쪽에서 오른쪽으로
        x = Math.abs(x);
      } else if ($(this).hasClass('to-left')) {  // 오른쪽에서 왼쪽으로
        x *= -1;  // x = x * -1; 와 동일합니다.
      }

      TweenMax.set(this, { x: -x, opacity: 0 });
    });
  }

  function returnToPosition(sectionSelector, duration, currentSection, whichSectionIndex) {
    if (currentSection === whichSectionIndex) {
      $(sectionSelector + ' .return-to-position').each(function (index) {
        TweenMax.to(this, duration, { delay: index * .3, x: 0, opacity: 1 });
      });
    }
  }

  function resetReturnToPosition(currentSection) {
    if (currentSection <= 1) {
      setReturnToPosition();
    }
  }

  function toTopBtnHandler() {
    $('#to-top').on('click', function () {
      toTop();
    });
  }

  function toTop() {
    TweenMax.to(window, .7, { scrollTo: 0 });
  }

  function showToTop() {
    $('#to-top').stop(false, true).fadeIn(400);
  }

  function hideToTop() {
    $('#to-top').stop(false, true).fadeOut(400);
  }

  function toggleToTop(currentSection) {
    if (currentSection > 3) {
      showToTop();
    } else {
      hideToTop();
    }
  }

  function pluginNiceScroll() {
    $('html').niceScroll({
      cursorcolor: 'rgba(0,0,0,.7)',
      cursorwidth: 10,
      cursorborder: 'none',
      cursorborderradius: 0,
      background: 'none',
      scrollspeed: 60,
      mousescrollstep: 40,
      autohidemode: false,
      zindex: 9999
    });
  }

}(window, jQuery));
