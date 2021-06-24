import React from 'react'
import { Grid } from 'semantic-ui-react'
import { Column } from './containers'

// Рвзбить данные на три колонки
const splitData = (data) => {
  const remainder = data.length % 3
  const imagesPerColumn = (data.length - remainder) / 3

  const data1 = data.slice(0, imagesPerColumn)
  const data2 = data.slice(imagesPerColumn, imagesPerColumn * 2)
  const data3 = data.slice(imagesPerColumn * 2, imagesPerColumn * 3)

  if (remainder === 1) {
    data2.push(data[data.length - 1])
  } else if (remainder === 2) {
    data2.push(data[data.length - 2])
    data3.push(data[data.length - 1])
  }

  return [data1, data2, data3]
}

const Images = ({ data }) => {
  const images = splitData(data)

  return (
    <Grid columns={images.length}>
      <Grid.Row>
        {images.map((column, idx) => (
          <Grid.Column key={idx}>
            <Column data={column} />
          </Grid.Column>
        ))}
      </Grid.Row>
    </Grid>
  )
}

export default Images
