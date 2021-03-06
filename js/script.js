// active slider
document.addEventListener('DOMContentLoaded', () => {
  new ItcSimpleSlider('#slider-one', {
    loop: true,
    autoplay: false,
    interval: 5000,
    swipe: true,
  });
});

// TABS

document.addEventListener('DOMContentLoaded', function () {
  // console.log(document.querySelectorAll('.how-we-work__step'))
  document.querySelectorAll('.step').forEach(function (tabsBtn) {
    // console.log(tabsBtn)
    tabsBtn.addEventListener('click', function (event) {
      const path = event.currentTarget.dataset.path

      document.querySelectorAll('.tabs-info').forEach(function (tabContent) {
        tabContent.classList.remove('tabs-info-active')
      });
      document.querySelector(`[data-target="${path}"]`).classList.add('tabs-info-active')
    });
  });
  $(function () {
    $('#step-one').click(function () {
      $('#step-one').addClass('step-active');
      $('#step-two').removeClass('step-active');
      $('#step-three').removeClass('step-active');
      $('#step-four').removeClass('step-active');
    });
    $('#step-two').click(function () {
      $('#step-two').addClass('step-active');
      $('#step-one').removeClass('step-active');
      $('#step-three').removeClass('step-active');
      $('#step-four').removeClass('step-active');
    });
    $('#step-three').click(function () {
      $('#step-three').addClass('step-active');
      $('#step-one').removeClass('step-active');
      $('#step-two').removeClass('step-active');
      $('#step-four').removeClass('step-active');
    });
    $('#step-four').click(function () {
      $('#step-four').addClass('step-active');
      $('#step-one').removeClass('step-active');
      $('#step-two').removeClass('step-active');
      $('#step-three').removeClass('step-active');
    });
  });
});

// slider отзывов

