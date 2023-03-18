const page = document.querySelector('.page');
// Кнопки
const editProfileButton = page.querySelector('.profile-info__button'); // кнопка редактирования данных пользователя
const addPlaceButton = page.querySelector('.profile__button'); //находим кнопку добавления нового места
// const popup = page.querySelector('.popup'); //попап, общая конструкция
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

function closePopupEsc(popupElement) {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {closePopup(popupElement);}
  })
}

function close(){
  const popups = page.querySelectorAll('.popup');
  popups.forEach((popup)=>{
    popup.addEventListener('click', function(evt){if (evt.currentTarget === evt.target) {
      closePopup(popup);}})
    closePopupEsc(popup);
  })
}

close();

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
closeButtonEditProfile.addEventListener('click', function(){closePopup(popupEditProfile)});
closeButtonAddPlace.addEventListener('click', function(){closePopup(popupAddPlace)});
closeButtonOpenImage.addEventListener('click', function(){closePopup(popupOpenImage)});

// Обработчик «отправки» формы попапа редактирования профиля
function formSubmitEditProfile(evt) {
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
//создаем функцию создания карточки, аргументами в неё должны приходить имя и ссылка на изображение
const createCard = function({name, link}) {
  //клонируем темплейт, чтоб получилась заготовка новой карточки
  const newPlace = page.querySelector('#place-card').content.cloneNode(true);
  //прописываем, что из этого заголовок новой карточки 
  const cardText = newPlace.querySelector('.place__text'); 
  //говорим что текст заголовка взять из переданного аргумента name
  cardText.textContent = name; 
  // прописываем, что из темплейта картинка
  const cardImage = newPlace.querySelector('.place__image'); 
  // говорим, что ссылка у этой картинки аргумент линк
  cardImage.src = link; 
  // альту задаем эквивалентное заголовку значение
  cardImage.alt = name; 
  //вешаем обработчик, который будет висеть на корзине и ждать пока на него щёлкнут, обработчик привязан именно к созданной карточке
  initDeleteCard(newPlace);
  //обработчик корзины
  initLikeToggle(newPlace);
  //обработчик открытия картинки 
  initImageOpened(newPlace);
  //возвращаем итоговые значения карточки - карточка готова
  return newPlace;
}

//создаем функцию, которая будет включать функцию создания карточки и вставлять куда надо. 
// Аргументом мы передаем данные карточки, которые дальше передадим в функцию создания карточки
const renderCard = function (cardData) {
  // создаём новую карточку с переданными данными
    const newCard = createCard(cardData);
    // вставляем эту карточку в нужное место
    placesList.prepend(newCard);
}

// перебираем массив из которого берем значения name и link и создаём карточки
initialCards.forEach(function(card){renderCard(card);});


//обработчик отправки формы попапа добавления места
function formSubmitAddPlace (event){
  event.preventDefault();
  renderCard({name: document.querySelector('.popup__input_type_place-name').value, link: document.querySelector('.popup__input_type_place-image').value});
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


