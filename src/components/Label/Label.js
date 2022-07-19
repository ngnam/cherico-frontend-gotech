import React from 'react'
import css from './styles.scss'

function Label({ className, children }) {
  return <label className={`${css.class} ${className || ''}`}>{children}</label>
}

export default Label
