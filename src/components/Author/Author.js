import React from 'react'
import { Link } from 'react-router-dom'
import { setImageHost } from 'service/image'

import Label from 'components/Label'

import { getAccountType } from 'service/profile'

import css from './styles.scss'

function Author({ className, onClick, user }) {
  if (!user) {
    return null
  }

  const accountType = getAccountType(user.account_type)
  return (
    <section className={`author ${css.class} ${className || ''} d-flex space-between`}>
      <div className="user-info d-flex align-center">
        <Link to={`/profile/${user?.id}`} className="link">
          <div className="photo">
            {/* eslint-disable-next-line camelcase */}
            {user?.profile?.image_file_name ? (
              <img src={setImageHost(user.profile.image_file_name)} />
            ) : (
              <div className="dummy-avatar">
                <img src="/assets/user-avatar.png" />
              </div>
            )}
          </div>
        </Link>
        <Link to={`/profile/${user?.id}`} className="link">
          <div className="name">{user.nickname}</div>
        </Link>
        <div className="account-type">
          <Label className={accountType.id}>{accountType.text}</Label>
        </div>
      </div>

      {/*
      <div className="actions d-flex align-center">
        <FollowButton>フォロー</FollowButton>
      </div>
    */}
    </section>
  )
}

export default Author
