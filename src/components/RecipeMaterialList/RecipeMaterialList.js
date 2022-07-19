import React from 'react'

import css from './styles.scss'

function RecipeMaterialList({ className, items }) {

  const Items = items.map((item, index) => {

    if (item.qty && item.qty > 0)
      return (
        <div className="item" key={index}>
          <div className="d-flex align-center space-between">
            <div>
              <div className="item-text">
                {
                  item.url ? <a href={item.url} target="_blank">{item.name || ''}</a> : <span>{item.name || ''}</span>
                }
              </div>
              <span className="item-qty">数量:{item.qty || 0}</span>
            </div>
            <div>
              <span className="item-price">{item.price ? ("¥" + item.price) : '---'}</span>
            </div>
          </div>
        </div>
      )
  })
  return <div className={`recipe-material-list ${css.class}`}>{Items}</div>
}

export default RecipeMaterialList
