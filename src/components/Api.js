export class Api {
  constructor(userID, url) {
    this._user = userID;
    this._url = url;
  }

  _checkingTheServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    else return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._url}cards`, {
      method: "GET",
      headers: {
        authorization: this._user
      }
    })
      .then(this._checkingTheServerResponse)
  }

  setNewCard(cardData) {
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: {
        authorization: this._user,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })
    }).then(this._checkingTheServerResponse)
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      method: "GET",
      headers: {
        authorization: this._user
      }
    })
      .then(this._checkingTheServerResponse)
  }

  setUserInfo(userInfo) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._user,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.about
      })
    })
      .then(this._checkingTheServerResponse)
  }

  setAvatar(userInfo) {
    return fetch(`${this._url}users/me/avatar `, {
      method: "PATCH",
      headers: {
        authorization: this._user,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: userInfo.avatar
      })
    })
      .then(this._checkingTheServerResponse)
  }

  setLike(cardId) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._user,
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkingTheServerResponse)
  }

  deleteLike(cardId) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._user,
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkingTheServerResponse)
  }

  deleteCard(cardId) {
    return fetch(`${this._url}cards/${cardId} `, {
      method: "DELETE",
      headers: {
        authorization: this._user,
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkingTheServerResponse)
  }
}