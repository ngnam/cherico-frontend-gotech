import React, { useState, useMemo } from 'react'
import { setImageHost } from 'service/image'
import css from './styles.scss'
import CommentLink from 'components/CommentLink'
import ArrowRight from 'images/icons/arrow-right.svg'
import { format, parseISO } from 'date-fns'


function getAvatarComment(comment_user_thumbnails, comment_count) {
    const element = comment_user_thumbnails.map((item, index) => {
        return <img src={setImageHost(item)} alt={item} />
    });
    return <>
        {element}

    </>
}

function CommentMain({ list = [], listConcat = [], classArrow = "arrow-up-right", index }) {
    let comments;
    if (list && list.length > 0 && listConcat && listConcat.length > 0) {
        comments = list.concat(listConcat);
    } else {
        comments = (list && list.length > 0) ? list : (listConcat && listConcat.length > 0) ? listConcat : [];
    }

    const newComment = useMemo(
        () => (typeof comments[comments.length - 1].new_arrival_comment != 'undefined') ? comments[comments.length - 1].new_arrival_comment : newComment,
        []
    );


    // Lấy cmt mới nhất trong list bài viết
    // comments.forEach((num, index) => {
    //   if (num.new_arrival_comment != null) {
    //     newComment = (typeof newComment != 'undefined') ? newComment : num.new_arrival_comment;
    //     let numDate = new Date(num.new_arrival_comment.updated_at);
    //     let newCommentDate = new Date(newComment.updated_at);
    //     if (newCommentDate < numDate) {
    //       newComment = num.new_arrival_comment;
    //     }
    //   }
    // });

    return newComment ?
        <div className={`arrow-box session-comment-item  ${css.class} ' ' ${classArrow} `} >
            <div className=" d-flex">{index < 1 && <div className="avatar">
                {
                    newComment.user.profile.image_file_name ?
                        <img src={setImageHost(newComment.user.profile.image_file_name)} alt={newComment.user.nickname} /> :
                        <img src="/assets/user-avatar.png" />
                }
            </div>}
                <div className="comment-content">
                    <div className="new-lable">新着コメント</div>
                    <div className="text">{newComment.comment}</div>
                    {index < 1 && <div className="info">
                        <a href="#">{newComment.user.nickname}</a>
                        <span className="timestamp"> {format(parseISO(newComment.updated_at), 'yyyy年MM月dd日 HH:mm')}</span>
                    </div>}
                </div>
            </div>
            {index < 1 && <div className=" d-flex comment-link">
                <div className="avatar">
                    {getAvatarComment(comments[comments.length - 1].comment_user_thumbnails)}

                    <span className="comment_count">
                        <a className="count" href={`/comment/${comments[comments.length - 1].id}/${comments[comments.length - 1].content_type}/common/${comments[comments.length - 1].id}`}>
                            {comments[comments.length - 1].comment_count}</a>
                        <i>件</i>
                    </span>

                </div>
                <CommentLink id={comments[comments.length - 1].id} type={comments[comments.length - 1].content_type} process="common" index={comments[comments.length - 1].id} />
            </div>}

        </div> : '';





}

export default CommentMain
