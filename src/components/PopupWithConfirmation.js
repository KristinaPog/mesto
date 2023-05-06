import {Popup} from "./Popup.js";

export class PopupWithConfirmation extends Popup{
  constructor(popupSelector){
    super(popupSelector);
    this._submit = this._popup.querySelector('.popup__submit_warning');
    
  }

  deleteCard(action){
    this._handleDelete = action;
  }

  setEventListeners(){
    super.setEventListeners();
    this._submit.addEventListener('click', (evt)=>{
      evt.preventDefault();
      this._handleDelete();
    })
  }

}