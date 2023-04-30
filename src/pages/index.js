import './../pages/index.css';
import { validationConfig } from '../scripts/constants.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage';
import { UserInfo } from '../components/UserInfo';
import { Api } from '../components/Api';
import { Popup } from '../components/Popup';

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

const buttonWarning = page.querySelector('.popup__submit_warning');
const profileFormValidator = new FormValidator(validationConfig, formEditProfile);
const placeFormValidator = new FormValidator(validationConfig, formAddCard);
const avatarFormValidator = new FormValidator(validationConfig, formEditAvatar);
profileFormValidator.enableValidation();
placeFormValidator.enableValidation();
avatarFormValidator.enableValidation();


const user = new UserInfo({ nameSelector: '.profile-info__name', statusSelector: '.profile-info__status', avatarSelector:'.profile__avatar'});
const popupEditProfile = new PopupWithForm('.popup_edit-profile', handleProfileFormSubmit);
const popupAddPlace = new PopupWithForm('.popup_add-card', handleAddPlaceFormSubmit);
const popupEditAvatar = new PopupWithForm('.popup_edit-avatar', handleEditAvatarFormSubmit);
const popupWarning = new Popup('.popup_warning');
const popupOpenImage = new PopupWithImage('.popup_open-image');

const api = new Api('06e18fd4-8469-488a-86d3-e71284eb84c0', 'https://mesto.nomoreparties.co/v1/cohort-65/');

function openProfileEditPopup() {
  popupEditProfile.open();
  profileFormValidator.resetValidation();
  const userInfo = user.getUserInfo();
  nameInput.value = userInfo.name;
  jobInput.value = userInfo.about;
}

function handleProfileFormSubmit(userData) {
  api.setUserInfo(userData)
    .then((res)=>{
      user.setUserInfo(res)});
}

function handleEditAvatarFormSubmit(userData){
  api.setAvatar(userData).then((res)=>{
    console.log(res); 
    user.setUserInfo(res);
  })
  // 
  }

const bigImage = new PopupWithImage('.popup_open-image');
const handleCardClick = (name, link) => {
  bigImage.open(name, link);
}

const createCard = (cardData, templateSelector) => {
  const card = new Card({ cardData, handleCardClick }, templateSelector);
  const cardElement = card.generateCard();
  return cardElement;
}

api.getInitialCards()
  .then((data) => {
    cards.renderElements(data);
  })

api.getUserInfo().then((userData) => {
  console.log(userData);
  user.setUserInfo(userData);
  avatar.src = userData.avatar;
})

const cards = new Section({
  renderer: (item) => {
    const newCards = createCard(item, '.place-card');
    cards.addItem(newCards)
  }
}, '.places__list');

//обработчик отправки формы попапа добавления места
function handleAddPlaceFormSubmit({ name, link }) {
  api.setNewCard({ name, link }).then((res) => {
    const cardElement = createCard({ name: res.name, link: res.link }, '.place-card', handleCardClick);
    return cards.addItem(cardElement);
  });

  popupAddPlace.close();
}

popupEditProfile.setEventListeners();
popupAddPlace.setEventListeners();
popupOpenImage.setEventListeners();
popupEditAvatar.setEventListeners();

buttonEditProfile.addEventListener('click', openProfileEditPopup);

buttonAddPlace.addEventListener('click', function () {
  popupAddPlace.open();
  placeFormValidator.resetValidation();
});



avatarContainer.addEventListener('click', function (){popupEditAvatar.open()});

