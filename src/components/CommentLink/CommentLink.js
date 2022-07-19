import React from 'react'
import CommentBalloon from 'images/icons/comment-balloon.svg'
import css from './styles.scss'
import ArrowRight from 'images/icons/arrow-right.svg'

function Button({ className, onClick, type, process, index, id, text = 'コメントを投稿する', showIcon = true }) {
  return (
    <label
      className={`comment-balloon d-inline-flex align-center ${css.class} ${className || ''}`}
      onClick={onClick}
    >
      {showIcon && <CommentBalloon />}

      <a className={!showIcon && 'common-link'} href={`/comment/${id}/${type}/${process}/${index}`}>
        {text} {!showIcon && <ArrowRight className={`adjust-position`} />}
      </a>
    </label>
  )
}

export default Button
