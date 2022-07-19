import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import parse from 'date-fns/parse'

import { setImageHost } from 'service/image'
import BlockTitle from 'components/BlockTitle'
import TimeAgo from 'components/TimeAgo'
import ReadMore from 'components/ReadMore'
import PersonIcon from 'images/icons/person.svg'

import NewLogo from 'images/icons/new_fill.svg'
import css from './styles.scss'

function NewRecipe({ items, onLinkClick }) {
  const [showAll, setShowAll] = React.useState(false)
  const [chunkContents, setChunkContents] = React.useState([])
  const [chunkIndex, setChunkIndex] = React.useState(0)
  const [recipes, setRecipes] = React.useState()
  const chunk = (array, size) => {
    const chunked = []
    let index = 0

    while (index < array.length) {
      chunked.push(array.slice(index, index + size))
      index += size
    }

    return chunked
  }

  useEffect(() => {
    if (items) {
      const chunkItems = chunk(items, 20)
      setRecipes(chunkItems[0])
      setChunkContents(chunkItems)
    }
  }, [items])

  if (!items || !items.length) {
    return null
  }

  const showNextContent = () => {
    const newIndex = chunkIndex + 1
    setChunkIndex(newIndex)
    if (newIndex >= chunkContents.length) {
      setShowAll(true)
    } else {
      const newItems = [...recipes, ...chunkContents[newIndex]]
      setRecipes(newItems)
      if (newIndex + 1 >= chunkContents.length) {
        setShowAll(true)
      }
    }
  }

  const Items = recipes?.map((item, index) => {
    return (
      <li className="recipe-item" key={index}>
        <article>
          <div className="content">
            <Link to={`/recipe/${item.id}/${item.type}`} className="link">
              <img src={`${setImageHost(item.image_file_name)}`} alt={item.title} />
            </Link>
            <span className="text">{item.title}</span>
          </div>
          <TimeAgo date={parse(item.updated_at, 'yyyy-MM-dd HH:mm:ss', new Date())} />
          <div className="content-footer">
            {/* eslint-disable-next-line camelcase */}
            {item?.user?.profile?.image_file_name ? (
              <img
                className="thumb"
                src={`${setImageHost(item.user.profile.image_file_name)}`}
                alt={item.user?.nickname}
              />
            ) : (
              <PersonIcon />
            )}
            <div className="nickname">
              <div className="text">{item.user?.nickname}</div>
            </div>
          </div>
        </article>
      </li>
    )
  })
  return (
    <div className={`new-recipe ${css.class}`}>
      <BlockTitle logo={<NewLogo />} titleText="新着レシピ" />
      <div className="recipe-list">
        <ul>{Items}</ul>
        <div className="action">{!showAll && <ReadMore onClick={() => showNextContent()} />}</div>
      </div>
    </div>
  )
}

export default NewRecipe
