import React from 'react'
import CommentLink from 'components/CommentLink'
import { setImageHost } from 'service/image'
import css from './styles.scss'
import {format, parseISO} from "date-fns";

function Process({ steps, showComment, recipeId, type, stepType }) {
    console.log(steps);
    if(steps.length === 0){
        return '';
    }

    const [expand, setExpand] = React.useState(false)
    function handleExpand(event) {
        event.preventDefault()
        setExpand(!expand)
    }

    return (
        <div className={`${css.class}`}>
            {
                steps.sort((a, b) => a.process_no - b.process_no)
                    .map((item) => {
                        return (
                            <div className="step-content">
                                <div className="main-content">
                                    <p className="main-title">{item.title}</p>
                                    {item.image_file_name && <img className="main-img" src={`${setImageHost(item.image_file_name)}`} alt="" />}
                                    <p className="main-sub-title">{item.sub_title}</p>
                                </div>
                                {
                                    showComment && item.comments ? (
                                        <div className="comment-content-abnormal">
                                            <div className="ab-comment">
                                                <div className="bl-1">
                                                    {item.comments[0].user.profile.image_file_name &&
                                                    <img src={`${setImageHost(item.comments[0].user.profile.image_file_name)}`} alt="" />}
                                                </div>
                                                <div className="bl-2">
                                                    <div className="p-5">
                                                        <span className="popular-flag">人気コメント</span>
                                                        <p className="comment-text">{item.comments[0].comment}</p>
                                                        <p className="comment-date">
                                                            <a href="#">{item.comments[0].user.nickname}</a>
                                                            {format(parseISO(item.comments[0].updated_at), 'yyyy年MM月dd日 HH:mm')}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="bl-3">
                                                    <img src="/assets/imgs/heart_red.png" />
                                                    <p className="count-heart">234</p>
                                                </div>
                                            </div>
                                            <div className="ab-info">
                                                <div className="in-1">
                                                    <a className="color-orange" href={`/comment/${recipeId}/${type}/${stepType}/${item.id}`}>
                                                        {item.comments ? item.comments.length : 0}
                                                    </a>
                                                    件
                                                </div>
                                                <div className="in-2">
                                                    <CommentLink
                                                        id={recipeId}
                                                        type={type}
                                                        process={stepType}
                                                        index={item.id}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="comment-content-normal">
                                            <div className="count-comment">
                                                コメント
                                                <a className="color-orange" href={`/comment/${recipeId}/${type}/${stepType}/${item.id}`}>
                                                    {item.comments ? item.comments.length : 0}
                                                </a>
                                                件
                                            </div>
                                            <div className="link-comment">
                                                <CommentLink
                                                    id={recipeId}
                                                    type={type}
                                                    process={stepType}
                                                    index={item.id}
                                                />
                                            </div>
                                        </div>
                                    )
                                }
                                {
                                    item.advices && item.advices.description ? (
                                        <div>
                                            <p className="text-point">Point</p>
                                            <div className={`advice-collapse ${ expand ? '' : 'close' }`}>
                                                <p className="col-title">{item.advices.title}</p>
                                                {
                                                    item.advices.image_file_name && <img className="col-img" src={setImageHost(item.advices.image_file_name)} />
                                                }
                                                <p className="col-sub-title">{item.advices.sub_title}</p>
                                                {
                                                    expand ?
                                                        <img className="icon-control" src="/assets/imgs/down.png" alt="icon" onClick={handleExpand} />
                                                        :
                                                        <img className="icon-control" src="/assets/imgs/right.png" alt="icon" onClick={handleExpand} />
                                                }
                                            </div>
                                        </div>
                                    ) : ''
                                }
                            </div>
                        )
                    })
            }
        </div>
    )
}

export default Process