// функция добавляет класс со стилями инпутов при ошибке
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

//функция удаляет класс со стилями инпутов при ошибке
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
}

const isValid = (formElement, inputElement, inputErrorClass, errorClass) => {
  if(!inputElement.validity.valid){
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {hideInputError(formElement, inputElement, inputErrorClass, errorClass);}
} ;

const hasInvalidInput = (inputList) =>{
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true, обход массива прекратится и вся функция hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  })
}

const disabledButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.setAttribute('disabled', true)
  buttonElement.classList.add(inactiveButtonClass);
}

const activateButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
}

const cleanErrorInput = (inputElement) => {
  
}

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)){
    disabledButton(buttonElement, inactiveButtonClass);
  }
  else {
    activateButton(buttonElement, inactiveButtonClass);
    }

}

const setEventsListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
  formElement.addEventListener('submit',(evt)=>{
    evt.preventDefault();
  })
  const popupInputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(popupInputList, buttonElement, inactiveButtonClass);
  formElement.addEventListener('reset', () => {
    disabledButton(buttonElement, inactiveButtonClass);
  });
  popupInputList.forEach((inputElement) =>{
    inputElement.addEventListener('input', function (evt){
      isValid(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(popupInputList, buttonElement, inactiveButtonClass);
    });
  })
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement)=>{
    formElement.addEventListener('submit',(evt)=>{
      evt.preventDefault();
    })
    setEventsListeners(formElement, config.inputSelector, config.submitButtonSelector, config.inactiveButtonClass, config.inputErrorClass, config.errorClass);
  });
};

enableValidation({
  formSelector: '.popup__form', 
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});