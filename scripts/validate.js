// функция добавляет класс со стилями инпутов при ошибке
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  // Показываем сообщение об ошибке
  errorElement.classList.add('popup__input-error_active');
}


//функция удаляет класс со стилями инпутов при ошибке
const hideInputError = (formElement, inputElement) => {
  //находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.textContent = '';
  errorElement.classList.remove('popup__input-error_active');
}

const isValid = (formElement, inputElement) => {
  if(!inputElement.validity.valid){
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {hideInputError(formElement, inputElement);}
} ;

const hasInvalidInput = (inputList) =>{
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  })
}

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)){
    buttonElement.setAttribute('disabled', true)
    buttonElement.classList.add('popup__submit_inactive');
  }
  else {
    buttonElement.classList.remove('popup__submit_inactive');
    buttonElement.removeAttribute('disabled');}

}

const setEventsListeners = (formElement) => {
  formElement.addEventListener('submit',(evt)=>{
    evt.preventDefault();
  })
  
  const popupInputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__submit');
  toggleButtonState(popupInputList, buttonElement);
    popupInputList.forEach((inputElement) =>{
      inputElement.addEventListener('input', function (evt){
        isValid(formElement, inputElement);
        toggleButtonState(popupInputList, buttonElement);
      });
    
  })};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement)=>{
    formElement.addEventListener('submit',(evt)=>{
      evt.preventDefault();
    })
    setEventsListeners(formElement);
  });
};

enableValidation({
  formSelector: '.popup__form',
});