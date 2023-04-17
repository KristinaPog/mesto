export class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._errorClass = config.errorClass;
    this._inputErrorClass = config.inputErrorClass;
    this._formElement = formElement;
    this._buttonElement = formElement.querySelector(config.submitButtonSelector);
    this._inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  }


  // функция добавляет класс со стилями инпутов при ошибке
  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  //функция удаляет класс со стилями инпутов при ошибке
  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  }

  _toggleInputErrorState = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else { this._hideInputError(inputElement); }
  };

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true, обход массива прекратится и вся функция hasInvalidInput вернёт true
      return !inputElement.validity.valid;
    })
  }

  _disableButton = () => {
    this._buttonElement.disabled = true;
    this._buttonElement.classList.add(this._inactiveButtonClass);
  }

  _activateButton = () => {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._disableButton();
    }
    else {
      this._activateButton();
    }
  }

  resetValidation = () => {
    this._toggleButtonState();
    this._inputList.forEach((inputElement)=>{
      this._hideInputError(inputElement);
    })
  }

  _setEventsListeners = () => {
    this._toggleButtonState();
    this._formElement.addEventListener('reset', () => {
      this._disableButton();
    });
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleInputErrorState(inputElement);
        this._toggleButtonState();
      });
    })
  };

  enableValidation = () => {
    this._setEventsListeners();
  };
}

