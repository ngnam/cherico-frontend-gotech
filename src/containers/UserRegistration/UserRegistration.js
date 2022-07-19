import React from 'react'
import Joi from 'joi'
import { Auth } from 'service/auth'

import useForm from 'hooks/useForm'

import Header from 'components/Header'
import Button from 'components/Button'
import CheckBox from 'components/CheckBox'
import TextInput from 'components/TextInput'
import RegisterSuccess from './RegisterSuccess'

import css from './styles.scss'

const schema = Joi.object({
  email: Joi.string().email().trim().required(),
  password: Joi.string().min(6).max(100).required(),
})

export default function UserRegistration() {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    schema,
  })

  const [termChecked, setTermChecked] = React.useState(false)
  const [alreadyExists, setAlreadyExists] = React.useState(false)
  const [signUpSuccess, setSignUpSuccess] = React.useState(false)

  async function handleRegistration() {
    const { errors, values } = form.validate()

    if (errors) {
      return
    }

    setAlreadyExists(false)
    try {
      await Auth.signUp({
        username: values.email,
        password: values.password,
        attributes: {
          email: values.email,
        },
        clientMetadata: { env: process.env.DEV_ENV },
      })
      setSignUpSuccess(true)
    } catch (error) {
      if (error && error.code === 'UsernameExistsException') {
        setAlreadyExists(true)
      }
    }
  }

  if (signUpSuccess) {
    return (
      <div className={`password-reset ${css.class}`}>
        <Header />
        <RegisterSuccess />
      </div>
    )
  }

  return (
    <div className={`password-reset ${css.class}`}>
      <Header />
      <div className="page-content">
        {alreadyExists && (
          <div className="error">
            <p className="message">こちらのメールアドレスはご登録できません</p>
          </div>
        )}
        <div className="heading">
          <h2 className="title">新規会員登録</h2>
          <p className="message">
            同サービス（ミラテオ）を使用するには、お使いのメールアドレスを入力してください。
          </p>
        </div>
        <div className="info-form">
          <div className="form-input">
            <TextInput
              placeholder="mirateo@co.jp"
              label="メールアドレス"
              required={true}
              form={form}
              name="email"
              errorMsg="メールアドレスを入力してください"
            />
          </div>
          <div className="form-input">
            <TextInput
              placeholder="8文字以上の半角英数"
              label="パスワード"
              required={true}
              form={form}
              type="password"
              canSee={true}
              name="password"
              errorMsg="8文字以上の半角英数を入力してください"
            />
          </div>
        </div>
        <div className="terms">
          <div className="term-container d-flex justify-center align-center">
            <CheckBox
              checked={termChecked}
              onChange={(event) => setTermChecked(event.target.checked)}
            />
            <a className="term-link" href="/policy" target="_blank">
              利用規約
            </a>
            に同意します
          </div>
        </div>
        <div className="actions">
          <Button varient="default" onClick={handleRegistration} disabled={!termChecked}>
            次へ
          </Button>
        </div>
      </div>
    </div>
  )
}
