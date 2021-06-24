import { settings } from './settings'
import FileSaver from 'file-saver'
import * as storage from 'Utils/storage'

// Скачать файл
export const DOWNLOAD = async (url, filename, save = true, headers) => {
  try {
    const res = await fetch(url, { headers: headers || setHeaders() })
    const blob = await res.blob()
    return save ? FileSaver.saveAs(blob, filename) : blob
  } catch (error) {
    processError('DOWNLOAD', error)
  }
}

// DELETE запрос (параметр api определяет нужно ли добавлять базовый url к запросу или же url полный)
export const DELETE = async ({ url, headers, api = true }) => {
  const fetchUrl = api ? `${settings.url}${url}` : url
  try {
    const res = await fetch(fetchUrl, {
      headers: headers || setHeaders(),
      method: 'delete'
    })
    const json = await res.json()

    // Ответ получен, но с ошибкой
    if (!res.ok) {
      throw processResponseFalse(res.status, json)
    }
    return json
  } catch (error) {
    processError('POST', error)
  }
}

// POST запрос (параметр api определяет нужно ли добавлять базовый url к запросу или же url полный)
export const POST = async ({ url, data, headers, api = true }) => {
  const fetchUrl = api ? `${settings.url}${url}` : url
  try {
    const res = await fetch(fetchUrl, {
      headers: headers || setHeaders(),
      method: 'post',
      body: JSON.stringify(data)
    })
    const json = await res.json()

    // Ответ получен, но с ошибкой
    if (!res.ok) {
      throw processResponseFalse(res.status, json)
    }
    return json
  } catch (error) {
    processError('POST', error)
  }
}

// GET запрос (параметр api определяет нужно ли добавлять базовый url к запросу или же url полный )
export const GET = async ({ url, headers, api = true }) => {
  const fetchUrl = api ? `${settings.url}${url}` : url
  try {
    const res = await fetch(fetchUrl, { headers: headers || setHeaders() })

    const total = await res.headers.get('x-total') // общее количество страниц по данному запросу
    const data = await res.json()

    // Ответ получен, но с ошибкой
    if (!res.ok) {
      throw processResponseFalse(res.status, data)
    }

    return { data, total }
  } catch (error) {
    processError('GET', error)
  }
}

// Обработка ответа с ошибкой
const processResponseFalse = (status, json) => {
  let message = 'Произошла ошибка! Не удалось выполнить запрос'
  switch (status) {
    case 400:
      message = 'Ошибка в запросе! Не удалось получить данные'
      break
    case 401:
      message = 'Неверный token пользователя!'
      break
    case 404:
      message = 'Не найдена указанная страница!'
      break
    case 502:
      message = 'Нет ответа от сервера!'
      break
  }
  return {
    status: status,
    message,
    comment: JSON.stringify(json)
  }
}

// Обработка ошибки
const processError = (request, error) => {
  console.log(`%c ${request} request error: `, 'color:white;background:red;border-radius: 4px', error)
  throw {
    status: error.status || error,
    message: error.status ? error.message : 'Ошибка соединения! Проверьте соединение с интернетом, настройки и попробуйте еще раз!',
    comment: error.comment || ''
  }
}

// standard headers
const setHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: storage.get('auth') ? `Bearer ${storage.get('auth')}` : `Client-ID ${settings.client_id}`
})
