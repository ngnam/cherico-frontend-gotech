import React from 'react'
import { useHistory } from 'react-router-dom'
import css from './styles.scss'

function KeywordList({ items, className }) {
  const history = useHistory()
  const handleKeuword = (keyword) => {
    history.push(`/search-results/0/${keyword}`)
  }

  if (!items && !items.length) {
    return null
  }
  const Keywords = items.map((keyword, index) => {
    return (
      <li className="keyword-item" key={index} onClick={() => handleKeuword(keyword)}>
        {keyword}
      </li>
    )
  })
  return <div className={`keyword-list ${css.class} d-flex`}>{Keywords}</div>
}

export default KeywordList
