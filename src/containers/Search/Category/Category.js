import React from 'react'
import { useHistory } from 'react-router-dom'

import Button from 'components/Button'
import ChevronRight from 'images/icons/chevron-right.svg'

import css from './styles.scss'

export default function Category({ items }) {
  const history = useHistory()

  function handleAll(categoryId) {
    history.push(`/category/${categoryId}`)
  }

  function handleSubCategory(id, name) {
    history.push(`/search-results/${id}/${name}`)
  }

  const Items =
    items &&
    items.map((category) => {
      const children = category.children.slice(1, 6)
      const subCategories = children.map((subCategory) => {
        return (
          <li className="link" key={subCategory.id}>
            <a href="#" onClick={() => handleSubCategory(subCategory.id, subCategory.name)}>
              <span>{subCategory.name}</span>
            </a>
          </li>
        )
      })

      return (
        <div className="sub-categories" key={category.id}>
          <div className="sub-category">
            <div className="category-heading">
              <div className="category-title">{category.name}</div>
            </div>
            <ul className="category-links">{subCategories}</ul>
            <div className="actions">
              <Button varient="link" onClick={() => handleAll(category.id)}>
                <span>全て見る</span> <ChevronRight />
              </Button>
            </div>
          </div>
        </div>
      )
    })

  return (
    <div className={`category ${css.class}`}>
      <div className="categories">
        <div className="sub-categories">{Items}</div>
      </div>
    </div>
  )
}
