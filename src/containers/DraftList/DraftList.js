import React from 'react'

import useRequest from 'hooks/useRequest'
import { setImageHost } from 'service/image'

import { format, parseISO } from 'date-fns'
import Header from 'components/Header'
import Footer from 'components/Footer'

import { Link } from 'react-router-dom'
import css from './styles.scss'

export default function DraftList() {
  const { request } = useRequest()
  const types = ['diys', 'problems', 'news', 'dictionaries']
  const typeLabels = ['DIYレシピ', 'お困り', 'ニュース', '辞書']
  const typeIcons = [
    '/assets/icons/diy.svg',
    '/assets/icons/problem.svg',
    '/assets/icons/news.svg',
    '/assets/icons/dictionary.svg',
  ]
  const [recipes, setRecipes] = React.useState([])

  async function fetchData() {
    let temp = []
    let result = await request({ url: '/contents/types/problems/draft' })
    if (result.data) {
      temp = [...temp, ...result.data]
    }
    result = await request({ url: '/contents/types/diys/draft' })
    if (result.data) {
      temp = [...temp, ...result.data]
    }
    try {
      result = await request({ url: '/contents/types/news/draft' })
      if (result.data && result.data.length > 0) temp = [...temp, ...result.data]
    } catch {
      console.log('Error')
    }
    try {
      result = await request({ url: '/contents/types/dictionaries/draft' })
      if (result.data && result.data.length > 0) temp = [...temp, ...result.data]
    } catch {
      console.log('Error')
    }

    setRecipes(
      temp.sort((a, b) => {
        if (a.updated_at > b.updated_at) return -1
        if (a.updated_at < b.updated_at) return 1
        return 0
      })
    )
  }

  const List = recipes.map((item, index) => {
    let itemTypeLabel = ''
    let itemTypeIcon = ''
    if (item.type) {
      types.map((type, ind) => {
        if (type === item.type) {
          itemTypeIcon = typeIcons[ind]
          itemTypeLabel = typeLabels[ind]
        }
      })
    }
    return (
      <article key={index}>
        <Link to={`/trouble-input/${item.id}/${item.type}`} className="link">
          <div className="image">
            {item.image_file_name && (
              <img src={setImageHost(item.image_file_name)} alt={item.title} />
            )}
          </div>
        </Link>
        <Link to={`/trouble-input/${item.id}/${item.type}`} className="content-link">

        <div className="content">
          <p className="category">
            {item.type ? (
              <span>
                <img src={itemTypeIcon} alt="" className="type-icon" />
                {itemTypeLabel}
              </span>
            ) : (
              <span className="red">記事種類未設定</span>
            )}
          </p>
          <p className="text">{item.title}</p>
          <div className="date">
            {item.updated_at && format(parseISO(item.updated_at), 'yyyy.MM.dd HH:mm')}
          </div>
        </div>
        </Link>
      </article>
    )
  })

  React.useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className={`draft-list ${css.class}`}>
      <Header />
      <div className="drafts">
        <div className="title">下書き一覧</div>
        <div className="list">{List}</div>
      </div>
      <Footer />
    </div>
  )
}
