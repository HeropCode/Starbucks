$(function () {
  'use strict';


  var $search = $('.search'),
    $searchInput = $search.find('input'),
    $searchBtn = $search.find('img'),
    $mainMenuList = $('.main-menu > ul > li'),
    inputValue = null,
    KEY_ENTER = 13;


  // 검색 '활성화' 되었을 때
  function searchFocusHandler() {

    var width = 182;
    var duration = 600;

    $search.stop().animate({ width: width }, duration);
    $searchBtn.stop(false, true).fadeOut(duration);
    $searchInput
      .stop()
      .animate({ width: width }, duration)
      .attr('placeholder', '통합검색');

    if (inputValue !== null) {
      $searchInput.val(inputValue);
    }
  }


  // 검색 '비활성화' 되었을 때
  function searchBlurHandler() {

    var width = 38;
    var duration = 600;

    $search.stop().animate({ width: width }, duration);
    $searchBtn.stop(false, true).fadeIn(duration);
    inputValue = $searchInput.val();
    $searchInput
      .stop()
      .animate({ width: width }, duration)
      .val('')
      .attr('placeholder', '');
  }


  // TOP-CARD 토글 버튼 애니메이션
  function animateTopCardToggleBtn() {
    $('.top-card-toggle .cup')
      .delay(500)
      .animate({
        top: 5
      }, 1500, 'easeOutBack');

    $('.top-card-toggle .star')
      .delay(1000)
      .animate({
        top: 0
      }, 1500, 'easeOutBack')
      .fadeTo(400, 1)
      .fadeTo(400, 0.6)
      .fadeTo(400, 1)
      .fadeTo(400, 0.6);
  }


  //  VISUAL 애니메이션
  function animateVisual() {
    var $title = $('.visual .title-group');
    var $cup1 = $('.visual .cup1');
    var $cup2 = $('.visual .cup2');
    var $spoon = $('.visual .spoon');
    var delay = 700;

    $cup2.delay(delay).fadeIn(1000);
    $cup1.delay(delay * 2).fadeIn(1000);
    $spoon.delay(delay * 3).fadeIn(1000);
    $title.delay(delay * 4).fadeIn(1000);
  }


  function openSideMenu() {
    $('.dimming').fadeIn(400);
    $('.side-menu').animate({
      right: 0
    }, 400);
  }


  function closeSideMenu() {
    $('.dimming').fadeOut(400);
    $('.side-menu').animate({
      right: '-80%'
    }, 400);
  }


  // 페이지 시작 이벤트
  (function () {
    animateTopCardToggleBtn();
    animateVisual();
  }());


  // TOP-CARD 토글 버튼 클릭했을 때
  $('.top-card-toggle').on('click', function () {
    $('.top-card').slideToggle(400);
  });


  // 검색 '돋보기' 버튼 선택했을 때
  $searchBtn.on('click', function () {
    $searchInput.focus();
  });


  // 검색 'input' 요소 이벤트
  $searchInput.on({
    focus: searchFocusHandler,
    blur: searchBlurHandler,
    keydown: function (event) {
      switch (event.which) {
        case KEY_ENTER:
          console.log('Search ' + $(this).val());
          break;
      }
    }
  });


  // 메인 메뉴 HOVER 이벤트
  $mainMenuList.on({
    mouseenter: function () {
      $(this).addClass('on');
      var height = $(this).find('.mega-menu').height();
      $('header').stop().animate({
        height: 122 + height
      }, 300);
    },
    mouseleave: function () {
      $(this).removeClass('on');
      $('header').stop().animate({
        height: 122
      }, 300);
    }
  });


  // 공지사항 상하 슬라이드
  $('.notice-line .slider ul').bxSlider({
    mode: 'vertical',
    pager: false,
    controls: false,
    auto: true,
    pause: 5000,
    responsive: true
  });


  // PROMOTION 섹션 활성화
  $('.notice-line .right-inner .more-btn').on('click', function () {
    $('.promotion').slideDown(400);
    promotionSlider.reloadSlider();
  });


  // 프로모션 좌우 슬라이드
  var promotionSlider = $('.promotion .slider ul').bxSlider({
    slideMargin: 0,
    auto: true,
    pause: 2000,
    pager: false,
    controls: false,
    minSlides: 1,
    maxSlides: 3,
    moveSlides: 1,
    slideWidth: 819,
    onSlideBefore: function ($slideElement, oldIndex, newIndex) {

    },
    onSlideAfter: function ($slideElement, oldIndex, newIndex) {

    }
  });


  $('.main-menu-toggle').on('click', function () {
    openSideMenu();
  });


  $('.side-menu .menu h1').on('click', function () {
    $(this).next().stop().slideToggle(400);
  });


  $('.dimming').on('click', function () {
    closeSideMenu();
  });




});