const page = document.querySelector('.page');
// Кнопки
const editProfileButton = page.querySelector('.profile-info__button'); // кнопка редактирования данных пользователя
const addPlaceButton = page.querySelector('.profile__button'); //находим кнопку добавления нового места

const popupEditProfile = page.querySelector('.popup_edit-profile'); //попап редактирования имени и статуса
const popupAddPlace = page.querySelector('.popup_add-card'); //попап добавления карточки
const popupOpenImage = page.querySelector('.popup_open-image'); //попап открытия картинки
const placesList = page.querySelector('.places__list');

// Находим поля формы в DOM
const nameInput = page.querySelector('.popup__input_type_name'); //поле формы редактирования имени
const jobInput = page.querySelector('.popup__input_type_status'); //поле формы редактирования статуса
const placeImageInput = page.querySelector('.popup__input_type_place-name'); //поле добавления ссылки на картинку
const placeLabelInput = page.querySelector('.popup__input_type_place-image'); //поле редактирования ссылки на подпись

const formElementProfile = document.forms['editProfileForm'];//форма добавления имени и статуса
const formElementPlace = document.forms['addCardForm']//форма добавления места
const popupTitleProfile = page.querySelector('.popup__title_edit-profile'); //Заголовок формы редактирования профиля
const popupTitleCard = page.querySelector('.popup__title_add-card'); //Заголовок формы добавления мест
const addCardButton = document.querySelector('.popup__submit_add-card');

// Выберите элементы, куда должны быть вставлены значения полей
const profileName = page.querySelector('.profile-info__name'); //имя пользователя видимое на странице
const profileStatus = page.querySelector('.profile-info__status'); //статус пользователя видимый на странице
const placeImage = page.querySelector('.place__image'); //картинка
const popupImage = page.querySelector('.popup__image'); //куда вставляем картинку
const placeLabel = page.querySelector('.place__text'); // подпись
const popupText = page.querySelector('.popup__text'); //куда вставляем текст
const inputPlaceName = document.querySelector('.popup__input_type_place-name'); //инпут названия места
const inputPlaceImage = document.querySelector('.popup__input_type_place-image'); //инпут ссылки 

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

const popups = page.querySelectorAll('.popup');
popups.forEach((popup)=>{
  popup.addEventListener('mousedown', function(evt){
    if (evt.currentTarget === evt.target) {
      closePopup(popup);}
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    } 
}) 
})

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

// Обработчик «отправки» формы попапа редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.Так мы можем определить свою логику отправки.
  // Получите значение полей из свойства value
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  // Вставьте новые значения с помощью textContent
  profileName.textContent = nameValue;
  profileStatus.textContent = jobValue;
  closePopup(popupEditProfile);
}

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formElementProfile.addEventListener('submit', handleProfileFormSubmit);
formElementPlace.addEventListener('submit', handleAddPlaceFormSubmit);

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
//создаем функцию создания карточки, аргументами в неё должны приходить имя и ссылка на изображение
const createCard = function({name, link}) {
  const newPlace = page.querySelector('#place-card').content.cloneNode(true);
  const cardText = newPlace.querySelector('.place__text'); 
  cardText.textContent = name; 
  const cardImage = newPlace.querySelector('.place__image'); 
  cardImage.src = link; 
  cardImage.alt = name; 
  initDeleteCard(newPlace);
  initLikeToggle(newPlace);
  initImageOpened(newPlace);
  return newPlace;
}

//создаем функцию, которая будет включать функцию создания карточки
const renderCard = function (cardData) {
    const newCard = createCard(cardData);
    placesList.prepend(newCard);
}

// перебираем массив из которого берем значения name и link и создаём карточки
initialCards.forEach(renderCard);

//обработчик отправки формы попапа добавления места
function handleAddPlaceFormSubmit (event){
  event.preventDefault();
  renderCard({name: inputPlaceName.value, link: inputPlaceImage.value});
  closePopup(popupAddPlace);
  event.target.reset();
}

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


