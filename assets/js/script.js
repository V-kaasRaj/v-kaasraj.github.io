var $home = $('#home-page')
var $one = $('#one');
var $two = $('#two');
var $three = $('#three');

// Animation Loading Events -----------------------------

window.onload = () => {
  setTimeout(loadAnimation, 800);
  $('.preloader').fadeOut(700);
}
var loadAnimation = () => {
  var body = document.querySelector('body');
  body.classList.remove('preload');
}

// jQuery Functions ---------------------------

$(function () {

  $two.find('.dots').click(function () {
    var index = $two.find('.dots').index($(this));
    curIndex = index;
    activeDot(curIndex);
    hideScroll(curIndex);
  })

  var curIndex = 0;
  $two.find('#motor-up').click(function () {
    if (curIndex > 0) {
      curIndex -= 1;
      activeDot(curIndex);
    }
    hideScroll(curIndex);
  })

  $two.find('#motor-down').click(function () {
    if (curIndex < 4) {
      curIndex += 1;
      activeDot(curIndex);
    }
    hideScroll(curIndex);
  })

  $one.find('#menu-icon').click(function () {
    hideMenu()
    // $one.find('#list').toggleClass('is-hide');
  })

  $one.find('.hamburger-link').click(function () {
    var index = $one.find('.hamburger-link').index($(this));
    curIndex = index;
    activeDot(curIndex);
    hideMenu()
    hideScroll(curIndex);
  })

  $two.find('.portfolio-dots').click(function () {
    var index2 = $two.find('.portfolio-dots').index($(this));
    curIndex2 = index2;
    portfolioDots(curIndex2);
  })

  var curIndex2 = 0;
  $two.find('#portfolio-motor-right').click(function () {
    if (curIndex2 < ($two.find('.portfolio-dots').length - 1)) {
      curIndex2 +=1;
      portfolioDots(curIndex2);
    }
  })

  $two.find('#portfolio-motor-left').click(function () {
    if (curIndex2 > 0) {
      curIndex2 -= 1;
      portfolioDots(curIndex2);
    }
  })

  $(window).on('mousewheel', function (e) {
    if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
      // scroll up
      if (curIndex > 0) {
        curIndex -= 1;
        activeDot(curIndex);
      }
      hideScroll(curIndex);
    } else {
      // scroll down
      if (curIndex < ($two.find('.dots').length - 1)) {
        curIndex += 1;
        activeDot(curIndex);
      }
      hideScroll(curIndex);
    }
  })

  // Keyboard Events ---------------------------------
  $(window).on('keydown', function (e) {
    if (e.originalEvent.code == 'ArrowUp') {
      if (curIndex > 0) {
        curIndex -= 1;
        activeDot(curIndex);
      }
      hideScroll(curIndex);
    }
    if (e.originalEvent.code == 'ArrowDown') {
      if (curIndex < ($two.find('.dots').length - 1)) {
        curIndex += 1;
        activeDot(curIndex);
      }
      hideScroll(curIndex);
    }
    // console.log(e.originalEvent.code);
  })
  $(window).on('keydown', function (e) {
    if (e.originalEvent.code == 'ArrowRight') {
      if (curIndex2 < ($two.find('.portfolio-dots').length - 1)) {
        curIndex2 +=1;
        portfolioDots(curIndex2);
      }
    }
    if (e.originalEvent.code == 'ArrowLeft') {
      if (curIndex2 > 0) {
        curIndex2 -= 1;
        portfolioDots(curIndex2);
      }
    }
    // console.log(e.originalEvent.code);
  })

  // Touch Events ------------------------------------------

  var xDown = null;
  var yDown = null;

  $(window).on({
    touchstart : function (evt) {
      xDown = evt.originalEvent.touches[0].clientX;
      yDown = evt.touches[0].clientY;
    },
    touchmove : function (evt) {
      if ( ! xDown || ! yDown ) {
        return false;
      }
      var xUp = evt.originalEvent.touches[0].clientX;
      var yUp = evt.originalEvent.touches[0].clientY;
      var xDiff = xDown - xUp;
      var yDiff = yDown - yUp;
      if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* left swipe */
        } else {
            /* right swipe */
        }
      } else {
        if ( yDiff > 0 ) {
            /* up swipe */
            if (curIndex < ($two.find('.dots').length - 1)) {
              curIndex += 1;
              activeDot(curIndex);
            }
        } else {
            /* down swipe */
            if (curIndex > 0) {
              curIndex -= 1;
              activeDot(curIndex);
            }
        }
      }
      /* reset values */
      xDown = 0;
      yDown = 0;
    }
  });

  $('.lightbox-trigger').click(function () {
    let index = $('.lightbox-trigger').index($(this));

    $('.lightbox').css({
      display : 'block'
    })

  })

  $('.close-btn').click(() => {
    $('.lightbox').css({
      display :'none'
    })
  })

  $('.back-btn').click(() => {
    history.back();
  })
})

// -------- functions section

function activeDot(index) {
  $two.find('.dots').removeClass('is-dot-active');
  $two.find('.dots').eq(index).addClass('is-dot-active');
  hidePage(index)
}

function hideScroll(curIndex) {
  if (curIndex > 0) {
    $three.find('.scroll').css({
      opacity : '0',
      visibility : 'hidden'
    })
  } else {
    $three.find('.scroll').css({
      opacity : '1',
      visibility : 'visible'
    })
  }
}


function hidePage(index) {
  var $pageList = $two.find('.page-list');
  $pageList.removeClass('is-show');
  $pageList.css({
    opacity : '0',
    visibility : 'hidden',
    transform: 'translate(-50%,-40%)'
  });
  $pageList.eq(index).css({
    opacity : '1',
    visibility : 'visible',
    transform: 'translate(-50%,-50%)'
  });
}

function hideMenu() {
  $one.find('.layer').toggleClass('is-hide');
  $one.find('#menu').toggleClass('is-hide');
}

function portfolioDots(index2) {
  $two.find('.portfolio-dots').removeClass('is-dot-active');
  $two.find('.portfolio-dots').eq(index2).addClass('is-dot-active');
  portfolioSlide(index2);
}

function portfolioSlide(index2) {
  var $slides = $two.find('.slide');
  $slides.removeClass('is-slide-show');
  $slides.css({
    opacity : '0',
  });
  $slides.eq(index2).css({
    opacity : '1',
  });
}
