import React from 'react'
import { useHistory } from 'react-router-dom'

import Header from 'components/Header'
import Button from 'components/Button'
import ChevronRight from 'images/icons/chevron-right.svg'

import useRequest from 'hooks/useRequest'
import css from './styles.scss'

export default function Category() {
  const { request } = useRequest()
  const history = useHistory()
  const [categories, setCategories] = React.useState()

  function handleCategory(categoryId) {
    history.push(`/category/${categoryId}`)
  }

  function handleSubCategory(categoryId, subCategoryId) {
    history.push(`/category/${categoryId}/${subCategoryId}`)
  }

  async function fetchCategories() {
    const result = await request({ url: '/categories' })
    setCategories(result.data)
  }

  React.useEffect(() => {
    fetchCategories()
  }, [])

  const Items =
    categories &&
    categories.map((category) => {
      const children = category.children.slice(1, 6)
      const subCategories = children.map((subCategory) => {
        return (
          <li className="link" key={subCategory.id}>
            <a href="#" onClick={() => handleSubCategory(category.id, subCategory.id)}>
              {subCategory.name}
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
              <Button varient="link" onClick={() => handleCategory(category.id)}>
                <span>全て見る</span> <ChevronRight />
              </Button>
            </div>
          </div>
        </div>
      )
    })

  return (
    <div className={`category ${css.class}`}>
      <Header />
      <div className="categories">
        <div className="sub-categories">{Items}</div>
      </div>
    </div>
  )
}
