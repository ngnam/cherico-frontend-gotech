import React from 'react'
import { setImageHost } from 'service/image'
import ExternalLinkIcon from 'images/icons/external-link.svg'
import NoImage from 'images/icons/goods-noimage.svg'
import css from './styles.scss'

function ProductList({ items, className, onClick, disabled, children, varient }) {
  const Products = items.map((item, index) => {
    const base = (
      <div className="product">
        {item.image_file_name ? <img src={setImageHost(item.image_file_name)} /> : <NoImage />}
        <div className="product-info">
          <div className="maker-name">{item.maker}</div>
          <div className="item-name">{item.name}</div>
          <div className="price">
            <span>{item.price ? `${item.price}円` : ''}</span>
            {item.url && <ExternalLinkIcon />}
          </div>
        </div>
      </div>
    )

    const ProductItem = (() => {
      if (!item.url) {
        return <>{base}</>
      }
      return <a href={item.url}>{base}</a>
    })()
    return (
      <li className="product-item" key={index}>
        <article>{ProductItem}</article>
      </li>
    )
  })
  return <ul className={`product-list ${css.class}`}>{Products}</ul>
}

export default ProductList
