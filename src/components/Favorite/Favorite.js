import React from 'react'
import HeartIcon from 'images/icons/heart.svg'
import HeartIconActive from 'images/icons/favorite_fill.svg'
import css from './styles.scss'

function Favorite({ className, onClick, active }) {
  return (
    <span
      className={`favorite d-inline-flex justify-center align-center ${css.class} ${
        className || ''
      }`}
      onClick={onClick}
    >
      {active ? <HeartIconActive /> : <HeartIcon />}
    </span>
  )
}

export default Favorite
