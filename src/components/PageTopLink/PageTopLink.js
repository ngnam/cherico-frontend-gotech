import React from 'react'
import PageTop from 'images/icons/pagetop.svg'
import useScroll from 'hooks/useScroll'
import css from './styles.scss'

function PageTopLink({ className, onClick }) {
  const { scrollY } = useScroll()

  const showLink = (() => {
    if (scrollY < 100) {
      return
    }
    return 'show'
  })()

  const scrollTop = () => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' })
  }
  return (
    <div className={`page-top-link ${css.class} ${className || ''} ${showLink}`}>
      <PageTop onClick={scrollTop} />
    </div>
  )
}

export default PageTopLink
