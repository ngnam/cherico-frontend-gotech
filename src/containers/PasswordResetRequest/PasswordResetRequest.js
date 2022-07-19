import React from 'react'
import { useHistory } from 'react-router-dom'
import Joi from 'joi'
import { Auth } from 'service/auth'

import useForm from 'hooks/useForm'

import Header from 'components/Header'
import Button from 'components/Button'
import TextInput from 'components/TextInput'

import css from './styles.scss'

const schema = Joi.object({
  email: Joi.string().email().trim().required(),
})

export default function PasswordResetRequest() {
  const history = useHistory()
  const [sent, setSent] = React.useState(false)

  const form = useForm({
    initialValues: {
      email: '',
    },
    schema,
  })

  async function handleSendMail() {
    const { errors, values } = form.validate()

    if (errors) {
      return
    }

    try {
      await Auth.forgotPassword(values.email, { env: process.env.DEV_ENV })
      setSent(true)
    } catch (error) {
      console.log('error password reset:', error)
      alert('Password reset error')
    }

    console.log('values', values)
  }

  return (
    <div className={`password-reset ${css.class}`}>
      <Header />
      <div className="page-content">
        {!sent ? (
          <>
            <div className="heading">
              <h2 className="title">パスワードの再設定</h2>
              <p className="message">
                パスワード再設定用のURLを送信しますので、ご登録していただいているメールアドレスを入力し、送信ボタンを押してください。
              </p>
            </div>
            <div className="info-form">
              <div className="form-input">
                <TextInput
                  label="メールアドレス"
                  required={true}
                  form={form}
                  name="email"
                  placeholder="例）〇〇〇〇@〇〇.jp"
                  errorMsg="メールアドレスを入力してください"
                />
              </div>
            </div>
            <div className="actions">
              <Button varient="primary" onClick={handleSendMail}>
                メールを送る
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="heading">
              <h2 className="title">パスワードの再設定メールをお送りしました</h2>
              <p className="message">
                新規登録時に設定したメールアドレス宛にパスワードの再設定をするメールをお送りします。
              </p>
            </div>
            <div className="actions">
              <Button varient="primary" onClick={() => history.push('/')}>
                Topへ戻る
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
