import React from 'react'
import { useHistory } from 'react-router-dom'
import Joi from 'joi'
import { Auth } from 'service/auth'

import useForm from 'hooks/useForm'

import Header from 'components/Header'
import Button from 'components/Button'
import TextInput from 'components/TextInput'

import ChevronRight from 'images/icons/chevron-right.svg'

import css from './styles.scss'

const schema = Joi.object({
  password: Joi.string().min(8).max(100).required(),
})

export default function PasswordReset() {
  const history = useHistory()
  const [sent, setSent] = React.useState(false)

  const form = useForm({
    initialValues: {
      password: '',
    },
    schema,
  })

  React.useEffect(() => {
    if (!location.search) {
      alert('リンクが無効です')
      window.location.assign('/')
      return
    }
    const query = new URLSearchParams(location.search)
    const code = query.get('code')
    const email = query.get('email')

    if (!code || !email) {
      alert('リンクが無効です')
      window.location.assign('/')
    }
  }, [location.search])

  async function handleSetNewPassword() {
    const { errors, values } = form.validate()

    if (errors) {
      return
    }

    const query = new URLSearchParams(location.search)
    const code = query.get('code')
    const email = query.get('email')

    try {
      await Auth.forgotPasswordSubmit(email, code, values.password)
      setSent(true)
    } catch (error) {
      console.log('error password reset:', error)
      alert('Password reset error')
    }
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
                同サービス（ミラテオ）で使用するパスワードを入力してください。
              </p>
            </div>
            <div className="info-form">
              <div className="form-input">
                <TextInput
                  label="パスワード"
                  required={true}
                  form={form}
                  name="password"
                  type="password"
                  canSee={true}
                  placeholder="8文字以上の半角英数"
                  errorMsg="8文字以上の半角英数を入力してください"
                />
              </div>
            </div>
            <div className="actions">
              <Button varient="default" onClick={handleSetNewPassword}>
                次へ
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="heading reset">
              <h2 className="title">パスワードの再設定が完了しました</h2>
              <p className="message">
                ご登録のメールアドレスに、 パスワード再設定完了のメールを送信しました。
              </p>
            </div>
            <div className="actions">
              <Button varient="link" onClick={() => history.push('/login')}>
                ログイン画面へ
                <ChevronRight />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
