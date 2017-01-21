$(function () {
  'use strict';

  var $search = $('.search'),
    $searchInput = $search.find('input'),
    $searchBtn = $search.find('img'),
    $mainMenuList = $('.main-menu li'),
    inputValue = null,
    KEY_ENTER = 13;

  // 페이지 시작 이벤트
  (function () {
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
  }());

  $('.top-card-toggle').on('click', function () {
      $('.top-card').slideToggle(400);
  });

  // 검색 '활성화' 되었을 때
  function searchFocusHandler() {
    console.info('Search focus');

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
    console.info('Search blur');

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
          console.log($(this).val());
          break;
      }
    }
  });

  // 메인 메뉴 HOVER 이벤트
  $mainMenuList.on({
    mouseenter: function () {
      $(this).addClass('on');
      $(this).find('.mega-menu').css({zIndex:1}).stop(true, true).slideDown(400);
    },
    mouseleave: function () {
      $(this).removeClass('on');
      $(this).find('.mega-menu').css({zIndex:0}).stop(true, true).slideUp(400);
    }
  });

});