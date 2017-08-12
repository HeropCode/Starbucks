// 즉시실행 함수
(function (window, document, $) {
  // 엄격 모드
  'use strict';

  // STARBUCKS OBJECT
  // 즉시실행 함수 내 전역 변수의 역할
  var _sb = _sb || {};

  // DOCUMENT READY
  // 페이지가 준비되었을 때
  // $(document).on('ready', function () {});
  $(function () {
    init();
    initEvent();
  });

  // INIT
  // 페이지가 준비되었을 때 정의가 필요한 부분
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
    _sb.$promotionSliderList = $('.promotion .slider li');
    _sb.$togglePromotionBtn = $('.notice-line .toggle-promotion');
  }

  // INIT EVENT
  // 페이지가 준비되었을 때 실행해야 하는 함수
  function initEvent() {
    toggleTopCardBtnHandler();
    animateToggleTopCardBtn();
    toTopBtnHandler();
    megaMenuHandler();
    searchHandler();
    firstTimeAnimations();
    sliderHandler();
    togglePromotionHandler();
    playTogglePromotionBtn();
    windowScroll();
    checkSectionOffsetTop();
    setReturnToPosition();
    pluginNiceScroll();
  }

  // 탑카드(배너) 버튼을 제어
  function toggleTopCardBtnHandler() {
    $('.toggle-top-card').on({
      click: function () {
        $('.top-card').slideToggle();
      },
      mouseenter: function () {
        animateToggleTopCardBtn();
      }
    });
  }

  // 토글 버튼의 애니메이션을 설정
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

  // 메가 메뉴(서브) 제어
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

  // 메가 메뉴 열기
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

  // 메가 메뉴 닫기
  function closeMegaMenu($this, duration) {
    $this.removeClass('on');

    _sb.$header
      .css({ borderBottomColor: '#c8c8c8' })
      .stop()
      .animate({
        height: _sb.headerHeight
      }, duration);
  }

  // 검색 버튼 제어
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
    });
  }

  // 검색 버튼이 활성화 되었을 때
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

  // 검색 버튼이 비활성화 되었을 때
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

  // 검색 버튼에서 '제출(전송)'이 되었을 때 ('엔터'키를 눌렀을 때)
  function submitSearch($this, event) {
    switch (event.which) {
      case _sb.ENTER_KEY:
        event.preventDefault();  // 기본 이벤트(페이지 새로고침) 사용하지 않음
        console.log('SEARCH: ' + $this.val());
        break;
    }
  }

  // 페이지 로딩 시 처음 시작하는 애니메이션들
  function firstTimeAnimations() {
    $('.visual .fade-in').each(function (index) {
      TweenMax.to(this, 1, { delay: (index + 1) * .7, opacity: 1 });
    });

    floatingObject('.beans .icon1', 1.5, 2.5, 1, 15);
    floatingObject('.beans .icon2', 1.5, 2.5, .5, 15);
    floatingObject('.beans .icon3', 1.5, 2.5, 1.5, 20);
  }

  // 슬라이드 효과 제어
  function sliderHandler() {
    // 공지사항 슬라이드 효과
    $('.notice-line .slider > ul').bxSlider({
      mode: 'vertical',
      pager: false,
      controls: false,
      auto: true,
      pause: 5000
    });

    // 프로모션 슬라이드 효과
    // 전역 객체에 슬라이드를 할당해서 다른 함수 내에서 활용
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
        _sb.$promotionSliderList.removeClass('active');
        _sb.$promotionSliderList.filter('.first').addClass('active');
      },
      onSlideAfter: function ($slideElement, oldIndex, newIndex) {
        _sb.$promotionSliderList.removeClass('active');
        $slideElement.addClass('active');
      }
    });

    // 프로모션 슬라이드 이전 버튼
    $('.promotion .prev').on('click', function () {
      _sb.promotionSlider.goToPrevSlide();
      _sb.promotionSlider.stopAuto();
    });
    // 프로모션 슬라이드 다음 버튼
    $('.promotion .next').on('click', function () {
      _sb.promotionSlider.goToNextSlide();
      _sb.promotionSlider.stopAuto();
    });

    // 어워드 슬라이드 효과
    // 전역 객체에 슬라이드를 할당해서 다른 함수 내에서 활용
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

    // 어워드 슬라이드 이전 버튼
    $('.award .prev').on('click', function () {
      _sb.awardSlider.goToPrevSlide();
      _sb.awardSlider.stopAuto();
      restartAwardSlider();
    });
    // 어워드 슬라이드 다음 버튼
    $('.award .next').on('click', function () {
      _sb.awardSlider.goToNextSlide();
      _sb.awardSlider.stopAuto();
      restartAwardSlider();
    });
  }

  // 프로모션 영역 제어
  function togglePromotionHandler() {
    _sb.$togglePromotionBtn.on('click', function () {
      if (_sb.$promotion.data('opened') === 'opened') {
        closePromotion();
      } else {
        openPromotion();
      }
    });
  }

  // 프로모션 영역 열기
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

  // 프로모션 영역 닫기
  function closePromotion() {
    _sb.$promotion
      .stop(false, true)
      .slideUp(400, function () {
        _sb.promotionSlider.destroySlider();
      })
      .data({ opened: '' });
    playTogglePromotionBtn();
  }

  // 프로모션 토글 버튼 애니메이션 실행
  function playTogglePromotionBtn() {
    TweenMax.set(_sb.$togglePromotionBtn, { scale: .9 });
    TweenMax.to(_sb.$togglePromotionBtn, .5, { rotation: 0 });
    _sb.toggleZoom = TweenMax.to(_sb.$togglePromotionBtn, 1, { scale: 1.1, repeat: -1, yoyo: true });
  }

  // 프로모션 토글 버튼 애니메이션 정지
  function pauseTogglePromotionBtn() {
    TweenMax.set(_sb.$togglePromotionBtn, { scale: 1 });
    TweenMax.to(_sb.$togglePromotionBtn, .5, { rotation: -180 });
    _sb.toggleZoom.pause();
  }

  // 어워드 슬라이드 3초 후 자동 재생 활성화
  function restartAwardSlider() {
    setTimeout(function () {
      _sb.awardSlider.startAuto();
    }, 3000);
  }

  // 범위 랜덤 함수(소수점 2자리까지)
  function random(min, max) {
    // '문자 데이터'로 나온 난수를 '숫자 데이터'로 변환
    return parseFloat((Math.random() * (max - min) + min).toFixed(2));
  }

  // 부유하는(떠 다니는) 요소 만드는 함수
  function floatingObject(selector, minTime, maxTime, delay, size) {
    TweenMax.to(selector, random(minTime, maxTime), { delay: random(0, delay), y: size, repeat: -1, yoyo: true, ease: Power0.easeNone });
  }

  // 화면이 스크롤될 때...
  function windowScroll() {
    $(window).on('scroll', function () {
      // 화면의 수직 정가운데 위치를 알아내기
      _sb.scrollLocate = $(this).scrollTop() + ($(this).height() / 2);

      checkCurrentSection();
    });
  }

  // 각 섹션의 위치 값을 알아내기
  function checkSectionOffsetTop() {
    _sb.secOffsetTop = [];
    $('.section').each(function () {
      _sb.secOffsetTop.push($(this).offset().top);
    });
  }

  // 스크롤할 때, 현재 보이는 섹션이 어느 섹션인지 알려주는 함수
  function checkCurrentSection() {
    var secLength = _sb.secOffsetTop.length;

    // 섹션의 개수만큼 반복
    for (var i = 0; i < secLength; i++) {
      // 현재 스크롤 위치와 각 섹션의 범위가 일치하는지 비교
      if (_sb.scrollLocate >= _sb.secOffsetTop[i] && _sb.scrollLocate < _sb.secOffsetTop[i + 1]) {
        // 저장된 현재 섹션의 번호와 비교된 현재 섹션의 번호가 일치할 때
        if (_sb.currentSecIndex === i) {
          return;  // 함수 종료
        } else {
          _sb.currentSecIndex = i;  // 현재 섹션 번호 갱신

          changeSectionHandler();
        }
      }
    }
  }

  // 현재 보이는 섹션이 다른 섹션으로 변경될 때마다 실행하는 함수
  function changeSectionHandler() {
    console.log('Current section is ' + _sb.currentSecIndex);

    returnToPosition('.season-product', 1, 4);
    returnToPosition('.reserve', 1, 5);
    returnToPosition('.favorite', 1, 6);
    returnToPosition('.find-store', 1, 8);

    resetReturnToPosition();
    toggleToTop();
  }

  // 좌/우 애니메이션의 실행 전 세팅(원위치 설정)하는 함수
  function setReturnToPosition() {
    $('.return-to-position').each(function () {
      var x = 100;

      if ($(this).hasClass('to-right')) {  // 클래스를 확인하여, 왼쪽에서 오른쪽으로 움직일 요소는...
        x *= -1;  // x = x * -1; 와 동일합니다. / 원위치를 왼쪽으로 설정
      } else if ($(this).hasClass('to-left')) {  // 클래스를 확인하여, 오른쪽에서 왼쪽으로 움직일 요소는...
        x = Math.abs(x);  // 원위치를 오른쪽으로 설정
      }

      TweenMax.set(this, { x: x, opacity: 0 });  // 넘어온 x 값으로 원위치 설정
    });
  }

  // 좌/우 애니메이션 실행 함수
  function returnToPosition(sectionSelector, duration, whichSectionIndex) {
    // 현재 보이는 섹션과 설정된 섹션이 일치할 경우 동작
    if (_sb.currentSecIndex === whichSectionIndex) {
      $(sectionSelector + ' .return-to-position').each(function (index) {
        TweenMax.to(this, duration, { delay: index * .3, x: 0, opacity: 1 });
      });
    }
  }

  // 좌/우 애니메이션 원위치로 돌아가는 함수
  function resetReturnToPosition() {
    if (_sb.currentSecIndex <= 1) {
      setReturnToPosition();
    }
  }

  // 페이지 최상단으로 올라가는 버튼 제어
  function toTopBtnHandler() {
    $('#to-top').on('click', function () {
      toTop();
    });
  }

  // 페이지 최상단으로 올라가는 함수
  function toTop() {
    TweenMax.to(window, .7, { scrollTo: 0 });
  }

  // 페이지 최상단으로 올라가는 버튼 보이기
  function showToTop() {
    $('#to-top').stop(false, true).fadeIn(400);
  }

  // 페이지 최상단으로 올라가는 버튼 숨기기
  function hideToTop() {
    $('#to-top').stop(false, true).fadeOut(400);
  }

  // 페이지 최상단으로 올라가는 버튼을 언제 보여주고, 숨길지 설정하는 함수
  function toggleToTop() {
    if (_sb.currentSecIndex > 3) {  // 3번 섹션 이후부터 보여줌
      showToTop();
    } else {
      hideToTop();
    }
  }

  // 나이스 스크롤 플러그인 활용
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

}(window, document, jQuery));
