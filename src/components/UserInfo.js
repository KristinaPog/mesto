export class UserInfo {
  constructor({nameSelector, statusSelector}) {
    this._nameSelector = document.querySelector(nameSelector);
    this._statusSelector =  document.querySelector(statusSelector);
  }

  getUserInfo() {
    const profile = {
      name: this._nameSelector.textContent,
      status: this._statusSelector.textContent
    };
    return profile;
  };

  setUserInfo(user) {
    this._nameSelector.textContent = user.name;
    this._statusSelector.textContent = user.status;
  }
}