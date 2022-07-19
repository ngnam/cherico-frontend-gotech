import React from 'react'
import css from './styles.scss'

function CheckBox({ className, name, disabled, checked, onChange, children }) {
  // TODO iconもらえ次第アイコンを実装
  return (
    <label className={`check-box ${css.class} ${className || ''}`}>
      <input
        type="checkbox"
        name={name}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
      />
      <span className="checkbox-label">{children}</span>
    </label>
  )
}

export default CheckBox
