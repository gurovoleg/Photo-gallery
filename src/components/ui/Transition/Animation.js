import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss'

class Animation extends React.Component {
  constructor (props) {
    super(props)
    const { duration } = this.props
    this.state = {
      status: 'ready', // локальный статус; используется для обновления внутри компонента (ready, entering, exiting)
      data: false, // для монтирования, т.е. компонент добавлен на страницу;
      visible: false, // для визуального отображения после того как компонент был смонтирован
      duration: {
        enter: (duration && duration.enter && duration.enter) || duration, // время перехода для отображения
        exit: (duration && duration.exit && duration.exit) || duration // время перехода для скрытия
      },
      prevData: this.props.data, // передаем в функцию для children, чтобы при переходе скрытия использовать именно старые данные, а не новые, которые уже переданы компоненту
      prevAction: '' // действие из предыдущих props; используем для сравнения с новыми props, чтобы задавать или не задавать переход
    }
  }

  // Отслеживаем изменения props и возвращаем данные для state
  static getDerivedStateFromProps (nextProps, state) {
    // console.log('%c getDerivedStateFromProps ', 'color:white;background:blue', state, nextProps)
    // Проверка для группы данных: пропускаем только действия перехода entering и exiting, а так же сравниваем с предыдущим действием, чтобы не повторять переход
    // значение предыдущего действием обновлем здесь же ниже
    if ((nextProps.group && nextProps.action !== state.prevAction && nextProps.action !== 'ready') ||
      // Проверка для одиночных данных: проверяем, что обновились входные данные (может бы все что угодно - true/false или набор данных для страницы)
      // а так же исключаем локальный статус entering и exiting, чтобы не повторять переход
      (!nextProps.group && nextProps.data !== state.data && state.status === 'ready')) {
      // console.log('%c getDerivedStateFromProps ', 'color:white;background:red')
      return {
        // Задаем статус для перехода
        status: nextProps.group ? nextProps.action : nextProps.data && !state.visible ? 'entering' : 'exiting',
        data: nextProps.data || true,
        visible: false,
        // Обновляем prevAction, чтобы исключить повтор
        prevAction: nextProps.action
      }
    }
    return null
  }

  componentDidMount () {
    if (this.state.status === 'entering') {
      this.enter()
    }
  }

  // показываем компонент
  enter () {
    // если есть параметр enter или используются классы, то добавляем задержку
    if (this.props.enter) {
      setTimeout(() => {
        this.setState({ visible: true, status: 'ready' })
      }, 50)
    } else {
      this.setState({ visible: true, status: 'ready' }) // без задержки
    }
  }

  // убираем компонент
  exit () {
    const updateState = () => this.setState({ data: false, status: 'ready', prevData: this.props.data })
    // если есть параметр exit, то добавляем задержку
    if (this.props.exit) {
      setTimeout(updateState, this.state.duration.exit)
    } else {
      updateState() // без задержки
    }
  }

  componentDidUpdate (prevProps, prevState) {
    // console.log('%c Animation componentDidUpdate ', 'color:white;background:green', prevState.status, this.state.status, this.state)
    // отслеживаем только состояния перехода - либо показываем, либо убираем
    if (prevState.status !== this.state.status) {
      switch (this.state.status) {
        case 'entering':
          this.enter()
          break
        case 'exiting':
          this.exit()
      }
    }
  }

  // создаем обертку для отображения/скрытия контента, стилизуем (добавляем эффект перехода/анимации) в зависимости от входных параметров
  createContent () {
    const { visible, status, prevData } = this.state
    const { children, enter, exit, from, style } = this.props

    // Задаем переход инлайн стилями (this.props.enter, this.props.exit, this.props.from)
    const props = visible
      ? enter // отображаем после монтирования, показываем
      : status === 'exiting'
        ? exit // демонтируем
        : from // начальное состояние - монтирован на страницу, но скрыт
    const transition = this.setTransitionStyle()
    const styled = { transition, ...props, ...style }

    return children(prevData, styled)
  }

  // Задаем значения transition для instyle
  setTransitionStyle () {
    const { duration, visible } = this.state
    const createStyle = name => this.props[name] && duration[name] ? `all ${duration[name] / 1000}s` : 'none'

    return visible ? createStyle('enter') : createStyle('exit')
  }

  render () {
    // const content = this.state.data ? this.createContent() : null
    // console.log('%c render ', 'color:white;background:orange', this.state.data, this.state)

    return this.state.data ? this.createContent() : null
  }
}

export default Animation

Animation.propTypes = {
  action: PropTypes.string, // ready, entering, exiting
  from: PropTypes.object, // стили для начального состояния - компонент добавлен на страницу, но скрыт (state.visible = false)
  enter: PropTypes.object, // стили для перехода при отображении
  exit: PropTypes.object, // стили для перехода при скрытии,
  duration: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.objectOf(PropTypes.number)
  ]) // время перехода/анимации/задержки в мс (добавляется в transition и функцию setTimeout)
}

Animation.defaultProps = {
  action: 'ready',
  duration: 0
}
