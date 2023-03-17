const popupForm = page.querySelector('.popup__form');

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

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement)=>{
    formElement.addEventListener('submit',(evt)=>{
      evt.preventDefault();
    })
    setEventsListeners(formElement);
  });
};

enableValidation();

















// Разбейте код валидации на функции. 
// Вы уже делали это в теме «Валидация форм». 
// Сделайте функцию enableValidation ответственной за включение валидации всех форм. 
// Пусть она принимает как объект настроек все нужные функциям классы и селекторы элементов:

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// });


// 