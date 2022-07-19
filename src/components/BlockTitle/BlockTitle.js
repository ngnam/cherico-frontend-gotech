import React from 'react'

import css from './styles.scss'

function BlockTitle({ className, titleLogo, logo, titleText }) {
  return (
    <div className={`block-title ${css.class} ${className || ''}`}>
      <div className="title-logo">{titleLogo}</div>
      <div className="heading">
        {logo}
        <span className="text">{titleText}</span>
      </div>
    </div>
  )
}

export default BlockTitle
