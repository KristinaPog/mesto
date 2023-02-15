const page= document.querySelector('.page');
const openButton = page.querySelector('.profile-info__button');
const popup = page.querySelector('.popup');
console.log(popup);
openButton.addEventListener('click', function(){
  popup.classList.add('popup_opened');
})

const closeButton = page.querySelector('.popup__close');
closeButton.addEventListener('click', function(){
  popup.classList.remove('popup_opened');
});

const formElement = page.querySelector('.popup__form');
console.log(formElement);


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
	evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
												// Так мы можем определить свою логику отправки.
												// О том, как это делать, расскажем позже.

	// Находим поля формы в DOM
	let nameInput = page.querySelector('.popup__input_type_name'); 
	let jobInput = page.querySelector('.popup__input_type_status'); 
  // console.log(nameInput);
  // console.log(jobInput);

	// Получите значение полей из свойства value
  let nameValue = nameInput.value;
  let jobValue = jobInput.value;

	// Выберите элементы, куда должны быть вставлены значения полей
  let profileName = page.querySelector('.profile-info__name');
  let profileStatus = page.querySelector('.profile-info__status');

	// Вставьте новые значения с помощью textContent
  profileName.textContent = nameValue;
  profileStatus.textContent = jobValue;
  popup.classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
