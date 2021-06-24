export const settings = {
  url: 'https://api.unsplash.com/',
  // ключ для доступа к общим функциям API, которые не требует идентификации пользователя (например функция лайков требует идентификации)
  // выдается после регистрации приложения в сервисе unsplash
  client_id: '1c9cdfe7008e8accf5df7453bf2548202bc55308c810ec1ff83bdefcf3afd991',
  client_secret: '1f7f2011ef95c8bf2aa31ae0d07d75ebfe35b410cb49b792f95934717cf4f6f7'
}

export const auth = {
  url: 'https://unsplash.com/oauth/authorize',
  tokenUrl: 'https://unsplash.com/oauth/token',

  redirect_uri: 'http://localhost:8080/oauth/callback',
  response_type: 'code',
  grant_type: 'authorization_code',
  scope: 'public+write_photos+read_user+write_user+write_followers+read_photos+write_likes', // права
  request: function () {
    return this.url + '?client_id=' + settings.client_id + '&redirect_uri=' + this.redirect_uri + '&response_type=' + this.response_type + '&scope=' + this.scope
  },
  getToken: function (code) {
    return this.tokenUrl + '?client_id=' + settings.client_id + '&client_secret=' + settings.client_secret +
      '&redirect_uri=' + this.redirect_uri + '&grant_type=' + this.grant_type + '&code=' + code
  }
}

export const entities = {
  images: 'images',
  collections: 'collections',
  users: 'users'
}

export const status = {
  NOT_ASKED: 'not_asked',
  FETCHING: 'fetching', // Данные загружаются в первый раз
  LOADED: 'loaded', // Данные загружены
  PENDING: 'pending', // Данные загружаются, но уже были загружены ранее
  NEEDS_UPDATE: 'needs_update', // Данные уже были загружены но нуждаются в обновлении
  FAILURE: 'failure',
  ERROR: 'error'
}
