import React from 'react'
import { Button, Dropdown, Statistic } from 'semantic-ui-react'
import { UserAvatar } from 'Components'

const Info = ({ image, download, size = 'mini' }) => {
  return (
    <div className="d-flex justify-content-space-between align-items-center">
      <UserAvatar user={image.user} />

      <Statistic color='red' size={size}>
        <Statistic.Value>{image.likes}</Statistic.Value>
        <Statistic.Label>Likes</Statistic.Label>
      </Statistic>

      <Statistic color='blue' size={size}>
        <Statistic.Value>{image.views}</Statistic.Value>
        <Statistic.Label>Views</Statistic.Label>
      </Statistic>

      <Statistic color='blue' size={size}>
        <Statistic.Value>{image.downloads}</Statistic.Value>
        <Statistic.Label>Downloads</Statistic.Label>
      </Statistic>

      <Button.Group color='teal'>
        <Button onClick={() => download(image.urls.regular, `image-${image.id}`)}>Загрузить</Button>
        <Dropdown style={{ zIndex: 1002 }} className='button icon' floating>
          <Dropdown.Menu>
            <Item title="Маленький" image={image} download={download} width={400} />
            <Item title="Средний" image={image} download={download} width={1080} />
            <Item title="Большой" image={image} download={download} width={1920} />
            <Dropdown.Divider />
            <Item title="Оригинальный" image={image} download={download} />
          </Dropdown.Menu>
        </Dropdown>
      </Button.Group>

    </div>
  )
}

// Элемент выпадающего меню с размерами изображения
const Item = ({ image, title, download, width = image.width }) => {
  return (
    // задаем размер скачиваемого изображения (для этого указываем RAW + значение ширины)
    <Dropdown.Item onClick={() => download(image.urls.raw + `&w=${width}&dpi=2`, `img-${image.id}`)}>
      <span style={{ fontSize: '14px', fontWeight: 'bold', marginRight: '10px' }}>{title}</span>
      <span> ({createSizeLabel(image, width)})</span>
    </Dropdown.Item>
  )
}

// Получить строку с размерами
const createSizeLabel = (image, widthValue) => {
  const { width, height } = image
  const ratio = width > height ? width / height : height / width // получить соотношение
  const heightValue = Math.floor(width > height ? widthValue / ratio : widthValue * ratio)

  return widthValue + ' x ' + heightValue
}

export default Info
