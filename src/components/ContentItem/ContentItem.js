import React from 'react'
import { Link } from 'react-router-dom'
import parse from 'date-fns/parse'
import { setImageHost } from 'service/image'
import Heart from 'images/icons/heart-s.svg'
import HeartOn from 'images/icons/heart-s-on.svg'
import Balloone from 'images/icons/balloon.svg'
import BallooneOn from 'images/icons/balloon-on.svg'
import TimeAgo from 'components/TimeAgo'
import css from './styles.scss'
import CommentMain from 'components/CommentMain'

function ContentItem({ className, items, onClick, disabled, children, varient }) {
  if (!items || !items.length) {
    return null
  }

  const Contents = items.map((item, index) => {
    return (
      <>
        <article key={index}>
          <Link to={`/recipe/${item.id}/${item.content_type}`} className="link">
            <div className="contents-image">
              <img src={`${setImageHost(item.image_file_name)}`} alt={item.title} />
            </div>
          </Link>
          <div className="contents-content">
            <div className="contents-head">
              <div className="caption">
                {item.content_type === 'news' && (
                  <>
                    <img src="/assets/icons/news.svg" />
                    <span>ニュース</span>
                  </>
                )}
                {item.content_type === 'dictionaries' && (
                  <>
                    <img src="/assets/icons/dictionary.svg" />
                    <span>辞書</span>
                  </>
                )}
              </div>
              <div className="effect">
                <span className="likes">
                  {item.is_liked ? <HeartOn /> : <Heart />}
                  <span className="text">{item.like_count}</span>
                </span>
                <span className="watches">
                  {item.is_commented ? <BallooneOn /> : <Balloone />}
                  <span className="text">{item.comment_count}</span>
                </span>
              </div>
            </div>
            <p className="contents-title">
              <Link to={`/recipe/${item.id}/${item.content_type}`} className="link">
                {item.title}
              </Link>
            </p>
            <div className="contents-foot">
              <div className="user">
                {item.user.profile.image_file_name ? (
                  <img
                    className="thumb"
                    src={`${setImageHost(item.user.profile.image_file_name)}`}
                    alt={item.user?.nickname}
                  />
                ) : (
                    <img className="dummy" src="/assets/icons/person.svg" />
                  )}
                <div className="nickname">
                  <div className="text">
                    <Link to={`/profile/${item.user?.id}`} className="link">
                      {item.user?.nickname}
                    </Link>
                  </div>
                </div>
              </div>

              <div className="updated">
                <TimeAgo date={parse(item.updated_at, 'yyyy-MM-dd HH:mm:ss', new Date())} />
              </div>
            </div>
          </div>
        </article>
        
        <CommentMain list={[item]} classArrow="arrow-up-center"/>
      </>
    )
  })

  return <div className={`content-item ${css.class}`}>{Contents}</div>
}

export default ContentItem
