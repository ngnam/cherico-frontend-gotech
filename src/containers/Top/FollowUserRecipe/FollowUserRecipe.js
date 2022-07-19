import React from 'react'
import { Link } from 'react-router-dom'
import parse from 'date-fns/parse'

import { setImageHost } from 'service/image'
import BlockTitle from 'components/BlockTitle'
import TimeAgo from 'components/TimeAgo'
import ReadMore from 'components/ReadMore'

import TitleLogo from 'images/follow-user-receipt-title.svg'
import DummyLogo from 'images/dummy-logo.svg'

import css from './styles.scss'

function FollowUserRecipe({ items }) {
  const [showAll, setShowAll] = React.useState(false)

  if (!items || !items.length) {
    return null
  }

  const recipes = [...items]

  if (recipes.length > 4 && !showAll) {
    recipes.length = showAll ? recipes.length : 4
  }

  const Items = recipes.map((item, index) => {
    return (
      <li className="recipe-item" key={index}>
        <article>
          <div className="content">
            <Link to={`/recipe/${item.id}/${item.type}`} className="link">
              <img src={`${setImageHost(item.image_file_name)}`} alt={item.title} />
            </Link>
            <span className="text">{item.title}</span>
          </div>
          <TimeAgo date={parse(item.created_at, 'yyyy-MM-dd HH:mm:ss', new Date())} />
        </article>
      </li>
    )
  })

  return (
    <div className={`new-recipe ${css.class}`}>
      <BlockTitle
        titleLogo={<TitleLogo />}
        logo={<DummyLogo />}
        titleText="フォローしたユーザーの新着レシピ"
      />
      <div className="recipe-list">
        <ul>{Items}</ul>
        <div className="action">
          {items.length > 4 && !showAll && (
            <ReadMore onClick={() => setShowAll(true)}>全てみる</ReadMore>
          )}
        </div>
      </div>
    </div>
  )
}

export default FollowUserRecipe
