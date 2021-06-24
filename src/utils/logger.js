// Создаем MiddleWare (модифицурует dispatch)
// В данном случае добавляем вывод в консоль информацию об action и о состоянии store до и после изменения
const logger = ({ getState }) => next => action => {
  console.group('Type: ', action.type)
  console.log('%c Action details ', 'color: blue;font-weight:bold', action)
  // console.log('%c Action details ', 'background-color: orange; color: white; border-radius: 4px', action)
  const returnValue = next(action)
  console.log('%c state ', 'color: blue;font-weight:bold', getState())
  // console.log('%c state ', 'background-color: blue; color: white; border-radius: 4px', getState())
  console.groupEnd()

  return returnValue
}

export default logger
