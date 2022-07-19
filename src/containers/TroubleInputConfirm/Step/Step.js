import React from 'react'
import AccordionText from 'components/AccordionText'
import css from './style.scss'

export default function Step({data, i, type}) {
    return (
        <div className={`recipe-step ${css.class}`}>
            <div className={`step-item`}>
                <p className="text-main" ref={type}>{data.title}</p>
                <p className="text-title">{data.sub_title}</p>
                {
                    data.image_file_name != "" ? (
                        <img src={process.env.IMAGE_HOST + '/' + data.image_file_name} />
                    ) : (
                        <div> </div>
                    )
                }
                <p className="text-description">{data.description}</p>
                <p className="text-comment">
                    <img src="/assets/icon_comment.png" />
                    コメントを投稿する
                </p>
                {
                    data.advice.check ? (
                        <AccordionText component={'div'}>
                            <p className="advice-title">{data.advice.title}</p>
                            <div className="img-content">
                                {
                                    data.advice.image_file_name != "" ? (
                                        <img src={process.env.IMAGE_HOST + '/' + data.advice.image_file_name} />
                                    ) : (
                                        <div> </div>
                                    )
                                }
                            </div>
                            <p className="advice-description">{data.advice.description}</p>
                        </AccordionText>
                    ) : (
                        <span> </span>
                    )
                }
            </div>
        </div>
    )
}
