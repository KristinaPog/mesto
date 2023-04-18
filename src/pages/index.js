import './../pages/index.css';
import { initialCards, validationConfig } from '../scripts/constants.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { FormValidator } from '../components/FormValidator.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage';
import { UserInfo } from '../components/UserInfo';

const page = document.querySelector('.page');
const buttonEditProfile = page.querySelector('.profile-info__button'); // кнопка редактирования данных пользователя
const buttonAddPlace = page.querySelector('.profile__button'); //находим кнопку добавления нового места
const formEditProfile = page.querySelector('.popup__form_edit-profile');
const formAddCard = page.querySelector('.popup__form_add-card');
const nameInput = page.querySelector('.popup__input_type_name'); //поле формы редактирования имени
const jobInput = page.querySelector('.popup__input_type_status'); //поле формы редактирования статуса

const profileFormValidator = new FormValidator(validationConfig, formEditProfile);
const placeFormValidator = new FormValidator(validationConfig, formAddCard);
profileFormValidator.enableValidation();
placeFormValidator.enableValidation();

const user = new UserInfo ({nameSelector:'.profile-info__name', statusSelector:'.profile-info__status'});
const popupEditProfile = new PopupWithForm ('.popup_edit-profile', handleProfileFormSubmit);
const popupAddPlace = new PopupWithForm ('.popup_add-card', handleAddPlaceFormSubmit);
const popupOpenImage = new PopupWithImage ('.popup_open-image');

function openProfileEditPopup() {
  popupEditProfile.open();
  profileFormValidator.resetValidation();
  const userInfo = user.getUserInfo();
  nameInput.value = userInfo.name;
  jobInput.value = userInfo.status;
}

function handleProfileFormSubmit(userData) {
  user.setUserInfo(userData);
}

const bigImage = new PopupWithImage ('.popup_open-image');
const handleCardClick = (name, link)=> {
  bigImage.open(name, link);
}

const createCard = (cardData, templateSelector) => {
  const card = new Card({cardData, handleCardClick}, templateSelector);
  const cardElement = card.generateCard();
  return cardElement;
}

const cards = new Section ({items: initialCards, renderer: (item) =>{
  const newCards = createCard(item, '.place-card');
  cards.addItem(newCards)}}, '.places__list');
cards.renderElements();

//обработчик отправки формы попапа добавления места
function handleAddPlaceFormSubmit({placeName, placeLink}) {
  const cardElement = createCard({name: placeName, link: placeLink}, '.place-card', handleCardClick);
  cards.addItem(cardElement);
  popupAddPlace.close();
}

popupEditProfile.setEventListeners();
popupAddPlace.setEventListeners();
popupOpenImage.setEventListeners();

buttonEditProfile.addEventListener('click', openProfileEditPopup);

buttonAddPlace.addEventListener('click', function () {
  popupAddPlace.open();
  placeFormValidator.resetValidation();
});


