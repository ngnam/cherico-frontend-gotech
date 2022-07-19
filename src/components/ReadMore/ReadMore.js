import React from 'react'

import ChevronRight from 'images/icons/chevron-right.svg'
import ChevronUp from 'images/icons/chevron-up.svg'
import css from './styles.scss'

function ReadMore({ className, onClick, disabled, children }) {
  return (
    <button
      className={`button ${css.class} ${className || ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      <span>{children || 'もっと見る'}</span>
      {className === 'chevronUp' ? <ChevronUp></ChevronUp> : <ChevronRight></ChevronRight>}
    </button>
  )
}

export default ReadMore
