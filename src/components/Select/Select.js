import React from 'react'
import css from './styles.scss'

function Select({ className, onChange, value, disabled, children, fullWidth, name, index, type }) {
  return (
    <select
      name={name}
      className={`select ${css.class} ${className || ''} ${fullWidth ? 'full-width' : ''}`}
      disabled={disabled}
      onChange={e => onChange(e, index, type)}
      value={value}
    >
      {children}
    </select>
  )
}

export default Select
