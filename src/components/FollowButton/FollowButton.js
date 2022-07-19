import React from 'react'
import css from './styles.scss'

function FollowButton({ className, onClick, disabled, children }) {
  return (
    <button className={`${css.class} ${className || ''}`} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}

export default FollowButton
