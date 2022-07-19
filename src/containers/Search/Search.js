import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import useRequest from 'hooks/useRequest'

import Header from 'components/Header'
import SearchHead from 'images/icons/search-head.svg'
import SearchClear from 'images/icons/search-clear.svg'
import Category from './Category'

import css from './styles.scss'

export default function Search() {
  const { request } = useRequest()
  const history = useHistory()
  const [categories, setCategories] = React.useState()
  const [keywords, setKeywords] = React.useState([])
  const [searchWord, setSearchWord] = React.useState('')

  async function fetchData() {
    let result = await request({ url: '/contents/recipes/keywords' })
    setKeywords(result.data)

    result = await request({ url: '/categories/random' })
    setCategories(result.data)
  }

  function handleSearchWordClear() {
    setSearchWord('')
  }

  function handleSearchWord(event) {
    const word = event.target.value
    setSearchWord(word)
  }

  function handleKeyPress(event) {
    if (event.which === 13) {
      const word = event.target.value
      history.push(`/search-results/0/${word}`)
    }
  }

  function handleKeywordClick(name) {
    setSearchWord(name)
    history.push(`/search-results/0/${name}`)
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className={`search ${css.class}`}>
      <Helmet>
        <title>検索一覧｜mirateo [ミラテオ]</title>
        <meta
          name="description"
          content="mirateoは、DIYにより日々の暮らしが楽しく快適になる、心が豊かになる、新しい自分のライフスタイルが見つかる。お困り・DIYのアイデアや知恵・学びを詳しく丁寧に紹介し、大きな驚きと感動をみなさまにお届けします。"
        />
        <meta property="og:locale" content="ja_JP" />
        <meta property="og:title" content="検索一覧｜mirateo [ミラテオ]" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://mirateo.jp/assets/dummy-banner.png" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:site_name" content="mirateo [ミラテオ]" />
        <meta property="og:description" content="mirateo [ミラテオ]は、DIYの、最大級の、サービスです。" />

      </Helmet>
      <Header />
      <section className="content-box search">
        <div className="search-box">
          <div className="input-container">
            <span className="search-icon">
              <SearchHead />
            </span>
            <form action="#">
              <input
                type="search"
                placeholder="例) 椅子"
                value={searchWord}
                onChange={handleSearchWord}
                onKeyPress={handleKeyPress}
              />
            </form>
            {searchWord && <SearchClear className="delete-icon" onClick={handleSearchWordClear} />}
          </div>
        </div>
      </section>
      <section className="content-box keywords">
        <div className="d-flex align-center space-between title-margin">
          <div className="title">おすすめキーワード</div>
        </div>

        <div className="keyword-list d-flex">
          {keywords &&
            keywords.map((item, index) => {
              return (
                <li className="keyword-item" key={index}>
                  <a href="#" onClick={() => handleKeywordClick(item)}>
                    {item}
                  </a>
                </li>
              )
            })}
        </div>
      </section>

      <section className="content-box category">
        <div className="d-flex align-center space-between title-margin">
          <div className="title">カテゴリー</div>
        </div>
        <Category items={categories} />
      </section>
    </div>
  )
}
