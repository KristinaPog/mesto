const page = document.querySelector('.page');
const openButton = page.querySelector('.profile-info__button');
const popup = page.querySelector('.popup');
// Находим поля формы в DOM
let nameInput = page.querySelector('.popup__input_type_name');
let jobInput = page.querySelector('.popup__input_type_status');
// Выберите элементы, куда должны быть вставлены значения полей
let profileName = page.querySelector('.profile-info__name');
let profileStatus = page.querySelector('.profile-info__status');
const closeButton = page.querySelector('.popup__close');
const formElement = page.querySelector('.popup__form');

function close() {
  popup.classList.remove('popup_opened');
}

function open (){
  popup.classList.add('popup_opened');
}

openButton.addEventListener('click', function () {
  open ();
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
});

closeButton.addEventListener('click', function(){
  close();
});


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.
  // Получите значение полей из свойства value
  let nameValue = nameInput.value;
  let jobValue = jobInput.value;

  // Вставьте новые значения с помощью textContent
  profileName.textContent = nameValue;
  profileStatus.textContent = jobValue;
  close();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);