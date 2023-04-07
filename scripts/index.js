import {initialCards} from './constants.js';
import { Card } from './Card.js';
import {FormValidator} from './FormValidator.js';

const page = document.querySelector('.page');
const buttonEditProfile = page.querySelector('.profile-info__button'); // кнопка редактирования данных пользователя
const buttonAddPlace = page.querySelector('.profile__button'); //находим кнопку добавления нового места
const popupEditProfile = page.querySelector('.popup_edit-profile'); //попап редактирования имени и статуса
const formEditProfile = page.querySelector('.popup__form_edit-profile');
const formAddCard = page.querySelector('.popup__form_add-card');
const popupAddPlace = page.querySelector('.popup_add-card'); //попап добавления карточки
const popupOpenImage = page.querySelector('.popup_open-image'); //попап открытия картинки
const placesContainer = page.querySelector('.places__list');
const nameInput = page.querySelector('.popup__input_type_name'); //поле формы редактирования имени
const jobInput = page.querySelector('.popup__input_type_status'); //поле формы редактирования статуса
const formElementProfile = document.forms['editProfileForm'];//форма добавления имени и статуса
const formElementPlace = document.forms['addCardForm']//форма добавления места
const profileName = page.querySelector('.profile-info__name'); //имя пользователя видимое на странице
const profileStatus = page.querySelector('.profile-info__status'); //статус пользователя видимый на странице
const popupImage = page.querySelector('.popup__image'); //куда вставляем картинку
const popupText = page.querySelector('.popup__text'); //куда вставляем текст
const inputPlaceName = document.querySelector('.popup__input_type_place-name'); //инпут названия места
const inputPlaceImage = document.querySelector('.popup__input_type_place-image'); //инпут ссылки 
const popups = page.querySelectorAll('.popup');

const validationConfig = {
  formSelector: '.popup__form', 
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}; 

const editProfileValidation = new FormValidator (validationConfig, formEditProfile);
const addPlaceValidation = new FormValidator(validationConfig, formAddCard);
editProfileValidation.enableValidation();
addPlaceValidation.enableValidation();

//Функции открытия попапов
function openPopup(popup){
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

//Функции закрытия попапов
function closePopup(popup){
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

function closePopupByEsc (evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

function preparationPopup() {
  openPopup(popupEditProfile); 
  nameInput.value = profileName.textContent; 
  jobInput.value = profileStatus.textContent; 
}

// Обработчик «отправки» формы попапа редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  profileName.textContent = nameValue;
  profileStatus.textContent = jobValue;
  closePopup(popupEditProfile);
}

//Попап открытия картинки
const handleImageClick = (name, link) => {
  popupImage.src = link; 
  popupImage.alt = name; 
  popupText.textContent = name;
  openPopup(popupOpenImage);
}

function createCard (item, templateSelector) {
  const card =  new Card (item, templateSelector, handleImageClick);
  const cardElement = card.generateCard();
  return cardElement;
}

//обработчик отправки формы попапа добавления места
function handleAddPlaceFormSubmit (event){
  event.preventDefault();
  const cardElement = createCard({name: inputPlaceName.value, link: inputPlaceImage.value}, '.place-card', handleImageClick);
  placesContainer.prepend(cardElement);
  closePopup(popupAddPlace);
  event.target.reset();
}

popups.forEach((popup)=>{
  popup.addEventListener('mousedown', function(evt){
    if (evt.currentTarget === evt.target) {
      closePopup(popup);}
    else if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    } 
}) 
})

buttonEditProfile.addEventListener('click', preparationPopup);

initialCards.forEach((item)=>{
  const cardElement = createCard(item, '.place-card');
  placesContainer.prepend(cardElement);
}); 

buttonAddPlace.addEventListener('click', function () {
  openPopup(popupAddPlace);
});

formElementProfile.addEventListener('submit', handleProfileFormSubmit);
formElementPlace.addEventListener('submit', handleAddPlaceFormSubmit);

