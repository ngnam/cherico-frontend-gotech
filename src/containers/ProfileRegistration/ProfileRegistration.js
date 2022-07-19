import React from 'react'
import { useHistory } from 'react-router-dom'
import Joi from 'joi'

import useAuth from 'hooks/useAuth'
import useForm from 'hooks/useForm'
import useRequest from 'hooks/useRequest'

import Header from 'components/Header'
import Button from 'components/Button'
import TextInput from 'components/TextInput'

import Camera from 'images/icons/gray-camera.svg'

import css from './styles.scss'

const schema = Joi.object({
  nickname: Joi.string().required(),
})

export default function ProfileRegistration() {
  const { request } = useRequest()
  const history = useHistory()
  const { state: authState } = useAuth()
  const [imageSrc, setImageSrc] = React.useState(null)
  const [imageFile, setImageFile] = React.useState(null)
  const [complete, setComplete] = React.useState(false)
  const [apiErrors, setApiErrors] = React.useState({ nickname: '', image: '' })

  const form = useForm({
    initialValues: {
      nickname: '',
    },
    schema,
  })

  React.useEffect(() => {
    if (authState.authChecked) {
      if (!authState.user) {
        history.push('/login')
      }

      checkRegistedStatus()
    }
  }, [authState])

  async function checkRegistedStatus() {
    const status = await request({ url: '/users/registration/status' })
    if (status.data.is_registed) {
      history.push('/login')
    }
  }

  async function handleRegister() {
    const { errors, values } = form.validate()

    if (errors) {
      return
    }

    const status = await request({ url: '/users/registration/status' })
    if (!status.data.is_registed) {
      const params = {
        url: '/users',
        method: 'post',
        data: {
          nickname: values.nickname,
          introduction: '',
        },
      }

      try {
        await request(params)
      } catch (e) {
        const message = e.response.data.meta.error_message
        setApiErrors({ ...apiErrors, nickname: message })
        return
      }
    }

    if (!imageFile) {
      setComplete(true)
      return
    }

    const formData = new FormData()
    formData.append('image', imageFile)
    const imageParams = {
      url: `/users/${authState.user.username}/image`,
      method: 'put',
      data: formData,
      headers: {
        'content-type': 'multipart/form-data',
      },
    }

    try {
      await request(imageParams)
    } catch (e) {
      const message = e.response.data.meta.error_message
      setApiErrors({ ...apiErrors, image: message })
      return
    }
    setComplete(true)
  }

  const handleChangeFile = (event) => {
    const files = event.target.files

    if (files.length === 0) {
      return
    }

    setApiErrors({ ...apiErrors, image: '' })
    const reader = new FileReader()
    reader.readAsDataURL(files[0])
    reader.onload = () => {
      setImageSrc(reader.result)
    }
    setImageFile(files[0])
  }

  function handleChangeNickname() {
    if (apiErrors) {
      setApiErrors({ ...apiErrors, nickname: '' })
    }
  }

  if (complete) {
    return (
      <div className={`login ${css.class}`}>
        <Header />
        <div className="page-content">
          <div className="heading">
            <h2 className="title-complete">
              登録完了しました
              <br />
              ご登録ありがとうございました
            </h2>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`login ${css.class}`}>
      <Header isHiddenActions={['search', 'person', 'notification', 'post']} />
      <div className="page-content">
        <div className="heading">
          <h2 className="title">新規会員登録</h2>
          <p className="message">
            最後の登録画面です。あなたの写真やニックネームは、サービス内で記事を投稿・掲載される際に使用されます。
          </p>
        </div>
        <div className="info-form">
          <div className="photo-input">
            <div className="photo">
              <div className="image">
                {!imageSrc ? <Camera /> : <img src={imageSrc} className="profile-image" />}
              </div>
            </div>
            <div className="upload">
              <label className="text">
                あなたの写真を登録
                <input
                  type="file"
                  name="image"
                  onChange={handleChangeFile}
                  accept="image/jpeg, image/png"
                />
              </label>
            </div>
            {apiErrors && apiErrors.image && <span className="error-text">{apiErrors.image}</span>}
          </div>
          <div className="form-input">
            <TextInput
              label="ニックネーム"
              required={true}
              form={form}
              name="nickname"
              errorMsg="入力に不備があります"
              onChange={handleChangeNickname}
              maxlength="20"
              placeholder="最大入力文字数は20文字です"
            />
          </div>
        </div>
        {apiErrors && apiErrors.nickname && (
          <span className="error-text">{apiErrors.nickname}</span>
        )}
        <div className="actions">
          <Button varient="default" onClick={handleRegister}>
            完了
          </Button>
        </div>
      </div>
    </div>
  )
}
