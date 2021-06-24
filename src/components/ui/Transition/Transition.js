import React from 'react'
import { Animation } from './index'
import PropTypes from 'prop-types'

const checkKeys = callback => item => {
  const data = item && item.data ? item.data : item
  return callback ? callback(data) : data
}

class Transition extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      items: [], // текушие данные, которые передаем в компонент для визуализации (включают все данные с учетом переходов, т.е. удаляемые данные в том числе)
      prevItems: [] // последние актуальные данные после обновления (не включают удаленные данные)
    }
  }

  static getDerivedStateFromProps (nextProps, state) {
    // console.log('%c getDerivedStateFromProps ', 'color:white;background:blue', nextProps, state)
    if (nextProps.items !== undefined && nextProps.items !== state.prevItems) {
      if (nextProps.group) {
        // Задаем функцию для идентификации данных (если не задана, то по умолчанию item => item)
        const getKey = checkKeys(nextProps.keys)

        const newItems = Array.isArray(nextProps.items) ? nextProps.items : [nextProps.items]

        // Определяем данные, которые были добавлены и удалены
        const added = newItems.filter(item => !state.prevItems.find(e => getKey(e) === getKey(item)))
        const deleted = state.prevItems.filter(item => !newItems.find(e => getKey(e) === getKey(item)))

        // Добавляем/обновляем действия для переходов
        const addedItems = added.map(item => ({ data: item, state: 'entering' }))
        const restItems = state.prevItems.map(item => ({ data: item, state: deleted.find(e => getKey(e) === getKey(item)) ? 'exiting' : 'ready' }))

        // console.log('addedItems', addedItems)
        // console.log('restItems', restItems)

        return {
          // Передаем далее в компонент для отображения переходов
          items: [...restItems, ...addedItems],
          // Сохраняем уже реальные данные после переходов
          prevItems: nextProps.items
        }
      } else {
        return {
          items: nextProps.items,
          prevItems: nextProps.items
        }
      }
    }
    return null
  }

  render () {
    const { children, items, ...rest } = this.props
    const getKey = checkKeys(this.props.keys)

    console.log('render', this.state.prevItems, this.state.items)

    // Проверяем, что передана функция в качестве children
    if (typeof children !== 'function') {
      return <h1>Ошибка! Компонент Transition должен принимать функцию в качестве children</h1>
    }

    return (
      <div>
        {!rest.group &&
          <Animation data={this.state.items} action={this.state.items ? 'entering' : 'exiting'} {...rest}>
            {children}
          </Animation>}

        {rest.group && this.state.items.map(item => {
          return (
            <Animation key={getKey(item)} action={item.state} data={item.data} {...rest}>
              {children}
            </Animation>
          )
        })}
      </div>
    )
  }
}

export default Transition

Transition.propTypes = {
  group: PropTypes.bool // определяет работу со списком данных
}

Transition.defaultProps = {
  group: false
}
