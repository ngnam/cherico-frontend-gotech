import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from 'hooks/useAuth'
import Label from 'components/Label'
import FollowButton from 'components/FollowButton'

import css from './styles.scss'

function Welcome() {
  const { state: authState, login, logout } = useAuth()
  return (
    <div className={`welcome ${css.class}`}>
      <h1>Welcome</h1>

      <FollowButton>フォロー</FollowButton>
      <FollowButton className={'on'}>フォロー中</FollowButton>

      {authState.user && (
        <>
          <div>
            <h4>Hello {authState.user.name}</h4>
          </div>
          <div>
            <button onClick={() => logout()}>Logout</button>
          </div>
        </>
      )}
      {!authState.user && (
        <div>
          <button onClick={() => login()}>Login</button>
        </div>
      )}
      <Link to="/sample">Sample</Link>
      <Label className="official">公式</Label>
      <Label className="certify">認定</Label>
      <Label className="ad">広告</Label>
    </div>
  )
}

export default Welcome
