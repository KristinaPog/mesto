const page = document.querySelector('.page');
// Кнопки
const editProfileButton = page.querySelector('.profile-info__button'); // кнопка редактирования данных пользователя
const addPlaceButton = page.querySelector('.profile__button'); //находим кнопку добавления нового места
// const popup = page.querySelector('.popup'); //попап, общая конструкция
const popupEditProfile = page.querySelector('.popup_edit-profile'); //попап редактирования имени и статуса
const popupAddPlace = page.querySelector('.popup_add-card'); //попап добавления карточки
const popupOpenImage = page.querySelector('.popup_open-image'); //попап открытия картинки
let placesList = page.querySelector('.places__list');

// Находим поля формы в DOM
let nameInput = page.querySelector('.popup__input_type_name'); //поле формы редактирования имени
let jobInput = page.querySelector('.popup__input_type_status'); //поле формы редактирования статуса
let placeImageInput = page.querySelector('.popup__input_type_place-name'); //поле добавления ссылки на картинку
let placeLabelInput = page.querySelector('.popup__input_type_place-image'); //поле редактирования ссылки на подпись

const formElement = page.querySelector('.popup__form'); //форма, общая конструкция
const formElementProfile = page.querySelector('.popup__form_edit-profile');//форма добавления имени и статуса
const formElementPlace = page.querySelector('.popup__form_add-card');//форма добавления места
let popupTitle = page.querySelector('.popup__title'); // заголовок общий
let popupTitleProfile = page.querySelector('.popup__title_edit-profile'); //Заголовок формы редактирования профиля
let popupTitleCard = page.querySelector('.popup__title_add-card'); //Заголовок формы добавления мест
const closeButton = page.querySelector('.popup__close'); //кнопка закрытия
const closeButtonEditProfile = page.querySelector('.popup__close_edit-profile'); //кнопка закрытия редактирования профиля
const closeButtonAddPlace = page.querySelector('.popup__close_add-card'); //кнопка закрытия добавления места
const closeButtonOpenImage = page.querySelector('.popup__close_open-image'); //кнопка закрытия картинки
const addCardButton = document.querySelector('.popup__submit_add-card');

// Выберите элементы, куда должны быть вставлены значения полей
let profileName = page.querySelector('.profile-info__name'); //имя пользователя видимое на странице
let profileStatus = page.querySelector('.profile-info__status'); //статус пользователя видимый на странице
let placeImage = page.querySelector('.place__image'); //картинка
let placeLabel = page.querySelector('.place__text'); // подпись

//Функции открытия попапов
function openPopupEditProfile() {
  popupEditProfile.classList.add('popup_opened');
}
function openPopupAddPlace() {
  popupAddPlace.classList.add('popup_opened');
}
function openPopupImage (){
  popupOpenImage.classList.add('popup_opened');
}

//Функции закрытия попапов
function closePopupEditProfile() {
  popupEditProfile.classList.remove('popup_opened');
}
function closePopupAddPlace() {
  popupAddPlace.classList.remove('popup_opened');
}
function closePopupOpenImage() {
  popupOpenImage.classList.remove('popup_opened');
}

//Работа с попапами
// 1. Попап добавления Имени и статуса
editProfileButton.addEventListener('click', function () {
  openPopupEditProfile(); //открываем попап
  nameInput.value = profileName.textContent; //вставляем в форму значение имени со страницы
  jobInput.value = profileStatus.textContent; //вставляем в форму значение статуса со страницы
});
// 2. Попап добавления нового места
addPlaceButton.addEventListener('click', function () {
  openPopupAddPlace(); //открываем попап
});

//Прописываем закрытие по клику на крестик
closeButtonEditProfile.addEventListener('click', closePopupEditProfile);
closeButtonAddPlace.addEventListener('click', closePopupAddPlace);
closeButtonOpenImage.addEventListener('click', closePopupOpenImage);

// Обработчик «отправки» формы попапа редактирования профиля
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.Так мы можем определить свою логику отправки.
  // Получите значение полей из свойства value
  let nameValue = nameInput.value;
  let jobValue = jobInput.value;
  // Вставьте новые значения с помощью textContent
  profileName.textContent = nameValue;
  profileStatus.textContent = jobValue;
  closePopupEditProfile();
}

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formElementProfile.addEventListener('submit', formSubmitHandler);
formElementPlace.addEventListener('submit', formSubmitAddPlace);

//Добавление первых 6 карточек на страницу
const initialCards = [
  {
    name: 'Домбай',
    link: './images/dombay.jpg'
  },
  {
    name: 'Алтай',
    link: './images/altay.jpg'
  },
  {
    name: 'Байкал',
    link: './images/baykal.jpg'
  },
  {
    name: 'Карелия',
    link: './images/karelia.jpg'
  },
  {
    name: 'Санкт-Петербург',
    link: './images/st-petersburg.jpg'
  },
  {
    name: 'Москва',
    link: './images/moscow.jpg'
  }
]; 

//обработчик лайков
function likeToggle () {
  const like = page.querySelector('.like');
  like.addEventListener('click', function(evt){evt.target.classList.toggle('like_active')});
}

//функция удаления элемента
function trashCard() {
  const trash = page.querySelector ('.trash');
  const placeCard = page.querySelector ('.place');
  trash.addEventListener('click', function(evt){placeCard.remove()});
}

//Реализуем начальное добавление карточек
initialCards.forEach(function(card){
  const placeTemplate = page.querySelector('#place-card').content.cloneNode(true); //клонируем темплейт
  const cardText = placeTemplate.querySelector('.place__text');
  cardText.textContent = card.name;
  const cardImage = placeTemplate.querySelector('.place__image');
  cardImage.src = card.link;
  placesList.prepend(placeTemplate);
  likeToggle();
  trashCard();
})

//обработчик отправки формы попапа добавления места
function formSubmitAddPlace (event){
  event.preventDefault();
  const placeElement = page.querySelector('#place-card').content.cloneNode(true);
  placeElement.querySelector('.place__image').src = document.querySelector('.popup__input_type_place-image').value;
  placeElement.querySelector('.place__text').textContent = document.querySelector('.popup__input_type_place-name').value;
  placesList.prepend(placeElement);
  likeToggle();
  closePopupAddPlace();
  trashCard();
}


//попап разворачивания картинки
const image = page.querySelector('.place__image');
image.addEventListener('click', function() {
  openPopupImage();
  //закрываем попап картинки
});
