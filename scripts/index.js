const page = document.querySelector('.page');
// Кнопки
const editProfileButton = page.querySelector('.profile-info__button'); // кнопка редактирования данных пользователя
const addPlaceButton = page.querySelector('.profile__button'); //находим кнопку добавления нового места
const popup = page.querySelector('.popup'); //попап, общая конструкция
const popupEditProfile = page.querySelector('.popup_edit-profile'); //попап редактирования имени и статуса
const popupAddPlace = page.querySelector('.popup_add-card'); //попап добавления карточки
const popupOpenImage = page.querySelector('.popup_open-image'); //попап открытия картинки
const placesList = page.querySelector('.places__list');

// Находим поля формы в DOM
const nameInput = page.querySelector('.popup__input_type_name'); //поле формы редактирования имени
const jobInput = page.querySelector('.popup__input_type_status'); //поле формы редактирования статуса
const placeImageInput = page.querySelector('.popup__input_type_place-name'); //поле добавления ссылки на картинку
const placeLabelInput = page.querySelector('.popup__input_type_place-image'); //поле редактирования ссылки на подпись

const formElementProfile = page.querySelector('.popup__form_edit-profile');//форма добавления имени и статуса
const formElementPlace = page.querySelector('.popup__form_add-card');//форма добавления места
const popupTitleProfile = page.querySelector('.popup__title_edit-profile'); //Заголовок формы редактирования профиля
const popupTitleCard = page.querySelector('.popup__title_add-card'); //Заголовок формы добавления мест
const closeButton = page.querySelector('.popup__close'); //кнопка закрытия
const closeButtonEditProfile = page.querySelector('.popup__close_edit-profile'); //кнопка закрытия редактирования профиля
const closeButtonAddPlace = page.querySelector('.popup__close_add-card'); //кнопка закрытия добавления места
const closeButtonOpenImage = page.querySelector('.popup__close_open-image'); //кнопка закрытия картинки
const addCardButton = document.querySelector('.popup__submit_add-card');

// Выберите элементы, куда должны быть вставлены значения полей
const profileName = page.querySelector('.profile-info__name'); //имя пользователя видимое на странице
const profileStatus = page.querySelector('.profile-info__status'); //статус пользователя видимый на странице
const placeImage = page.querySelector('.place__image'); //картинка
const placeLabel = page.querySelector('.place__text'); // подпись

//Функции открытия попапов
function openPopup(popup){
  popup.classList.add('popup_opened');
}

//Функции закрытия попапов
function closePopup(popup){
  popup.classList.remove('popup_opened');
}

//Работа с попапами
// 1. Попап добавления Имени и статуса
editProfileButton.addEventListener('click', function () {
  openPopup(popupEditProfile); //открываем попап
  nameInput.value = profileName.textContent; //вставляем в форму значение имени со страницы
  jobInput.value = profileStatus.textContent; //вставляем в форму значение статуса со страницы
});
// 2. Попап добавления нового места
addPlaceButton.addEventListener('click', function () {
  openPopup(popupAddPlace); //открываем попап
});

//Прописываем закрытие по клику на крестик
closeButtonEditProfile.addEventListener('click', function(){closePopup(popupEditProfile);});
closeButtonAddPlace.addEventListener('click', function(){closePopup(popupAddPlace)});
closeButtonOpenImage.addEventListener('click', function(){closePopup(popupOpenImage)});

// Обработчик «отправки» формы попапа редактирования профиля
function formSubmitEditProfile(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.Так мы можем определить свою логику отправки.
  // Получите значение полей из свойства value
  let nameValue = nameInput.value;
  let jobValue = jobInput.value;
  // Вставьте новые значения с помощью textContent
  profileName.textContent = nameValue;
  profileStatus.textContent = jobValue;
  closePopup(popupEditProfile);
}

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formElementProfile.addEventListener('submit', formSubmitEditProfile);
formElementPlace.addEventListener('submit', formSubmitAddPlace);

//обработчик лайков
function initLikeToggle (cardElement) {
  const like = cardElement.querySelector('.like');
  like.addEventListener('click', function(evt){evt.target.classList.toggle('like_active')});
}

//функция удаления элемента
function initDeleteCard(cardElement) {
  const trash = cardElement.querySelector ('.trash');
  const placeCard = cardElement.querySelector ('.place');
  trash.addEventListener('click', function(){placeCard.remove()});
}

//Реализуем начальное добавление карточек
initialCards.forEach(function(card){
  const newPlace = page.querySelector('#place-card').content.cloneNode(true); //клонируем темплейт
  const cardText = newPlace.querySelector('.place__text');
  cardText.textContent = card.name;
  const cardImage = newPlace.querySelector('.place__image');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  initLikeToggle(newPlace);
  initDeleteCard(newPlace);
  initImageOpened(newPlace);
  placesList.prepend(newPlace);
  
})

//обработчик отправки формы попапа добавления места
function formSubmitAddPlace (event){
  event.preventDefault();
  const placeElement = page.querySelector('#place-card').content.cloneNode(true);
  placeElement.querySelector('.place__image').src = document.querySelector('.popup__input_type_place-image').value;
  placeElement.querySelector('.place__text').textContent = document.querySelector('.popup__input_type_place-name').value;
  placeElement.querySelector('.place__image').alt = placeElement.querySelector('.place__text').textContent;
  initLikeToggle(placeElement);
  initDeleteCard(placeElement);
  initImageOpened(placeElement);
  placesList.prepend(placeElement);
  closePopup(popupAddPlace);
}

//Попап открытия картинки
function initImageOpened (cardElement) {
  const image = cardElement.querySelector('.place__image');
  image.addEventListener('click', function(evt) {
    openPopup(popupOpenImage);
    const popupImage = page.querySelector('.popup__image'); //куда вставляем картинку
    popupImage.src = evt.target.src; //перекидываем ссылку
    popupImage.alt = evt.target.alt; //прописываем altы
    const popupText = page.querySelector('.popup__text'); //куда вставляем текст
    popupText.textContent = evt.target.alt;
  });
}

