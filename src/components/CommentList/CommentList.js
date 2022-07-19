import React, { useState } from 'react'
import { setImageHost } from 'service/image'
import css from './styles.scss'
import { format, parseISO } from 'date-fns'
import CommentLink from 'components/CommentLink'
import ArrowRight from 'images/icons/arrow-right.svg'


function CommentList({ items, viewer, handleDeleteComment, type = '', recipeId = '', hiden = 'hide-comment' }) {
    if (!items || !items.length) {
        return null;
    }

    const Comments = items.map((item, index) => {
        return (<div className={'comment-item d-flex ' + hiden + (item.user.id == viewer ? ' my-comment ' : ' ')} key={index} data-id={index}>
            <div className="avatar">
                {
                    item.user.image_file_name ?
                        <img src={setImageHost(item.user.image_file_name)} alt={item.user.name} /> :
                        <img src="/assets/user-avatar.png" />
                }
            </div>
            <div className="comment-content">
                <div className="text">{item.comment}</div>
                <div className="info">
                    <a href="#">{item.user.name}</a>
                    <span className="timestamp"> {format(parseISO(item.updated_at), 'yyyy年MM月dd日 HH:mm')}</span>
                </div>
            </div>
        </div>)
    });

    // src\images\icons\arrow-right.svg

    return <div className={`comment-list ${css.class}`}>
        <div className={`comment-list`}>{Comments}</div>
        {
            (items.length > 3 && hiden != '') && <div className={`btn-loadmore`} >
                <CommentLink id={recipeId} type={type} process="common" index={recipeId} text='もっとみる' showIcon={false} />
            </div>
        }
    </div>
}

export default CommentList
