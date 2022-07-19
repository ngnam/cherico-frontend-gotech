import React from 'react'

import css from './style.scss'

export default function InputList({data, i}) {
    return (
        (data.name || data.qty || data.price) && <div className={`recipe-step ${css.class}`}>
            <div className={`input-list-item ${i != 0 ? 'has-border' : ''}`}>
                <div className="item-info">
                    {
                        data.name &&  (
                            data.url ?
                                <a href={data.url} target="_blank">{data.name}</a> :
                                <p className="item-name">{data.name}</p>
                        )
                    }
                    {
                        data.qty && <p className="item-quantity">数量: {data.qty}</p>
                    }
                </div>
                <div className="item-price">
                    {
                        data.price && <p className="item-show-price">¥{data.price}</p>
                    }
                </div>
            </div>
        </div>
    )
}
