import './../pages/index.css';
import { validationConfig } from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage';
import { UserInfo } from '../components/UserInfo';
import { Api } from '../components/Api';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation';
import { data } from 'autoprefixer';

const page = document.querySelector('.page');
const buttonEditProfile = page.querySelector('.profile-info__button'); // кнопка редактирования данных пользователя
const buttonAddPlace = page.querySelector('.profile__button'); //находим кнопку добавления нового места
const formEditProfile = page.querySelector('.popup__form_edit-profile');
const formAddCard = page.querySelector('.popup__form_add-card');
const nameInput = page.querySelector('.popup__input_type_name'); //поле формы редактирования имени
const jobInput = page.querySelector('.popup__input_type_status'); //поле формы редактирования статуса
const avatar = page.querySelector('.profile__avatar'); //аватар
const avatarContainer = page.querySelector('.profile__avatar-container');
const formEditAvatar = page.querySelector('.popup__form_edit-avatar');

const user = new UserInfo({ nameSelector: '.profile-info__name', statusSelector: '.profile-info__status', avatarSelector: '.profile__avatar' });
const popupEditProfile = new PopupWithForm('.popup_edit-profile', handleProfileFormSubmit);
const popupAddPlace = new PopupWithForm('.popup_add-card', handleAddPlaceFormSubmit);
const popupEditAvatar = new PopupWithForm('.popup_edit-avatar', handleEditAvatarFormSubmit);
const popupWarning = new PopupWithConfirmation('.popup_warning');
const popupOpenImage = new PopupWithImage('.popup_open-image');
const profileFormValidator = new FormValidator(validationConfig, formEditProfile);
const placeFormValidator = new FormValidator(validationConfig, formAddCard);
const avatarFormValidator = new FormValidator(validationConfig, formEditAvatar);
profileFormValidator.enableValidation();
placeFormValidator.enableValidation();
avatarFormValidator.enableValidation();

const api = new Api('06e18fd4-8469-488a-86d3-e71284eb84c0', 'https://mesto.nomoreparties.co/v1/cohort-65/');
let userId;

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([data, userData]) => {
    userId = userData._id;
    cards.renderElements(data, userId);
    user.setUserInfo(userData);
    avatar.src = userData.avatar;
  })
  .catch((error) => { console.log(`Ошибка: ${error}`) });


function openProfileEditPopup() {
  popupEditProfile.open();
  profileFormValidator.resetValidation();
  const userInfo = user.getUserInfo();
  nameInput.value = userInfo.name;
  jobInput.value = userInfo.about;
}

function handleProfileFormSubmit(userData) {
  popupEditProfile.saveLoading(true);
  api.setUserInfo(userData)
    .then((res) => {
      user.setUserInfo(res)
    })
    .catch((error) => { console.log(`Ошибка: ${error}`) })
    .finally(() => { popupEditProfile.saveLoading(false); })
}

function handleEditAvatarFormSubmit(userData) {
  api.setAvatar(userData)
    .then((res) => {
      user.setUserInfo(res);
    })
    .catch((error) => { console.log(`Ошибка: ${error}`) })
}

const handleCardClick = (name, link) => {
  popupOpenImage.open(name, link);
}

const createCard = (cardData, userId, templateSelector) => {
  const card = new Card({
    cardData: cardData,
    userId: userId,
    handleCardClick: handleCardClick,
    handleLikeClick: (card) => {
      if (card.isLiked()) {
        api.deleteLike(card.cardId)
          .then((res) => {
            card.deleteLike();
            card.countLikes(res);
          })
          .catch((error) => { console.log(`Ошибка: ${error}`) })
      }
      else {
        api.setLike(card.cardId)
          .then((res) => {
            card.setLike();
            card.countLikes(res);
          })
          .catch((error) => { console.log(`Ошибка: ${error}`) })
      }
    },
    handleDeleteIconClick: (cardId) => {
      popupWarning.open();
      popupWarning.deleteCard(() => {
        api.deleteCard(cardId)
          .then(() => {
            card.deleteCard();
            popupWarning.close();
          })
          .catch((error) => { console.log(`Ошибка: ${error}`) })
      })
    }
  }, templateSelector);
  const cardElement = card.generateCard();
  return cardElement;
}

const cards = new Section({
  renderer: (item, userId) => {
    const newCards = createCard(item, userId, '.place-card');
    cards.addItem(newCards)
  }
}, '.places__list');

buttonAddPlace.addEventListener('click', function () {
  popupAddPlace.open();
  placeFormValidator.resetValidation();
});

function handleAddPlaceFormSubmit(data) {
  popupAddPlace.saveLoading(true);
  api.setNewCard(data)
    .then((res) => {
      const cardElement = createCard(res, userId, '.place-card');
      return cards.addItem(cardElement);
    })
    .catch((error) => { console.log(`Ошибка: ${error}`) })
    .finally(() => { popupAddPlace.saveLoading(false); 
      popupAddPlace.close();
    })
  
}

popupEditProfile.setEventListeners();
popupAddPlace.setEventListeners();
popupOpenImage.setEventListeners();
popupEditAvatar.setEventListeners();
popupWarning.setEventListeners();

buttonEditProfile.addEventListener('click', openProfileEditPopup);
avatarContainer.addEventListener('click', function () { popupEditAvatar.open() });


