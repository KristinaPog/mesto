

export class Card {
  constructor (name, link, templateSelector){
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
  } 

  _getTemplate(){
    const newPlace = document.querySelector(this._templateSelector).content.querySelector('.place').cloneNode(true);
    return newPlace;
  }

  _initLikeToggle () {
    const like = this._element.querySelector('.like');
    like.addEventListener('click', function(evt){evt.target.classList.toggle('like_active')});
  }

  _initDeleteCard() {
    const trash = this._element.querySelector ('.trash');
    trash.addEventListener('click', ()=>{this._element.remove()});
  }
 
  generateCard(){
    this._element = this._getTemplate();
    this._element.querySelector('.place__image').src = this._link;
    this._element.querySelector('.place__text').textContent = this._name;
    this._element.querySelector('.place__image').alt = this._name;

    this._initLikeToggle();
    this._initDeleteCard();
    return this._element;
  }
  
  

  // initLikeToggle(Card);
  // initDeleteCard(Card);
  // initImageOpened(Card);
}