document.addEventListener('DOMContentLoaded', function () {

  'use strict';
  var slider = (function (config) {

    const ClassName = {
      INDICATOR_ACTIVE: 'slider__indicator_active',
      ITEM: 'slider__item',
      ITEM_LEFT: 'slider__item_left',
      ITEM_RIGHT: 'slider__item_right',
      ITEM_PREV: 'slider__item_prev',
      ITEM_NEXT: 'slider__item_next',
      ITEM_ACTIVE: 'slider__item_active'
    }

    var
      _isSliding = false, // индикация процесса смены слайда
      _interval = 0, // числовой идентификатор таймера
      _transitionDuration = 700, // длительность перехода
      _slider = {}, // DOM элемент слайдера
      _items = {}, // .slider-item (массив слайдов) 
      _sliderIndicators = {}, // [data-slide-to] (индикаторы)
      _config = {
        selector: '', // селектор слайдера
        isCycling: true, // автоматическая смена слайдов
        direction: 'next', // направление смены слайдов
        interval: 5000, // интервал между автоматической сменой слайдов
        pause: true // устанавливать ли паузу при поднесении курсора к слайдеру
      };

    var
      // функция для получения порядкового индекса элемента
      _getItemIndex = function (_currentItem) {
        var result;
        _items.forEach(function (item, index) {
          if (item === _currentItem) {
            result = index;
          }
        });
        return result;
      },
      // функция для подсветки активного индикатора
      _setActiveIndicator = function (_activeIndex, _targetIndex) {
        if (_sliderIndicators.length !== _items.length) {
          return;
        }
        _sliderIndicators[_activeIndex].classList.remove(ClassName.INDICATOR_ACTIVE);
        _sliderIndicators[_targetIndex].classList.add(ClassName.INDICATOR_ACTIVE);
      },

      // функция для смены слайда
      _slide = function (direction, activeItemIndex, targetItemIndex) {
        var
          directionalClassName = ClassName.ITEM_RIGHT,
          orderClassName = ClassName.ITEM_PREV,
          activeItem = _items[activeItemIndex], // текущий элемент
          targetItem = _items[targetItemIndex]; // следующий элемент

        var _slideEndTransition = function () {
          activeItem.classList.remove(ClassName.ITEM_ACTIVE);
          activeItem.classList.remove(directionalClassName);
          targetItem.classList.remove(orderClassName);
          targetItem.classList.remove(directionalClassName);
          targetItem.classList.add(ClassName.ITEM_ACTIVE);
          window.setTimeout(function () {
            if (_config.isCycling) {
              clearInterval(_interval);
              _cycle();
            }
            _isSliding = false;
            activeItem.removeEventListener('transitionend', _slideEndTransition);
          }, _transitionDuration);
        };

        if (_isSliding) {
          return; // завершаем выполнение функции если идёт процесс смены слайда
        }
        _isSliding = true; // устанавливаем переменной значение true (идёт процесс смены слайда)

        if (direction === "next") { // устанавливаем значение классов в зависимости от направления
          directionalClassName = ClassName.ITEM_LEFT;
          orderClassName = ClassName.ITEM_NEXT;
        }

        targetItem.classList.add(orderClassName); // устанавливаем положение элемента перед трансформацией
        _setActiveIndicator(activeItemIndex, targetItemIndex); // устанавливаем активный индикатор

        window.setTimeout(function () { // запускаем трансформацию
          targetItem.classList.add(directionalClassName);
          activeItem.classList.add(directionalClassName);
          activeItem.addEventListener('transitionend', _slideEndTransition);
        }, 0);

      },
      // функция для перехода к предыдущему или следующему слайду
      _slideTo = function (direction) {
        var
          activeItem = _slider.querySelector('.' + ClassName.ITEM_ACTIVE), // текущий элемент
          activeItemIndex = _getItemIndex(activeItem), // индекс текущего элемента 
          lastItemIndex = _items.length - 1, // индекс последнего элемента
          targetItemIndex = activeItemIndex === 0 ? lastItemIndex : activeItemIndex - 1;
        if (direction === "next") { // определяем индекс следующего слайда в зависимости от направления
          targetItemIndex = activeItemIndex == lastItemIndex ? 0 : activeItemIndex + 1;
        }
        _slide(direction, activeItemIndex, targetItemIndex);
      },
      // функция для запуска автоматической смены слайдов в указанном направлении
      _cycle = function () {
        if (_config.isCycling) {
          _interval = window.setInterval(function () {
            _slideTo(_config.direction);
          }, _config.interval);
        }
      },
      // обработка события click
      _actionClick = function (e) {
        var
          activeItem = _slider.querySelector('.' + ClassName.ITEM_ACTIVE), // текущий элемент
          activeItemIndex = _getItemIndex(activeItem), // индекс текущего элемента
          targetItemIndex = e.target.getAttribute('data-slide-to');

        if (!(e.target.hasAttribute('data-slide-to') || e.target.classList.contains('slider__control'))) {
          return; // завершаем если клик пришёлся на не соответствующие элементы
        }
        if (e.target.hasAttribute('data-slide-to')) {// осуществляем переход на указанный сдайд 
          if (activeItemIndex === targetItemIndex) {
            return;
          }
          _slide((targetItemIndex > activeItemIndex) ? 'next' : 'prev', activeItemIndex, targetItemIndex);
        } else {
          e.preventDefault();
          _slideTo(e.target.classList.contains('slider__control_next') ? 'next' : 'prev');
        }
      },
      // установка обработчиков событий
      _setupListeners = function () {
        // добавление к слайдеру обработчика события click
        _slider.addEventListener('click', _actionClick);
        // остановка автоматической смены слайдов (при нахождении курсора над слайдером)
        if (_config.pause && _config.isCycling) {
          _slider.addEventListener('mouseenter', function (e) {
            clearInterval(_interval);
          });
          _slider.addEventListener('mouseleave', function (e) {
            clearInterval(_interval);
            _cycle();
          });
        }
      };

    // init (инициализация слайдера)
    for (var key in config) {
      if (key in _config) {
        _config[key] = config[key];
      }
    }
    _slider = (typeof _config.selector === 'string' ? document.querySelector(_config.selector) : _config.selector);
    _items = _slider.querySelectorAll('.' + ClassName.ITEM);
    _sliderIndicators = _slider.querySelectorAll('[data-slide-to]');
    // запуск функции cycle
    _cycle();
    _setupListeners();

    return {
      next: function () { // метод next 
        _slideTo('next');
      },
      prev: function () { // метод prev 
        _slideTo('prev');
      },
      stop: function () { // метод stop
        clearInterval(_interval);
      },
      cycle: function () { // метод cycle 
        clearInterval(_interval);
        _cycle();
      }
    }
  }({
    selector: '.slider',
    isCycling: false,
    direction: 'next',
    interval: 5000,
    pause: true
  }));
});

// accordion

document.addEventListener('DOMContentLoaded', function () {
  var accordion = document.getElementById('accordion');
  accordion.addEventListener('click', change);
  function change(event) {
    var targ = event.target;
    if (targ.tagName !== 'H3') return;
    if (targ.classList.contains('select')) {
      hideAll();
    } else {
      hideAll();
      targ.classList.add('select');
      showText(targ.nextElementSibling);
    }
  }
  function hideAll() {
    var h3El = accordion.querySelectorAll('h3');
    var divEl = accordion.querySelectorAll('div');
    for (var i = 0; i < h3El.length; i++) {
      h3El[i].classList.remove('select');
    }
    for (var i = 0; i < divEl.length; i++) {
      divEl[i].style.height = '0';
    }
  }
  function showText(textEl) {
    textEl.style.height = textEl.scrollHeight + 'px';
  }
});


document.addEventListener('DOMContentLoaded', function () {
  function burgerMenu(selector) {
    let menu = $(selector);
    let button = menu.find('.burger-menu_button', '.burger-menu_lines');
    let links = menu.find('.burger-menu_link');
    let overlay = menu.find('.burger-menu_overlay');

    button.on('click', (e) => {
      e.preventDefault();
      toggleMenu();
    });

    links.on('click', () => toggleMenu());
    overlay.on('click', () => toggleMenu());

    function toggleMenu() {
      menu.toggleClass('burger-menu_active');

      if (menu.hasClass('burger-menu_active')) {
        $('body').css('overlow', 'hidden');
      } else {
        $('body').css('overlow', 'visible');
      }
    }
  }
  burgerMenu('.burger-menu');
});