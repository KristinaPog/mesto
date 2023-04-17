import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup{
  constructor(popupSelector, formSubmit){
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._form.querySelectorAll('.popup__input');
  }

  _getInputValues(){
    const inputValues = {};
    this._inputs.forEach(input => inputValues[input.name] = input.value);
    return inputValues;
  };



  setEventListeners(){
    this._form.addEventListener('submit', evt =>{
      evt.preventDefault();
      this._formSubmit(this._getInputValues());
      this.close();
    } 
    );
    super.setEventListeners();
  }

  close(){
    super.close();
    this._form.reset();
  }
}