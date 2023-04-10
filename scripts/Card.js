export class Card { 
  constructor (cardData, templateSelector, handleImageClick){ 
    this._name = cardData.name; 
    this._link = cardData.link; 
    this._templateSelector = templateSelector; 
    this._handleImageClick = handleImageClick;
  }  

  _getTemplate(){ 
    const newPlace = document.querySelector(this._templateSelector).content.querySelector('.place').cloneNode(true); 
    return newPlace;
  } 

  _setLikeEventListener () { 
    const buttonLike = this._element.querySelector('.like'); 
    buttonLike.addEventListener('click', function(evt){evt.target.classList.toggle('like_active')}); 
  } 

  _setDeleteEventListener() { 
    const trash = this._element.querySelector ('.trash'); 
    trash.addEventListener('click', ()=>{
      this._element.remove(); 
      this._element = null;}); 
  } 

  _openImage() {
    const image = this._element.querySelector('.place__image');
    image.addEventListener('click', ()=>{
      this._handleImageClick(this._name, this._link);
    });
  }

  _setEventListeners () {
    this._setLikeEventListener(); 
    this._setDeleteEventListener(); 
    this._openImage();
  }

  generateCard(){ 
    this._element = this._getTemplate(); 
    const image = this._element.querySelector('.place__image');
    const label = this._element.querySelector('.place__text');
    image.src = this._link; 
    label.textContent = this._name; 
    image.alt = this._name; 
    this._setEventListeners();
    return this._element;
  }
} 