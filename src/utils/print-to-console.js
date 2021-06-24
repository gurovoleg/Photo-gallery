const printToConsole = (message, title = 'title', color = 'blue') => {
  console.log(`%c ${title} `, `color:white;background:${color}`, message)
}

export default printToConsole
