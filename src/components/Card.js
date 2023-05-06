import { data } from "autoprefixer";

export class Card {
  constructor({ cardData, userId, handleCardClick, handleLikeClick, handleDeleteIconClick }, templateSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes;
    this.cardId = cardData._id;
    this._user = userId;
    this._owner = cardData.owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.place__image');
    this._label = this._element.querySelector('.place__text');
    this._buttonLike = this._element.querySelector('.like__icon');
    this._like = this._element.querySelector('.like__quantity');
    this._trash = this._element.querySelector('.trash');
  }

  _getTemplate() {
    const newPlace = document.querySelector(this._templateSelector).content.querySelector('.place').cloneNode(true);
    return newPlace;
  }

  countLikes(data){
    this._like.textContent = data.likes.length;
    this._likes = data.likes;
  }

  isLiked(){ 
    return this._likes.some(item => {
      return item._id === this._user})
  }

  _checkLike(){
    this._likes.some((item)=>{
      if(item._id === this._user){
        this._buttonLike.classList.add('like__icon_active')
      }})
  }

  setLike(){
    this._buttonLike.classList.add('like__icon_active');
  }

  deleteLike(){
    this._buttonLike.classList.remove('like__icon_active');
  }


  _setLikeEventListener() {
    this._buttonLike.addEventListener('click', () => { 
      this._handleLikeClick(this);
    });
  }

  _removeDeleteButton(){
    if(this._user !== this._owner ){
      this._trash.remove();
    }
  }

  deleteCard(){
    this._element.remove();
    this._element = null;
  }

  _setDeleteEventListener() {
    this._trash.addEventListener('click', () => {
      this._handleDeleteIconClick(this.cardId);
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
    this._like.textContent = this._likes.length;
    this._checkLike();
    this._setEventListeners();
    this._removeDeleteButton();
    return this._element;
  }

 

  

} 