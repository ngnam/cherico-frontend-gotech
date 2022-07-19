import React from 'react'
import { useHistory } from 'react-router-dom'
import Joi from 'joi'

import useForm from 'hooks/useForm'
import useAuth from 'hooks/useAuth'
import useRequest from 'hooks/useRequest'

import Header from 'components/Header'
import Button from 'components/Button'
import TextInput from 'components/TextInput'

import css from './styles.scss'

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

export default function Login(data) {
  const { request } = useRequest()
  const history = useHistory()
  const { login, logout, state: authState } = useAuth();
  const oldUrl = data.location.state?.oldUrl;

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    schema,
  })

  async function handleLogin() {
    const { errors, values } = form.validate()

    if (errors) {
      return
    }

    await login(values.email, values.password)

    if(oldUrl != undefined) {
      window.location = oldUrl;
    }

    const status = await request({ url: '/users/registration/status' })
    if (!status.data.is_registed) {
      history.push('/profile/registration')
    }
  }

  async function handleLogout() {
    await logout()
  }

  if (!authState.authChecked) {
    return <div>Loading...</div>
  }

  return (
    <div className={`login ${css.class}`}>
      <Header isHiddenActions={['person', 'notification']} />
      <div className="page-content">
        <h2 className="title">ログイン</h2>
        <p className="message">{`レシピの投稿やコメントはログイン後ご利用いただけます`}</p>
        {!authState.user && (
          <section className="input-section">
            <div className="form-title">アカウントをお持ちのお客様</div>
            <div className="form-input">
              <TextInput
                label="メールアドレス"
                required={true}
                form={form}
                name="email"
                errorMsg="メールアドレスを入力してください"
              />
            </div>
            <div className="form-input">
              <TextInput
                label="パスワード"
                required={true}
                form={form}
                name="password"
                type="password"
                errorMsg="パスワードを入力してください"
              />
            </div>
          </section>
        )}
        <section className="actions-section">
          <div className="login-action">
            {authState.user ? (
              <Button varient="default" onClick={handleLogout}>
                ログアウト
              </Button>
            ) : (
              <Button varient="default" onClick={handleLogin}>
                ログイン
              </Button>
            )}
          </div>
          {!authState.user && (
            <>
              <div className="password-reset-action">
                <Button varient="link" onClick={() => history.push('/password-reset-request')}>
                  パスワードをお忘れの方
                </Button>
              </div>
              <p className="new-user-message">アカウントお持ちでないお客様</p>
              <div className="register-action">
                <Button varient="primary" onClick={() => history.push('/user-registration')}>
                  新規会員登録する
                </Button>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  )
}
