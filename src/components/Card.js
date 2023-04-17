export class Card {
  constructor({cardData, handleCardClick}, templateSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.place__image');
    this._label = this._element.querySelector('.place__text');
    this._buttonLike = this._element.querySelector('.like');
    this._trash = this._element.querySelector('.trash');
  }

  _getTemplate() {
    const newPlace = document.querySelector(this._templateSelector).content.querySelector('.place').cloneNode(true);
    return newPlace;
  }

  _setLikeEventListener() {
    this._buttonLike.addEventListener('click', function (evt) { evt.target.classList.toggle('like_active') });
  }

  _setDeleteEventListener() {
    this._trash.addEventListener('click', () => {
      this._element.remove();
      this._element = null;
    });
  }

  _setImageClickEventListener() {
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _setEventListeners() {
    this._setLikeEventListener();
    this._setDeleteEventListener();
    this._setImageClickEventListener();
  }

  generateCard() {
    this._image.src = this._link;
    this._label.textContent = this._name;
    this._image.alt = this._name;
    this._setEventListeners();
    return this._element;
  }
} 