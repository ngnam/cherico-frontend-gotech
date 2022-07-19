import React from 'react'
import { Link, useParams, useHistory, useRouteMatch } from 'react-router-dom'
import Joi from 'joi'

import useCart from 'hooks/useCart'
import useForm from 'hooks/useForm'

import Button from 'components/Button'
import Input from 'components/Input'

import css from './styles.scss'

const schema = Joi.object({
  userName: Joi.string().max(200).trim().required(),
})

function Sample() {
  const history = useHistory()
  const { articleId } = useParams()
  const { url, path } = useRouteMatch()
  const { state: cartState, addToCart, removeFromCart } = useCart()
  const form = useForm({
    initialValues: {
      userName: '',
    },
    schema,
  })

  const [sampleId, setSampleId] = React.useState()

  React.useEffect(() => {
    setSampleId(Date.now().toString().slice(-3))
  }, [])

  function handleToWelcome() {
    history.push('/welcome')
  }

  function handelAddToCart(item) {
    addToCart({ id: Date.now() })
  }

  function handleDeleteItem(item) {
    removeFromCart(item)
  }

  async function handleSubmit() {
    const { values, errors } = form.validate()

    if (errors) {
      alert('バリデーションエラー')
    }

    console.log('values', values)
  }

  const sampleUrl = `/sample/${sampleId}`

  const Items = cartState.items.map((item) => {
    return (
      <p key={item.id}>
        商品ID: {item.id}{' '}
        <a href="#" onClick={() => handleDeleteItem(item)}>
          削除
        </a>
      </p>
    )
  })

  return (
    <div className={`sample ${css.class}`}>
      <div className="body">
        <h1>Sample</h1>
        <p>url: {url}</p>
        <p>path: {path}</p>
        {articleId ? (
          <>
            <h4>Sample article {articleId}</h4>
            <Link to="/sample">Sample home</Link>
          </>
        ) : (
          <>
            <h4>Sample home</h4>
            <Link to={sampleUrl}>{sampleUrl}</Link>
          </>
        )}
        <p>
          <button onClick={handleToWelcome}>Go to welcome</button>
        </p>

        <h3>Links</h3>
        <p>
          <Link to="/profile/setting">ProfileSetting</Link>
        </p>
        <p>
          <Link to="/profile/1">ProfileDetail(user1)</Link>
        </p>
        <p>
          <Link to="/profile/follow">ProfileFollow</Link>
        </p>
        <p>
          <Link to="/login">Login</Link>
        </p>
        <p>
          <Link to="/password-reset">PasswordReset</Link>
        </p>
        <p>
          <Link to="/notification">Notification</Link>
        </p>

        <h3>Cart</h3>
        <p>
          <button onClick={handelAddToCart}>カートに商品を追加</button>
        </p>
        <p>カート内の商品数：{cartState.items.length}</p>
        {Items}

        <h2>Form</h2>
        <p>
          <Input
            type="tel"
            className="form-control"
            name="userName"
            form={form}
            errorMsg="ユーザー名を入力してください"
          />
        </p>
        <button onClick={handleSubmit}>Submit form</button>

        <h2>UI parts</h2>
        <p>
          <Button>投稿する</Button>
        </p>
      </div>
    </div>
  )
}

export default Sample
