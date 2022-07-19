import React from 'react'
import { Auth } from 'service/auth'

import Header from 'components/Header'

import css from './styles.scss'

export default function ConfirmEmail() {
  React.useEffect(() => {
    if (!location.search) {
      window.location.assign('/')
      return
    }
    const query = new URLSearchParams(location.search)
    const code = query.get('code')
    const email = query.get('email')

    if (!code || !email) {
      window.location.assign('/')
      return
    }
    confirmEmail(code)
  }, [location.search])

  async function confirmEmail(code) {
    try {
      await Auth.verifyCurrentUserAttributeSubmit('email', code)
      alert('Email確認完了しました')
      window.location.assign('/profile/registration')
    } catch (error) {
      alert('リンクが無効です。')
      window.location.assign('/')
      console.log('error confirming sign up', error)
    }
  }

  return (
    <div className={`confirm-signup ${css.class}`}>
      <Header />
      <div className="page-content">Emailを確認しています。。。</div>
    </div>
  )
}
