'use strict'
/* eslint-disable */
var animationcard = (function (window, undefined) {

  var SELECTORS = {
    pattern: '.pattern',
    card: '.card',
    cardImage: '.card__image',
    cardClose: '.card__btn-close',
    slider: '.slider-container'
  }


  var CLASSES = {
    patternHidden: 'pattern--hidden',
    polygon: 'polygon',
    polygonHidden: 'polygon--hidden'
  }

  /**
   * Инициализируем карту и точки двжения
   */
  var polygonMap = {
    paths: null,
    points: null
  }

  var layout = {}

  /**
   * Анимация
   */
  function init () {
    // For options see: https://github.com/qrohlf/Trianglify
    var pattern = Trianglify({
      width: window.innerWidth,
      height: window.innerHeight,
      cell_size: 250,
      variance: 0.5,
      stroke_width: 1,
      x_colors: 'Blues',
    }).svg() // Render as SVG.

    _mapPolygons(pattern)

    _bindCards()
  };

  /**
   * Распологаем карту и точки двжения и размер элементов
   */
  function _mapPolygons (pattern) {
    $(SELECTORS.pattern).append(pattern)
    polygonMap.paths = [].slice.call(pattern.childNodes)

    polygonMap.points = []

    polygonMap.paths.forEach(function (polygon) {
      $(polygon).attr('class', CLASSES.polygon)

      var rect = polygon.getBoundingClientRect()

      var point = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      }

      polygonMap.points.push(point)
    })

    $(SELECTORS.pattern).removeClass(CLASSES.patternHidden)
  };

  /**
   * Привязываем элементы к карте
   */
  function _bindCards () {
    var elements = $(SELECTORS.card)

    $.each(elements, function (card, i) {
      var instance = new Card(i, card)

      layout[i] = {
        card: instance
      }

      var cardImage = $(card).find(SELECTORS.cardImage)
      var cardClose = $(card).find(SELECTORS.cardClose)

      $(cardImage).on('click', _playSequence.bind(this, true, i))
      $(cardClose).on('click', _playSequence.bind(this, false, i))
    })
  };

  /**
   * Создаем сиквенс анимации.
   *
   */
  function _playSequence (isOpenClick, id, e) {
    var card = layout[id].card

    // Запрещаем клик по картинке
    if (card.isOpen && isOpenClick) return

    var sequence = new TimelineLite({paused: true})

    var tweenOtherCards = _showHideOtherCards(id)

    if (!card.isOpen) {
      // открываем sequence.

      _setPatternBgImg(e.target)

      sequence.add(tweenOtherCards)
      sequence.add(card.openCard(_onCardMove), 0)
    } else {
      // Закрываем.

      var closeCard = card.closeCard()
      var position = closeCard.duration() * 0.8 // поле.

      sequence.add(closeCard)
      sequence.add(tweenOtherCards, position)
    }

    sequence.play()
  };

  /**
   * Показываем скрываем другие карточки
   */
  function _showHideOtherCards (id) {
    var TL = new TimelineLite()

    var selectedCard = layout[id].card

    for (var i in layout) {
      var card = layout[i].card

      // When called with `openCard`.
      if (card.id !== id && !selectedCard.isOpen) {
        TL.add(card.hideCard(), 0)
      }

      // When called with `closeCard`.
      if (card.id !== id && selectedCard.isOpen) {
        TL.add(card.showCard(), 0)
      }
    }

    return TL
  };

  /**
   * Устанавливаем бекграунд
   */
  function _setPatternBgImg (image) {
    var imagePath = $(image).attr('xlink:href')

    $(SELECTORS.pattern).css('background-image', 'url(' + imagePath + ')')
  };

  /**
   * Обновляем ТВИН ПО ДВИЖЕНИЮ
   */
  function _onCardMove (track) {
    var radius = track.width / 2

    var center = {
      x: track.x,
      y: track.y
    }

    polygonMap.points.forEach(function (point, i) {
      if (_detectPointInCircle(point, radius, center)) {
        $(polygonMap.paths[i]).attr('class', CLASSES.polygon + ' ' + CLASSES.polygonHidden)
      } else {
        $(polygonMap.paths[i]).attr('class', CLASSES.polygon)
      }
    })
  }

  /**
   * Считываем поинты движения
   */
  function _detectPointInCircle (point, radius, center) {
    var xp = point.x
    var yp = point.y

    var xc = center.x
    var yc = center.y

    var d = radius * radius * radius

    var isInside = Math.pow(xp - xc, 2) + Math.pow(yp - yc, 2) <= d

    return isInside
  };

  // Expose methods.
  return {
    init: init
  }

})(window)

/**
 * *
 * Работаем с формой
 * *
 */

