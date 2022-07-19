import * as React from 'react'

export default function useScroll() {
  const [lastScrollTop, setLastScrollTop] = React.useState(0)
  const [bodyOffset, setBodyOffset] = React.useState(document.body.getBoundingClientRect())
  const [scrollY, setScrollY] = React.useState(bodyOffset.top)
  const [scrollX, setScrollX] = React.useState(bodyOffset.left)
  const [scrollDirection, setScrollDirection] = React.useState()

  const listener = (e) => {
    setBodyOffset(document.body.getBoundingClientRect())
    setScrollY(-bodyOffset.top)
    setScrollX(bodyOffset.left)
    setScrollDirection(lastScrollTop > -bodyOffset.top ? 'down' : 'up')
    setLastScrollTop(-bodyOffset.top)
  }

  React.useEffect(() => {
    window.addEventListener('scroll', listener)
    return () => {
      window.removeEventListener('scroll', listener)
    }
  })

  return {
    scrollY,
    scrollX,
    scrollDirection,
  }
}
