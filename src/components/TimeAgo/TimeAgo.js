import React from 'react'
import formatDistance from 'date-fns/formatDistance'
import ja from 'date-fns/locale/ja'

import Clock from 'images/icons/clock.svg'
import css from './styles.scss'

function TimeAgo({ className, date, showIcon }) {
  const agoText = React.useMemo(() => {
    return formatDistance(date, new Date(), { locale: ja })
  }, [date])

  return (
    <span className={`time-ago ${css.class} ${className || ''}`}>
      {showIcon && <Clock />}
      <span className="time-ago-text">{agoText}</span>
    </span>
  )
}

export default TimeAgo