var Card = (function (window, undefined) {
  var SELECTORS = {
    container: '.card__container',
    content: '.card__content',
    clip: '.clip'
  }

  var CLASSES = {
    containerClosed: 'card__container--closed',
    bodyHidden: 'body--hidden',
    slideup: 'slideup'
  }

  function Card (id, el) {
    this.id = id

    this._el = el

    // Get elements.
    this._container = $(this._el).find(SELECTORS.container)[0]
    this._clip = $(this._el).find(SELECTORS.clip)[0]
    this._content = $(this._el).find(SELECTORS.content)[0]
    this.slider = document.getElementsByClassName(".slider-init")

    this.isOpen = false

    this._TL = null
  };

  /**
   * Вскрываем карту
   */
  Card.prototype.openCard = function (callback) {
    this._TL = new TimelineLite()

    var slideContentDown = this._slideContentDown()
    var clipImageIn = this._clipImageIn()
    var floatContainer = this._floatContainer(callback)
    var clipImageOut = this._clipImageOut()
    var slideContentUp = this._slideContentUp()

    // Compose sequence and use duration to overlap tweens.
    this._TL.add(slideContentDown)
    this._TL.add(clipImageIn, 0)
    this._TL.add(floatContainer, '-=' + clipImageIn.duration() * 0.3)
    // this._TL.add(clipImageOut, '-=' + floatContainer.duration() * 0.3);
    this._TL.add(slideContentUp/*, '-=' + clipImageOut.duration() * 0.6 */)

    this.isOpen = true

    return this._TL
  }

  /**
   * Перемещаем контент.
   */
  Card.prototype._slideContentDown = function () {
    var tween = TweenLite.to(this._content, 0.8, {
      y: window.innerHeight,
      ease: Expo.easeInOut
    })

    return tween
  }

  /**
   * Обрабатываем изображение
   */
  Card.prototype._clipImageIn = function () {
    // Рисуем полигон из изображения
    var TL = new TimelineLite()

    var start = [
      [0, 1200],
      [0, 0],
      [1920, 0],
      [1920, 1200]
    ]

    var end = [
      [916, 430],
      [1125, 643],
      [960, 607],
      [793, 570]
    ]

    var points = []

    // Создаем твин для точек
    start.forEach(function (point, i) {
      var tween = TweenLite.to(point, 1.5, end[i])

      end[i].onUpdate = function () {
        points.push(point.join())
        if (points.length === end.length) {
          $(this._clip).attr('points', points.join(' '))
          // Reset.
          points = []
        };
      }.bind(this)

      tween.vars.ease = Expo.easeInOut

      TL.add(tween, 0)
    }, this)

    return TL
  }

  /**
   Отправляем изображение в путь
   */
  Card.prototype._floatContainer = function (callback) {
    $(document.body).addClass(CLASSES.bodyHidden),
    $(document.getElementById('slider-init')).addClass(CLASSES.slideup)


    var TL = new TimelineLite()

    var rect = this._container.getBoundingClientRect()
    var windowW = window.innerWidth

    var track = {
      width: 0,
      x: rect.left + (rect.width / 2),
      y: rect.top + (rect.height / 2)
    }

    TL.set(this._container, {
      width: rect.width,
      height: rect.height,
      x: rect.left,
      y: rect.top,
      position: 'fixed',
      overflow: 'hidden'
    })

    TL.to([this._container, track], 2, {
      width: windowW,
      height: '100%',
      x: rect.left,
      y: "100%",
      xPercent: -50,
      ease: Expo.easeInOut,
      clearProps: 'all',
      className: '-=' + CLASSES.containerClosed,
      onUpdate: callback.bind(this, track),
      // Fix IE: if the image is set to fixed when CLASSES.containerClosed
      // is removed IE doesn't follow the tween, fix by setting
      // the image position to fixed when tween is completed.
      onComplete: function () {
        $(this._container).addClass('card__container--fix-image')
      }.bind(this)
    })

    return TL
  }

  /**
   Обратно
   */
  Card.prototype._clipImageOut = function () {
    var tween = this._clipImageIn()

    tween.reverse()

    return tween
  }

  /**
   * Выдвигаем контент
   */
  Card.prototype._slideContentUp = function () {
    var tween = TweenLite.to(this._content, 1, {
      y: 0,
      clearProps: 'all',
      ease: Expo.easeInOut
    })

    return tween
  }

  /**
   * Закрываем карточку
   */
  Card.prototype.closeCard = function () {
    TweenLite.to(this._container, 0.4, {
      scrollTo: {
        y: 0
      },
      onComplete: function () {
        $(this._container).css('overflow', 'hidden')
      }.bind(this),
      ease: Power2.easeOut
    })

    this._TL.eventCallback('onReverseComplete', function () {
      TweenLite.set([this._container, this._content], {
        clearProps: 'all'
      })

      $(document.body).removeClass(CLASSES.bodyHidden),
      $(document.getElementById('slider-init')).removeClass(CLASSES.slideup)

      this.isOpen = false
    }.bind(this))

    return this._TL.reverse()
  }

  /**
   * Скрываем все карты кроме выбранной
   */
  Card.prototype.hideCard = function () {
    var tween = TweenLite.to(this._el, 0.4, {
      scale: 0.8,
      autoAlpha: 0,
      transformOrigin: 'center bottom',
      ease: Expo.easeInOut
    })

    return tween
  }

  /**
   * Возвращаем карту
   */
  Card.prototype.showCard = function () {
    var tween = TweenLite.to(this._el, 0.5, {
      scale: 1,
      autoAlpha: 1,
      clearProps: 'all',
      ease: Expo.easeInOut
    })

    return tween
  }

  return Card
})(window)

// пинок
window.onload = setTimeout(animationcard.init, 900)
