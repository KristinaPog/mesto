import {initialCards} from './constants.js';
import {Card} from './card.js';
import {FormValidator} from './validate.js';

const page = document.querySelector('.page');
const editProfileButton = page.querySelector('.profile-info__button'); // кнопка редактирования данных пользователя
const addPlaceButton = page.querySelector('.profile__button'); //находим кнопку добавления нового места
const popupEditProfile = page.querySelector('.popup_edit-profile'); //попап редактирования имени и статуса
const formEditProfile = page.querySelector('.popup__form_edit-profile');
const formAddCard = page.querySelector('.popup__form_add-card');
const popupAddPlace = page.querySelector('.popup_add-card'); //попап добавления карточки
const popupOpenImage = page.querySelector('.popup_open-image'); //попап открытия картинки
const placesList = page.querySelector('.places__list');
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

const config = {
  formSelector: '.popup__form', 
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}; 

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

popups.forEach((popup)=>{
  popup.addEventListener('mousedown', function(evt){
    if (evt.currentTarget === evt.target) {
      closePopup(popup);}
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    } 
}) 
})

const editProfileValidation = new FormValidator (config, formEditProfile);
editProfileValidation.enableValidation();
const addPlaceValidation = new FormValidator(config, formAddCard);
addPlaceValidation.enableValidation();

//Работа с попапами
//Попап добавления Имени и статуса
editProfileButton.addEventListener('click', function () {
  openPopup(popupEditProfile); //открываем попап
  nameInput.value = profileName.textContent; //вставляем в форму значение имени со страницы
  jobInput.value = profileStatus.textContent; //вставляем в форму значение статуса со страницы
});

// Обработчик «отправки» формы попапа редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.Так мы можем определить свою логику отправки.
  // Получите значение полей из свойства value
  editProfileValidation.enableValidation();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  // Вставьте новые значения с помощью textContent
  profileName.textContent = nameValue;
  profileStatus.textContent = jobValue;
  closePopup(popupEditProfile);
}

console.log(initialCards);
initialCards.forEach((item)=>{
  const card = new Card(item.name, item.link, '#place-card');
  const cardElement = card.generateCard();
  initImageOpened (cardElement);
  placesList.prepend(cardElement);
}); 

//Попап добавления нового места
addPlaceButton.addEventListener('click', function () {
  openPopup(popupAddPlace); //открываем попап
});

//обработчик отправки формы попапа добавления места
function handleAddPlaceFormSubmit (event){
  event.preventDefault();
  
  const card =  new Card (inputPlaceName.value, inputPlaceImage.value, '.place-card');
  const cardElement = card.generateCard();
  initImageOpened (cardElement);
  placesList.prepend(cardElement);
  closePopup(popupAddPlace);
  event.target.reset();
}

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formElementProfile.addEventListener('submit', handleProfileFormSubmit);
formElementPlace.addEventListener('submit', handleAddPlaceFormSubmit);

//Попап открытия картинки
function initImageOpened (cardElement) {
  const image = cardElement.querySelector('.place__image');
  image.addEventListener('click', function(evt) {
    openPopup(popupOpenImage);
    popupImage.src = evt.target.src; //перекидываем ссылку
    popupImage.alt = evt.target.alt; //прописываем altы
    popupText.textContent = evt.target.alt;
  });
}