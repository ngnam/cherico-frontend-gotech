import React from 'react'
import { useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { format, parseISO } from 'date-fns'
import { setImageHost } from 'service/image'
import useAuth from 'hooks/useAuth'
import useRequest from 'hooks/useRequest'
import Header from 'components/Header'
import css from './styles.scss'

export default function Notification() {
  const { request } = useRequest()
  const history = useHistory()
  const { state: authState } = useAuth()
  const [notifications, setNotifications] = React.useState()

  async function handleNotification(item) {
    await request({ url: `/users/notification/${item.id}/read`, method: 'put' })
    history.push(item.payload)
  }

  async function fetchNotification() {
    const result = await request({ url: '/users/notification' })
    const items = !result.data
      ? []
      : result.data.sort(
          (a, b) =>
            parseISO(b.created_at, 'yyyy-MM-dd HH:mm:ss', new Date()) -
            parseISO(a.created_at, 'yyyy-MM-dd HH:mm:ss', new Date())
        )
    setNotifications(items)
  }

  React.useEffect(() => {
    if (!authState.authChecked) {
      return
    }

    if (!authState.user) {
      history.push('/login')
      return
    }

    fetchNotification()
  }, [authState])

  return (
    <div className={`notification ${css.class}`}>
      <Helmet>
        <title>mirateo [ミラテオ]｜暮らしを豊かにするコミュニティサービス</title>
        <meta
          name="description"
          content="mirateoは、DIYにより日々の暮らしが楽しく快適になる、心が豊かになる、新しい自分のライフスタイルが見つかる。お困り・DIYのアイデアや知恵・学びを詳しく丁寧に紹介し、大きな驚きと感動をみなさまにお届けします。"
        />
        <meta property="og:locale" content="ja_JP" />
        <meta property="og:title" content="mirateo [ミラテオ]｜暮らしを豊かにするコミュニティサービス" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://mirateo.jp/assets/dummy-banner.png" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:site_name" content="mirateo [ミラテオ]" />
        <meta property="og:description" content="mirateo [ミラテオ]は、DIYの、最大級の、サービスです。" />
      </Helmet>
      <Header />
      <div className="container">
        <div className="page-title">お知らせ</div>
        <div className="notification-list">
          {notifications && notifications.length === 0 && (
            <span className="nodata">お知らせはありません</span>
          )}
          {notifications &&
            notifications.map((item, index) => {
              return (
                <div
                  className={'content' + (!item.read_at ? ' new' : '')}
                  key={index}
                  onClick={() => handleNotification(item)}
                >
                  <div className="user">
                    {!item.user.profile.image_file_name ? (
                      <div className="no-image"></div>
                    ) : (
                      <img
                        src={setImageHost(item.user.profile.image_file_name)}
                        alt={item.user.nickname}
                      />
                    )}
                  </div>
                  <div className="row">
                    <div className="title">{item.title}</div>
                    <div className="date">
                      {format(parseISO(item.created_at), 'yyyy年MM月dd日 HH:mm')}
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
