import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import useAuth from 'hooks/useAuth'
import useRequest from 'hooks/useRequest'

import Header from 'components/Header'
import RecipeList from 'components/RecipeList'
import Select from 'components/Select'

import SearchHead from 'images/icons/search-head.svg'
import SearchClear from 'images/icons/search-clear.svg'
import Filter from 'images/icons/filter.svg'

import css from './styles.scss'

export default function SearchResults() {
  const { request } = useRequest()
  const history = useHistory()
  const { state: authState } = useAuth()
  const [searchResult, setSearchResult] = React.useState()
  const [notFound, setNotFound] = React.useState(false)
  const { categoryId, keyword } = useParams()
  const [searchWord, setSearchWord] = React.useState('')
  const [contentsType, setContentsType] = React.useState(0)
  const [categories, setCategories] = React.useState([])
  const [recommendKeywords, setRecommendKeywords] = React.useState([])

  async function fetchSearchData(word, categoryId, contentsType) {
    if (!keyword && Number(categoryId) === 0) {
      return
    }

    const reauestUrl = '/contents/recipes/search' + (authState.user ? '/logined' : '')

    const params = {
      limit: 300,
      offset: 0,
      sort_by: 1,
      filter_by_contents_type: contentsType || 0,
      word: word || '',
      category: Number(categoryId),
    }

    const result = await request({
      url: reauestUrl,
      method: 'post',
      data: params,
    })

    setSearchResult(result.data)
    if (result.data) {
      setNotFound(false)
    } else {
      setNotFound(true)
    }
  }

  async function fetchCategoryRandom(categoryId) {
    const keywordsResult = await request({ url: '/contents/recipes/keywords' })
    setRecommendKeywords(keywordsResult.data)

    const result = await request({ url: `/categories/${categoryId}/random` })
    setCategories(result.data.categories)
  }

  function handleSearchWordClear() {
    setSearchWord('')
  }

  function handleKeyPress(event) {
    if (event.which === 13) {
      const word = event.target.value
      fetchSearchData(word, 0)
      history.push(`/search-results/${categoryId}/${word}`)
    }
  }

  function handleSearchWord(event) {
    setSearchWord(event.target.value)
  }

  function handleContentsType(event) {
    const contentsType = Number(event.target.value)
    setContentsType(contentsType)

    if (!searchWord) {
      return
    }
    fetchSearchData(searchWord, categoryId, contentsType)
  }

  function handleKeywordClick(name) {
    let word = searchWord

    if (searchWord.indexOf(name) === -1) {
      word = searchWord + ' ' + name
      setSearchWord(word)
      const category = categories.filter((item) => item.name !== name)
      setCategories(category)
    }

    history.push(`/search-results/${categoryId}/${word}`)
    fetchSearchData(word, categoryId, '')
  }

  React.useEffect(() => {
    if (!authState.authChecked) {
      return
    }

    setSearchWord(keyword || '')

    if (!keyword && Number(categoryId) === 0) {
      return
    }

    if (Number(categoryId) > 0) {
      fetchCategoryRandom(categoryId)
    }
    fetchSearchData(keyword, categoryId)
  }, [authState.authChecked])

  const keywords = [...(categories.map((item) => item.name) || []), ...(recommendKeywords || [])]

  return (
    <div className={`search-results ${css.class}`}>
      <Helmet>
        <title>検索結果一覧｜mirateo [ミラテオ]</title>
        <meta
          name="description"
          content="mirateoは、DIYにより日々の暮らしが楽しく快適になる、心が豊かになる、新しい自分のライフスタイルが見つかる。お困り・DIYのアイデアや知恵・学びを詳しく丁寧に紹介し、大きな驚きと感動をみなさまにお届けします。"
        />
        <meta property="og:locale" content="ja_JP" />
        <meta property="og:title" content="検索結果一覧｜mirateo [ミラテオ]" />
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
      {keywords.length > 0 && (
        <section className="content-box keyword-list d-flex">
          {keywords.map((item, index) => {
            return (
              <li className="keyword-item" key={index}>
                <a href="#" onClick={() => handleKeywordClick(item)}>
                  {item}
                </a>
              </li>
            )
          })}
        </section>
      )}
      <section className="content-box contents-type">
        <div className="contents-type-select">
          <Filter className="select-icon" />
          <Select value={contentsType} onChange={handleContentsType}>
            <option value="0">すべて</option>
            <option value="1">お困り</option>
            <option value="2">DIY</option>
            <option value="3">辞書</option>
            <option value="4">NEWS</option>
          </Select>
        </div>
      </section>
      <div className="container">
        <RecipeList list={searchResult}></RecipeList>
        {notFound && (
          <div className="wrap-notfound">
            <p>条件を変更して再度お探しください</p>
            <span>条件に該当するものが見つかりませんでした。</span>
            <img className="thumb-notfound" src="/assets/notfound.png" />
          </div>
        )}
      </div>
    </div>
  )
}
