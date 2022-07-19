import React from 'react'
import ChevronDown from 'images/icons/chevron-down.svg'
import ChevronUp from 'images/icons/chevron-up.svg'
import css from './styles.scss'
import { setImageHost } from 'service/image'

function AccordionText({ className, onClick, disabled, children, advices }) {

  const [expand, setExpand] = React.useState(false)
  function handleExpand(event) {
    event.preventDefault()
    setExpand(!expand)
  }


  return (
    <div
      className={`accordion-text ${css.class} ${className || ''} ${expand ? 'expand' : ''}`}
    >
      {advices?.image_file_name ? <div className="image"><img src={setImageHost(advices.image_file_name)} /> </div> : ''}
      {advices?.title ? <h3 className="title">{advices.title}</h3> : ''}

      <p className="text-body">{children}</p>
      <div className="trigger">
        <a href="#" className="d-inline-flex justify-center align-center" onClick={handleExpand}>
          <span>{expand ? '折りたたむ' : 'すべてを読む'}</span>
          {expand ? <ChevronUp /> : <ChevronDown />}
        </a>
      </div>
    </div>
  )
}

export default AccordionText
