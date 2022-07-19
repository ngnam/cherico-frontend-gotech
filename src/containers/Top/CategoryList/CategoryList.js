import React from 'react'
import { useHistory } from 'react-router-dom'

import BlockTitle from 'components/BlockTitle'

import CategoryLogo from 'images/icons/category.svg'
import ReadMore from 'components/ReadMore'

import css from './styles.scss'

export default function CategoryList({ items, onClick }) {
  const history = useHistory()
  function handleCategoryClick(event, category, subCategory) {
    event.preventDefault()
    history.push(`/search-results/${subCategory.id}/${subCategory.name}`)
  }

  function handleReadMore(categoryList) {
    history.push(`/category/${categoryList.id}`)
  }

  const Categorys =
    items &&
    items.map((item) => {
      const children = [...item.children]

      const CategoryItems = children.map((category) => {
        return (
          <li className="link" key={category.id}>
            <a href="#" onClick={(event) => handleCategoryClick(event, item, category)}>
              {category.name}
            </a>
          </li>
        )
      })
      return (
        <div className="sub-category" key={item.id}>
          <div className="category-heading">
            <div className="category-title">{item.name}</div>
          </div>
          <ul className="category-links">{CategoryItems}</ul>
          <ReadMore onClick={() => handleReadMore(item)}>全てみる</ReadMore>
        </div>
      )
    })
  return (
    <div className={`category ${css.class}`}>
      <BlockTitle logo={<CategoryLogo />} titleText="カテゴリー" />
      <div className="sub-categories">{Categorys}</div>
    </div>
  )
}
