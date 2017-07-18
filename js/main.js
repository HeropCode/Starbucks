(function (window, $) {
  'use strict';

  // STARBUCKS OBJECT
  var _sb = {};

  // DOCUMENT READY
  $(function () {
    init();
    initEvent();

    console.log(_sb);
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
  }

  // INIT EVENT
  function initEvent() {
    toggleCard();
    animateCardToggleBtn();
    toTopBtnHandler();
    megaMenuHandler();
    searchHandler();
    animateVisual();
    sliderHandler();
  }

  function toggleCard() {
    $('.top-card-toggle').on('click', function () {
      $('.top-card').slideToggle();
    });
  }

  function animateCardToggleBtn() {
    TweenMax.to('.top-card-toggle .cup', 1.5, { y: -39, ease: Back.easeOut.config(2) });

    var ani = new TimelineMax({ delay: 1 });
    var star = '.top-card-toggle .star';
    ani.to(star, .8, { x: -12, y: 40, ease: Back.easeOut.config(2) })
      .to(star, .8, { x: -2, y: 44, ease: Back.easeOut.config(2) })
      .to(star, .4, { opacity: 1, yoyo: true, repeat: 7, ease: Power0.easeNone }, '-=1.6');
  }

  function toTop() {
    TweenMax.to(window, .7, { scrollTo: 0, ease: Power0.easeNone });
  }

  function toTopBtnHandler() {
    $('#to-top').on('click', function () {
      toTop();
    });
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
    _sb.$header.stop().animate({
      height: _sb.headerHeight + megaHeight
    }, duration);
  }

  function closeMegaMenu($this, duration) {
    $this.removeClass('on');

    _sb.$header.stop().animate({
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

  function animateVisual() {
    $('.visual .fade-in').each(function (index) {
      TweenMax.to(this, 1, { delay: (index + 1) * .7, opacity: 1, ease: Power0.easeNone });
    });
  }

  function sliderHandler() {
    $('.notice-line .slider > ul').bxSlider({
      mode: 'vertical',
      auto: true,
      pause: 5000
    });

    var promotion = $('.promotion .slider > ul').bxSlider({
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
      pause: 6000,
      minSlides: 1,
      maxSlides: 3,
      moveSlides: 1,
      slideWidth: 819,
      onSlideAfter: function ($slideElement, oldIndex, newIndex) {
        $('.promotion .slider li').removeClass('active');
        $slideElement.addClass('active');
      }
    });

    $('.promotion .prev').on('click', function () {
      promotion.goToPrevSlide();
      promotion.stopAuto();
    });
    $('.promotion .next').on('click', function () {
      promotion.goToNextSlide();
      promotion.stopAuto();
    });

  }

}(window, jQuery));