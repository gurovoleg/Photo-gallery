import React from 'react'
import { Image } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'

const UserAvatar = ({ user, className = '' }) => {
  return (
    <Link to={`/user/${user.username}`} className="user-avatar">
      <div style={{ marginRight: '10px' }}>
        <Image src={user.profile_image.medium} circular />
      </div>
      <div>
        <div className={className}>{user.name}</div>
        <div className={`user-avatar__username ${className}`}>@{user.username}</div>
      </div>
    </Link>
  )
}

export default withRouter(UserAvatar)
