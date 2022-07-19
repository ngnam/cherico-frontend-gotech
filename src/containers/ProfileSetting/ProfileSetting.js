import React from 'react'
import { useHistory } from 'react-router-dom'
import Joi from 'joi'
import { setImageHost } from 'service/image'
import useAuth from 'hooks/useAuth'
import useForm from 'hooks/useForm'
import useRequest from 'hooks/useRequest'
import Header from 'components/Header'
import Footer from 'components/Footer'
import Button from 'components/Button'
import CheckBox from 'components/CheckBox'
import TextInput from 'components/TextInput'
import Camera from 'images/icons/camera.svg'
import css from './styles.scss'

const schema = Joi.object({
  nickname: Joi.string().required(),
  email: Joi.string().email(),
  oldPassword: Joi.string().allow('').optional().alphanum().min(8),
  newPassword: Joi.string().allow('').optional().alphanum().min(8),
})

export default function ProfileSetting() {
  const { request } = useRequest()
  const history = useHistory()
  const [complete, setComplete] = React.useState(false)
  const { changeEmail, changePassword, state: authState } = useAuth()
  const [profile, setProfile] = React.useState({})
  const [notification, setNotification] = React.useState({
    comment: 'on',
    follow: 'on',
    info: 'on',
    like: 'on',
  })
  const [imageSrc, setImageSrc] = React.useState(null)
  const [imageFile, setImageFile] = React.useState(null)
  const [apiErrors, setApiErrors] = React.useState('')
  const form = useForm({
    initialValues: {
      nickname: '',
      introduction: '',
      oldPassword: '',
      newPassword: '',
      email: '',
    },
    schema,
  })

  React.useEffect(() => {
    if (!authState.authChecked) {
      return
    }

    if (!authState.user) {
      history.push('/login')
    }

    form.values.email = authState.user.attributes.email
    fetchData()
  }, [authState.authChecked])

  async function fetchData() {
    const result = await request({ url: `/users/${authState.user.username}` })
    setProfile(result.data)

    form.values.nickname = result.data.nickname
    form.values.introduction = result.data.profile.introduction

    form.onChange('nickname', result.data.nickname)

    setNotification(result.data.notification)
  }

  async function handleRegister() {
    const { errors, values } = form.validate()

    if (errors) {
      return
    }

    let message = ''
    if (values.oldPassword || values.newPassword) {
      message = '新しいパスワードが未入力です'
      if (values.oldPassword && !values.newPassword) {
        message = '新しいパスワードが未入力です'
        setApiErrors(message)
        return
      }

      if (!values.oldPassword && values.newPassword) {
        message = '現在のパスワードが未入力です'
        setApiErrors(message)
        return
      }
    }

    if (
      values.email !== authState.user.attributes.email &&
      (values.oldPassword || values.newPassword)
    ) {
      message = 'メールアドレス変更とパスワード変更は同時に実施出来ません'
      setApiErrors(message)
      return
    }

    let params = {}
    if (
      profile.nickname !== values.nickname ||
      profile.profile.introduction !== values.introduction
    ) {
      params = {
        url: `/users/${authState.user.username}`,
        method: 'put',
        data: {
          nickname: values.nickname,
          introduction: values.introduction,
        },
      }

      try {
        await request(params)
      } catch (e) {
        message = e.response.data.meta.error_message
        setApiErrors(message)
        return
      }
    }

    if (profile.notification !== notification) {
      params = {
        url: `/users/${authState.user.username}/notification`,
        method: 'put',
        data: notification,
      }

      try {
        await request(params)
      } catch (e) {
        message = e.response.data.meta.error_message
        setApiErrors(message)
        return
      }
    }

    if (values.email !== authState.user.attributes.email) {
      try {
        await changeEmail(values.email)
      } catch (e) {
        message = 'メールアドレス変更が失敗しました'
        setApiErrors(message)
        return
      }
    }

    if (values.oldPassword && values.newPassword) {
      try {
        await changePassword(values.oldPassword, values.newPassword)
      } catch (e) {
        message = 'パスワード変更が失敗しました'
        if (e.code === 'LimitExceededException') {
          message = 'パスワード変更試行回数の上限に達しました'
        }
        setApiErrors(message)
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
      setApiErrors(message)
    }
    setComplete(true)
  }

  const handleChangeFile = (event) => {
    const files = event.target.files

    if (files.length === 0) {
      return
    }

    if (apiErrors) {
      setApiErrors('')
    }

    const reader = new FileReader()
    reader.readAsDataURL(files[0])
    reader.onload = () => {
      setImageSrc(reader.result)
    }
    setImageFile(files[0])
  }

  const handleNotificationCheck = (e) => {
    setNotification({ ...notification, [e.target.name]: e.target.checked ? 'on' : 'off' })
  }

  const handleHome = () => {
    history.push('/')
  }

  if (complete) {
    return (
      <div className={`profile-setting  ${css.class}`}>
        <Header />
        <div className="page-content">
          <div className="heading">
            <h2 className="title-complete">
              プロフィール・アカウントを
              <br />
              変更しました
            </h2>
          </div>
          <section className="content-box text-break main-action d-flex justify-center">
            <Button onClick={handleHome}>ホームページへ戻る</Button>
          </section>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className={`profile-setting ${css.class}`}>
      <Header />
      {apiErrors && <div className="error">{apiErrors}</div>}
      <p className="heading">プロフィールの設定</p>

      <section className="user-photo">
        <div className="photo-container">
          <label htmlFor="file-input">
            <div className="photo">
              {imageSrc ? (
                <img className="user-photo" src={imageSrc} />
              ) : profile?.profile?.image_file_name ? (
                <img
                  className="user-photo"
                  src={`${setImageHost(profile.profile.image_file_name)}`}
                />
              ) : (
                <div className="dummy-avatar">
                  <img src="/assets/user-avatar.png" />
                </div>
              )}
              <div className="camera">
                <Camera />
              </div>
            </div>
          </label>
          <input
            type="file"
            name="image"
            onChange={handleChangeFile}
            accept="image/jpeg, image/png"
            id="file-input"
          />
        </div>
      </section>
      <section className="user-info">
        <div className="info-row">
          <div className="value">
            <TextInput
              label="ユーザーネーム"
              required={true}
              form={form}
              name="nickname"
              errorMsg="入力に不備があります"
              maxlength="20"
              placeholder="最大入力文字数は20文字です"
            />
          </div>
        </div>
        <div className="info-row">
          <div className="value right-align">
            <TextInput
              label="自己紹介"
              required={false}
              form={form}
              name="introduction"
              className="textarea"
              errorMsg="自己紹介を入力してください"
              placeholder="例）DIYは初心者ですが趣味で作ったレシピを投稿しています。"
              multiline={true}
              helperText={`${form?.values?.introduction?.length}/1000`}
            />
          </div>
        </div>
      </section>
      <section className="account-setting">
        <div className="section-heading">
          <p className="heading">アカウントの設定</p>
        </div>
        <div className="info-row">
          <div className="value">
            <TextInput
              label="メールアドレス"
              form={form}
              name="email"
              placeholder="例）〇〇〇〇@〇〇.jp"
              errorMsg="メールアドレスを入力してください"
            />
          </div>
        </div>
        <div className="info-row">
          <div className="value">
            <TextInput
              label="現在のパスワード"
              form={form}
              name="oldPassword"
              type="password"
              canSee={true}
              placeholder="8文字以上の半角英数"
              errorMsg="8文字以上の半角英数を入力してください"
            />
          </div>
        </div>
        <div className="info-row">
          <div className="value">
            <TextInput
              label="新しいパスワード"
              form={form}
              name="newPassword"
              type="password"
              canSee={true}
              placeholder="8文字以上の半角英数"
              errorMsg="8文字以上の半角英数を入力してください"
            />
          </div>
        </div>
      </section>
      <section className="notification-setting">
        <div className="info-row">
          <label>通知設定</label>
          <div className="value">
            <div>
              <CheckBox
                name="like"
                checked={notification.like === 'on'}
                onChange={handleNotificationCheck}
              >
                投稿したレシピへのいいね
              </CheckBox>
            </div>
            <div>
              <CheckBox
                name="comment"
                checked={notification.comment === 'on'}
                onChange={handleNotificationCheck}
              >
                投稿したレシピへのコメント
              </CheckBox>
            </div>

            <div>
              <CheckBox
                name="follow"
                checked={notification.follow === 'on'}
                onChange={handleNotificationCheck}
              >
                別のユーザーからのフォロー
              </CheckBox>
            </div>

            <div>
              <CheckBox
                name="info"
                checked={notification.info === 'on'}
                onChange={handleNotificationCheck}
              >
                事務局からのお知らせ
              </CheckBox>
            </div>
          </div>
        </div>
      </section>
      <section className="content-box text-break main-action d-flex justify-center">
        <Button onClick={handleRegister}>変更を保存する</Button>
      </section>
      <Footer />
    </div>
  )
}
