import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { setImageHost } from 'service/image'

import BlockTitle from 'components/BlockTitle'
import TimeAgo from 'components/TimeAgo'

import RecommendLogo from 'images/icons/recommend_fill.svg'
import css from './styles.scss'

function TodaysRecipe({ recipe }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    if (!recipe) {
      return
    }
    setItems([...recipe].slice(0, 6))
  }, [recipe])

  if (!recipe) {
    return null
  }

  return (
    <div className={`${css.class}`}>
      <BlockTitle logo={<RecommendLogo />} titleText="おすすめレシピ" />
      <div className="article-wrap">
        {items &&
          items.map((item) => (
            <article className="" key={item.id}>
              <Link to={`/recipe/${recipe.id}/${recipe.type}`} className="link">
                <img src={`${setImageHost(item.image_file_name)}`} alt="" />
              </Link>
              <span className="text">{item.title}</span>
              <TimeAgo date={new Date()} />
            </article>
          ))}
      </div>
    </div>
  )
}

export default TodaysRecipe
