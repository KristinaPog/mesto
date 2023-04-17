//Добавление первых 6 карточек на страницу
import dombayImage from '../images/dombay.jpg';
import altayImage from '../images/altay.jpg';
import baykalImage from '../images/baykal.jpg';
import kareliaImage from '../images/karelia.jpg';
import stPetersburgImage from '../images/st-petersburg.jpg';
import moscowImage from '../images/moscow.jpg';

export const initialCards = [
  {
    name: 'Домбай',
    link: dombayImage
  },
  {
    name: 'Алтай',
    link: altayImage
  },
  {
    name: 'Байкал',
    link: baykalImage
  },
  {
    name: 'Карелия',
    link: kareliaImage
  },
  {
    name: 'Санкт-Петербург',
    link: stPetersburgImage
  },
  {
    name: 'Москва',
    link: moscowImage
  }
]; 

export const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};