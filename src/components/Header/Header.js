import React from 'react'
import { useHistory, Link } from 'react-router-dom'

import useAuth from 'hooks/useAuth'
import useRequest from 'hooks/useRequest'
import useHeader from 'hooks/useHeader'

import Button from 'components/Button'
import PostConfirmModal from 'components/PostConfirmModal'
import Logo from 'images/logo.svg'
import Search from 'images/icons/search.svg'
import Person from 'images/icons/person.svg'
import Bell from 'images/icons/bell.svg'

import css from './styles.scss'

function Header({ className, isHiddenActions }) {
  const { request } = useRequest()
  const { state: authState } = useAuth()
  const header = useHeader()
  const history = useHistory()
  const [notification, setNotification] = React.useState(0)

  const handleIconClick = (icon) => (event) => {
    event.preventDefault()

    // TODO: Redirect to perfer link
    if (icon === 'search') {
      history.push('/search')
      return
    }

    if (icon === 'person') {
      if (!authState.user) {
        history.push('/login')
        return
      }

      history.push(`/profile/${authState.user.username}`)
    }

    if (icon === 'notification') {
      if (!authState.user) {
        history.push('/login')
        return
      }
      history.push('/notification')
    }
  }

  const handlePost = (event) => {
    if (!authState.user) {
      history.push('/login')
      return
    }

    header.openPostModal()
  }

  async function fetchNotification() {
    const result = await request({ url: '/users/notification/unread' })
    setNotification(result.data.unread_count)
  }

  React.useEffect(() => {
    if (!authState.user) {
      return
    }

    fetchNotification()
  }, [authState])

  return (
    <header className={`header ${css.class} ${className || ''}`}>
      <div className="logo">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className="actions">
        {(!isHiddenActions || isHiddenActions.indexOf('search') < 0) && (
          <a className="icon-box" onClick={handleIconClick('search')}>
            <Search />
          </a>
        )}
        {(!isHiddenActions || isHiddenActions.indexOf('notification') < 0) && (
          <a
            className={'icon-box' + (notification ? ' badge' : '')}
            onClick={handleIconClick('notification')}
          >
            <Bell />
          </a>
        )}
        {(!isHiddenActions || isHiddenActions.indexOf('person') < 0) && (
          <a className="icon-box" onClick={handleIconClick('person')}>
            <Person />
          </a>
        )}
        {(!isHiddenActions || isHiddenActions.indexOf('post') < 0) && (
          <Button onClick={handlePost}>投稿</Button>
        )}
      </div>
      <PostConfirmModal />
    </header>
  )
}

export default Header
