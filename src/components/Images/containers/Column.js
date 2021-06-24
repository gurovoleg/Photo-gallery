import React from 'react'
import { Photo } from './index'

// Колонка
const Column = ({ data }) => {
  return data.map(image => <Photo image={image} key={image.id} />)
}

export default Column
