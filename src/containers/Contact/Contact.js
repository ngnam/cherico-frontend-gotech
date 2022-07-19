import React from 'react'
import { useHistory } from 'react-router-dom'
import Joi from 'joi'

import useRequest from 'hooks/useRequest'
import useForm from 'hooks/useForm'

import Header from 'components/Header'
import Footer from 'components/Footer'
import Button from 'components/Button'
import TextInput from 'components/TextInput'

import css from './styles.scss'

const schema = Joi.object({
  email: Joi.string().email().required(),
  inquiry: Joi.string().required(),
})

export default function Contact() {
  const { request } = useRequest()
  const history = useHistory()
  const [sent, setSent] = React.useState(false)
  const [confirm, setConfirm] = React.useState(false)

  const form = useForm({
    initialValues: {
      email: '',
      inquiry: '',
    },
    schema,
  })

  const handleSendMail = async () => {
    console.log(form.values)

    const params = {
      url: '/tickets',
      baseURL: 'https://mirateo.zendesk.com/api/v2',
      method: 'post',
      data: {
        ticket: {
          requester: {
            name: form.values.email,
            email: form.values.email,
          },
          subject: 'お問い合わせ',
          comment: {
            body: form.values.inquiry,
          },
        },
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer 0e9294a2f15b5e57ab1be753dc1bcb5164f3b6db008a1b7e441e9e401fc9832a',
      },
    }
    await request(params)
    setSent(true)
  }

  function handleConfirm(confirm) {
    const { errors, values } = form.validate()

    if (errors || !values) {
      return
    }
    setConfirm(confirm)
  }

  return (
    <div className={`contact ${css.class}`}>
      <Header />
      <div className="page-content">
        {!confirm && !sent ? (
          <>
            <div className="heading">
              <h2 className="title">お問い合わせ</h2>
              <div className="info-form">
                <div className="form-input">
                  <TextInput
                    required={true}
                    form={form}
                    name="inquiry"
                    className="textarea"
                    errorMsg="お問い合わせ内容を入力してください"
                    placeholder="（1,000文字以内）"
                    multiline={true}
                  />
                </div>
              </div>
              <h2 className="title">メールアドレス</h2>
              <div className="info-form">
                <div className="form-input">
                  <TextInput
                    required={true}
                    form={form}
                    name="email"
                    errorMsg="メールアドレスを入力してください"
                    placeholder="例）〇〇〇〇@〇〇.jp"
                  />
                </div>
              </div>
            </div>
            <div className="actions">
              <Button varient="primary" onClick={() => handleConfirm(true)}>
                入力内容を確認
              </Button>
            </div>
          </>
        ) : !sent ? (
          <>
            <div className="heading">
              <div>
                <h2 className="title">お問い合わせ内容の確認</h2>
                <p className="message-confirm">{form.values.inquiry}</p>
              </div>
              <div>
                <h2 className="title">メールアドレス</h2>
                <p className="mail-confirm">{form.values.email}</p>
              </div>
            </div>
            <div className="actions">
              <p>この内容でお問い合わせをしますか？</p>
              <Button varient="primary" onClick={handleSendMail}>
                この内容で問い合わせる
              </Button>
              <p className="text" onClick={() => handleConfirm(false)}>
                問合せ内容を修正する
              </p>
            </div>
          </>
        ) : (
          <div className="area-sent">
            <div>
              <div className="heading">
                <h2 className="title-sent">お問い合わせを受け付けました</h2>
                <p className="message-sent">
                  お問い合わせ内容についての返信は入力いただいたメールアドレス宛にお送りさせていただきます。ドメイン指定をしていると返信メールが届かない場合があります。
                </p>
              </div>
              <div className="actions">
                <Button varient="primary" onClick={() => history.push('/')}>
                  ホームへ戻る
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
