export class FormValidator {
  constructor (config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._errorClass = config.errorClass;
    this._inputErrorClass = config.inputErrorClass;
    this._formElement = formElement; }

    
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

_isValid = (inputElement) => {
  if(!inputElement.validity.valid){
    this._showInputError(inputElement, inputElement.validationMessage);
  } else {this._hideInputError(inputElement);}
} ;

_hasInvalidInput = (inputList) =>{
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true, обход массива прекратится и вся функция hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  })
}

_disabledButton = (buttonElement) => {
  buttonElement.setAttribute('disabled', true)
  buttonElement.classList.add(this._inactiveButtonClass);
}

_activateButton = (buttonElement) => {
  buttonElement.classList.remove(this._inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
}

_toggleButtonState = (inputList, buttonElement) => {
  if (this._hasInvalidInput(inputList)){
    this._disabledButton(buttonElement, this._inactiveButtonClass);
  }
  else{
    this._activateButton(buttonElement, this._inactiveButtonClass);
    }
}

_setEventsListeners = () => {
  this._formElement.addEventListener('submit',(evt)=>{
    evt.preventDefault();
  })
  const popupInputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  this._toggleButtonState(popupInputList, buttonElement);
  this._formElement.addEventListener('reset', () => {
    this._disabledButton(buttonElement);
  });
  popupInputList.forEach((inputElement) =>{
    inputElement.addEventListener('input', ()=>{
      this._isValid(inputElement);
      this._toggleButtonState(popupInputList, buttonElement);
    });
  })
};

enableValidation = () => {
  this._formElement.addEventListener('submit',(evt)=>{ 
    evt.preventDefault();}) 
  this._setEventsListeners(); 
};
}

