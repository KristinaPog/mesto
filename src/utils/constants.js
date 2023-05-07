export const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

export const page = document.querySelector('.page');
export const buttonEditProfile = page.querySelector('.profile-info__button'); 
export const buttonAddPlace = page.querySelector('.profile__button'); 
export const formEditProfile = page.querySelector('.popup__form_edit-profile');
export const formAddCard = page.querySelector('.popup__form_add-card');
export const nameInput = page.querySelector('.popup__input_type_name'); 
export const jobInput = page.querySelector('.popup__input_type_status'); 
export const avatar = page.querySelector('.profile__avatar'); 
export const avatarContainer = page.querySelector('.profile__avatar-container');
export const formEditAvatar = page.querySelector('.popup__form_edit-avatar');