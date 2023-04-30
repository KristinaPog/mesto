export class UserInfo {
  constructor({nameSelector, statusSelector, avatarSelector}) {
    this._name = document.querySelector(nameSelector);
    this._status =  document.querySelector(statusSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const profile = {
      name: this._name.textContent,
      about: this._status.textContent,
    };
    return profile;
  };

  setUserInfo(user) {
    this._name.textContent = user.name;
    this._status.textContent = user.about;
    this._avatar.src = user.avatar;
  }
}