import React from 'react'
import { useHistory, useParams } from 'react-router-dom'

import Header from 'components/Header'

import useRequest from 'hooks/useRequest'
import css from './styles.scss'

export default function SecondaryCategory() {
  const { request } = useRequest()
  const history = useHistory()
  const { categoryId, subCategoryId } = useParams()
  const [categories, setCategories] = React.useState()

  function handleSubCategory(id) {
    history.push(`/category/${categoryId}/${id}`)
    fetchCategories(id)
  }

  function handleCategory(id, name) {
    history.push(`/search-results/${id}/${name}`)
  }

  async function fetchCategories(id) {
    const result = await request({ url: `/categories/${id}` })
    setCategories(result.data)
  }

  React.useEffect(() => {
    const id = subCategoryId || categoryId
    fetchCategories(id)
  }, [])

  return (
    <div className={`category-list ${css.class}`}>
      <Header />
      <div className="sub-categories">
        {categories && (
          <div className="sub-category">
            <div className="category-heading">
              <div className="category-title">{categories.name}</div>
            </div>
            <ul className="category-links">
              <li className="link">
                <a href="#" onClick={() => handleCategory(categories.id, categories.name)}>
                  すべて
                </a>
              </li>
              {categories.children &&
                categories.children.map((item, index) => {
                  return (
                    <li className="link" key={index}>
                      {!subCategoryId ? (
                        <a href="#" onClick={() => handleSubCategory(item.id)}>
                          {item.name}
                        </a>
                      ) : (
                        <a href="#" onClick={() => handleCategory(item.id, item.name)}>
                          {item.name}
                        </a>
                      )}
                    </li>
                  )
                })}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
