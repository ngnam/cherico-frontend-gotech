import React from 'react'

import EyeIcon from 'images/icons/close-eye.svg'
import EyeSlashIcon from 'images/icons/open-eye.svg'
import css from './styles.scss'

function TextInput(props) {
  const {
    id,
    fullWidth,
    placeholder,
    className,
    type,
    canSee,
    form,
    name,
    helperText,
    errorMsg,
    required,
    label,
    value,
    disabled,
    onChange,
    onFocus,
    onBlur,
    multiline,
    maxlength,
    showError
  } = props
  const hasError = !!(form && form.errors && form.errors[name]) || showError
  const [passHidden, setPassHidden] = React.useState(true)

  function handleChange(event) {
    if (form) {
      form.onChange(name, event.target.value)
      // return
    }

    onChange && onChange(event)
  }

  function handleFocus(event) {
    if (form) {
      form.onFocus(name)
      return
    }

    onFocus && onFocus(event)
  }

  function handleBlur(event) {
    if (form) {
      form.onBlur(event)
      return
    }
    onBlur && onBlur(event)
  }

  function handleSeePassword() {
    setPassHidden(!passHidden)
  }

  const hasCanSee = type === 'password' && canSee

  return (
    <div className={`text-input ${css.class} ${fullWidth ? 'full-width' : ''}`}>
      <div className={`input-wrapper ${!multiline ? 'has-border' : ''}`}>
        <div className="label">
          <label className="text">{label}</label>
          {required && <span className="required">（必須）</span>}
        </div>
        <div className={`input-container ${hasCanSee ? 'can-see' : ''}`}>
          {multiline ? (
            <textarea
              type={type === 'password' ? (passHidden ? 'password' : 'text') : type}
              className={className}
              id={id}
              placeholder={placeholder}
              value={form ? form.values[name] || '' : value}
              disabled={disabled}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              name={name}
              maxLength={maxlength}
            />
          ) : (
            <input
              type={type === 'password' ? (passHidden ? 'password' : 'text') : type}
              className={className}
              id={id}
              placeholder={placeholder}
              value={form ? form.values[name] || '' : value}
              disabled={disabled}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              maxLength={maxlength}
              name={name}
            />
          )}
          {hasCanSee && (
            <span className="can-see-icon" onClick={handleSeePassword}>
              {passHidden ? <EyeIcon /> : <EyeSlashIcon />}
            </span>
          )}
        </div>
      </div>
      <div className="helper-text">{helperText}</div>
      {hasError && <span className="error-text">{errorMsg}</span>}
    </div>
  )
}

export default TextInput
