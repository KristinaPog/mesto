import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup{
  constructor(popupSelector, formSubmit){
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._form = this._popup.querySelector('.popup__form');
  }

  _getInputValues(){
    const inputs = this._form.querySelectorAll('.popup__input');
    return inputs.forEach(item => {item.value})
  };

  setEventListeners(){
    this._form.addEventListener('submit', this._formSubmit);
    super.setEventListeners();
  }

  close(){
    super.close();
    this._form.reset();
  }
}