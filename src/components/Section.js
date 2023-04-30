export class Section {
  constructor ({renderer}, containerSelector){
    this._container = document.querySelector(containerSelector);
    // this._items = items;
    this._renderer = renderer;
  }

  renderElements(data){
    data.forEach((item)=>{
      this._renderer(item);
    });
  }

  addItem (element) {
    this._container.prepend(element);
  }
}


// export class Section {
//   constructor ({items, renderer}, containerSelector){
//     this._container = document.querySelector(containerSelector);
//     this._items = items;
//     this._renderer = renderer;
//   }

//   renderElements(){
//     this._items.forEach((item)=>{
//       this._renderer(item);
//     });
    
//   }

//   addItem (element) {
//     this._container.prepend(element);
//   }
// }