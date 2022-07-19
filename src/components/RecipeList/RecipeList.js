import React from 'react'

import RecipeItem from 'components/RecipeItem'

import css from './styles.scss'
import CommentMain from 'components/CommentMain'



function RecipeList({ className, date, list, type }) {

  const Items =
    list &&

    list.map((item, index, elements) => {
      let pre, smallClass;
      var classArrowSecond = 'arrow-up-center';


      //Thẻ admin thì hiển thị cmt ở index chẵn (do bài đầu tiên sẽ hiển thị lớn)
      //Thẻ user_content thì cmt hiển thị ở index lẻ
      if (type == 'user_content') {
        var check = (index % 2 != 0);
        var show = (index % 2 != 0);
      } else {
        var check = (index % 2 == 0 && index != 0);
        var show = (index % 2 == 0);
      }

      if (check) {
        pre = elements[index - 1];
        if (pre.new_arrival_comment && item.new_arrival_comment) {
          var classArrowFirst = 'arrow-up-center';
          var classArrowSecond = 'arrow-up-center ml-9';

        } else if (pre.new_arrival_comment && !item.new_arrival_comment) {
          var classArrowFirst = 'arrow-up-left';
          var classArrowSecond = 'arrow-up-center ml-9';
        } else {
          var classArrowFirst = 'arrow-up-center';
          var classArrowSecond = 'arrow-up-right';
        }
        smallClass = 'small-class';
      }
      if (index == 0) {
        var marginClass = 'mb-39';
      }


      return (
        <>
          <RecipeItem
            key={index}
            id={item.id}
            title={item.title}
            imgSrc={item.image_file_name}
            date={item.updated_at}
            contentType={item.content_type}
            likeCount={item.like_count}
            commentCount={item.comment_count}
            isLiked={item.is_liked}
            isCommented={item.is_commented}
            user={item.user}
            className={smallClass}
            reference_media={item.reference_media}
          />

          {show &&
            <li className={`comment-box ${marginClass}`}>
              {pre && <CommentMain list={[pre]} classArrow={classArrowFirst} index={index} />}
              <CommentMain list={[item]} classArrow={classArrowSecond} index={index} />
            </li>
          }
        </>
      )
    })
  return (
    <div className={`recipe-list ${css.class}`}>
      <ul>{Items}</ul>
    </div>
  )
}

export default RecipeList
