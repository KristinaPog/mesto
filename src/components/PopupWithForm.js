import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._form.querySelectorAll('.popup__input');
    this._button = this._form.querySelector('.popup__submit');
    this._defaultButtonText = this._button.textContent;
  }

  _getInputValues() {
    const inputValues = {};
    this._inputs.forEach(input => inputValues[input.name] = input.value);
    return inputValues;
  };

  setEventListeners() {
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._formSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._form.reset();
  }

  saveLoading(isLoading) {
    if (isLoading) {
      this._button.textContent = "Сохранение...";
    }
    else {
      this._button.textContent = this._defaultButtonText;
    }
  }

}