export class Section {
  constructor ({items, renderer}, containerSelector){
    this._container = document.querySelector(containerSelector);
    this._items = items;
    this._renderer = renderer;
  }

  renderingElement(){
    this._items.forEach((item)=>{
      this._renderer(item, '.place-card');
    });
    
  }

  addItem (element) {
    this._container.prepend(element);
  }
}

// initialCards.forEach((item) => {
//   const cardElement = createCard(item, '.place-card');
//   placesContainer.prepend(cardElement);
// });