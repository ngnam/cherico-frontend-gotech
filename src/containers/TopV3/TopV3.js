import React from 'react'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import Header from 'components/Header'
import PageTopLink from 'components/PageTopLink'

import useAuth from 'hooks/useAuth'
import useRequest from 'hooks/useRequest'

import Diys from './Diys'
import News from './News'
import Dictionaries from './Dictionaries'
import Problems from './Problems'
import Main from './Main'

import css from './styles.scss'

const scrollTop = () => {
  return Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)
}

function TopV3() {
  const { state: authState } = useAuth()
  const { request, state: requestState } = useRequest()
  const [tabIndex, setTabIndex] = React.useState(-1)
  const history = useHistory()

  const fetchContents = (limit, offset, type, is_admin = 0) => {
    const reauestUrl = '/contents/recipes/search' + (authState.user ? '/logined' : '')
    const params = {
      limit: limit || 30,
      offset: offset,
      sort_by: 1,
      filter_by_contents_type: type || 0,
      word: '',
      category: 0,
      use_es: true,
      is_normal: is_admin,
    }

    return request({
      url: reauestUrl,
      method: 'post',
      data: params,
    })
  }

  const onSelectTabIndex = (index) => {
    setTabIndex(index)
    history.replace({
      pathname: '/',
      state: { tabIndex: index },
    })
  }

  const service = { fetchContents: fetchContents, requestState: requestState, scrollTop: scrollTop }

  React.useEffect(() => {
    if (history.action === 'POP') {
      const index =
        history.location.state && history.location.state.tabIndex > -1
          ? history.location.state.tabIndex
          : 2
      setTabIndex(index)
    } else if (tabIndex === -1) {
      setTabIndex(2)
    }
  }, [])

  return (
    <div className={`top ${css.class}`}>
      <Helmet>
        <title>mirateo [ミラテオ]｜暮らしを豊かにするコミュニティサービス</title>
        <meta
          name="description"
          content="mirateoは、DIYにより日々の暮らしが楽しく快適になる、心が豊かになる、新しい自分のライフスタイルが見つかる。お困り・DIYのアイデアや知恵・学びを詳しく丁寧に紹介し、大きな驚きと感動をみなさまにお届けします。"
        />
        <meta name="twitter:card" content="" />
        <meta name="twitter:site" content="@mirateo_news" />
        <meta property="og:locale" content="ja_JP" />
        <meta
          property="og:title"
          content="mirateo [ミラテオ]｜暮らしを豊かにするコミュニティサービス"
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://mirateo.jp/assets/dummy-banner.png" />
        <meta property="og:url" content="https://mirateo.jp/" />
        <meta property="og:site_name" content="mirateo [ミラテオ]" />
        <meta
          property="og:description"
          content="mirateo [ミラテオ]は、DIYの、最大級の、サービスです。"
        />
      </Helmet>
      <Header id="top" />
      <Tabs selectedIndex={tabIndex} onSelect={onSelectTabIndex}>
        <TabList>
          <Tab>辞書</Tab>
          <Tab>ニュース</Tab>
          <Tab>トップ</Tab>
          <Tab>お困り</Tab>
          <Tab>DIYレシピ</Tab>
        </TabList>
        <TabPanel>
          <Dictionaries service={service} />
        </TabPanel>
        <TabPanel>
          <News service={service} />
        </TabPanel>
        <TabPanel>
          <Main service={service} />
        </TabPanel>
        <TabPanel>
          <Problems service={service} />
        </TabPanel>
        <TabPanel>
          <Diys service={service} />
        </TabPanel>
      </Tabs>
      <PageTopLink />
    </div>
  )
}

export default TopV3
