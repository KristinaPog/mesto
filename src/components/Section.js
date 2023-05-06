export class Section {
  constructor ({renderer}, containerSelector){
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  renderElements(data, userId){
    data.forEach((item)=>{
      this._renderer(item, userId);
    });
  }

  addItem (element) {
    this._container.prepend(element);
  }
}


