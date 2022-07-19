import React from 'react'

export default function Input(props) {
  const { form, name, id, placeholder, type, className, errorMsg } = props
  const hasError = !!(form.errors && form.errors[name])

  return (
    <>
      <input
        type={type}
        className={className}
        id={id}
        placeholder={placeholder}
        onFocus={form.onFocus(name)}
        onBlur={form.onBlur}
        value={form.values[name] || ''}
        onChange={(event) => form.onChange(name, event.target.value)}
      />
      {hasError && <small className="form-text text-danger bold">{errorMsg}</small>}
    </>
  )
}
