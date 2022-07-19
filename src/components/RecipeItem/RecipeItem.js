import React from 'react'
import { Link } from 'react-router-dom'
import parse from 'date-fns/parse'
import { setImageHost } from 'service/image'
import TimeAgo from 'components/TimeAgo'
import Heart from 'images/icons/heart-s.svg'
import HeartOn from 'images/icons/heart-s-on.svg'
import Balloone from 'images/icons/balloon.svg'
import BallooneOn from 'images/icons/balloon-on.svg'

import css from './styles.scss'

function RecipeItem({
  className,
  id,
  date,
  title,
  imgSrc,
  contentType,
  likeCount,
  commentCount,
  isLiked,
  isCommented,
  user,
  item,
  reference_media,
  key
}) {

  function ShowNewTag({ date }) {
    var dt = new Date(date);
    dt.setHours(dt.getHours() + 1);
    var curent_time = new Date();
    if (curent_time < dt) {
      return <span className="new-tag">NEW</span>
    } else {
      return false;
    }
  }

  console.log()

  return (
    <li className={`recipe-item ${css.class} ${className || ''}`}>
      <article>
        <div className="content">
          <div className="content-image">
            <Link to={`/recipe/${id}/${contentType}`} className="link">
              <img src={`${setImageHost(imgSrc)}`} alt={title} />
            </Link>
          </div>

          {
            reference_media?.image_file_name && <div className="logo-image">
              <Link to={`/recipe/${id}/${contentType}`} className="link">
                <img src={`${setImageHost(reference_media.image_file_name)}`} alt={title} />
              </Link>
            </div>
          }


          <div className="content-header">
            <div className="caption">
              {contentType === 'diys' && (
                <>
                  <img src="/assets/icons/diy.svg" />
                  <span className="text">DIYレシピ</span>

                  <span className="caption-tag">
                    {<ShowNewTag date={date} />}
                    <span className="type-tag caption-tag-orange">DIY </span>
                  </span>

                </>

              )}
              {contentType === 'problems' && (
                <>
                  <img src="/assets/icons/problem.svg" />
                  <span className="text">お困り </span>
                  <span className="caption-tag">
                    {<ShowNewTag date={date} />}
                    <span className="type-tag caption-tag-blue">お困り解決</span>
                  </span>
                </>
              )}
              {contentType === 'news' && (
                <>
                  <img src="/assets/icons/news.svg" />
                  <span>ニュース</span>
                  <span className="caption-tag">
                    {<ShowNewTag date={date} />}
                    <span className="type-tag caption-tag-orange">ニュース</span>
                  </span>
                </>
              )}
              {contentType === 'dictionaries' && (
                <>
                  <img src="/assets/icons/dictionary.svg" />
                  <span>辞書</span>
                  <span className="caption-tag">
                    {<ShowNewTag date={date} />}
                    <span className="type-tag caption-tag-blue">辞書</span>
                  </span>
                </>
              )}
            </div>

            <div className="effect">
              <span className={`likes ${isLiked ? 'is_like' : ''}`}>
                <Heart />
                <span className="text">{likeCount}</span>
              </span>
              <span className={`watches ${isCommented ? 'is_watches' : ''}`}>
                <Balloone />
                <span className="text">{commentCount}</span>
              </span>
            </div>


          </div>


          <div className="text">
            <Link to={`/recipe/${id}/${contentType}`} className="link">
              {title}
            </Link>
          </div>
          <div className="content-footer">
            <div className="user">
              {user.profile.image_file_name ? (
                <img
                  className="thumb"
                  src={`${setImageHost(user.profile.image_file_name)}`}
                  alt={user?.nickname}
                />
              ) : (
                  <img className="dummy" src="/assets/icons/person.svg" />
                )}
              <div className="nickname">
                <div className="text">
                  <Link to={`/profile/${user?.id}`} className="link">
                    {user?.nickname}
                  </Link>
                </div>
              </div>
            </div>

            <div className="updated">
              <TimeAgo date={parse(date, 'yyyy-MM-dd HH:mm:ss', new Date())} />
            </div>
          </div>
        </div>
      </article>


    </li>
  )
}

export default RecipeItem
