import React from 'react'

import css from './styles.scss'

function DesignPDF({handleMove, item, index}) {
    return (
        <div className={`${css.class}`}>
            <p className="title-header">ファイル</p>
            <div className="file-sub-content">
                <img src="/assets/imgs/file_fill.png" />
                <span>ファイルを追加する</span>
            </div>
            <div className="sub-content-1-control">
                <div className="control-left">
                    {/*<span className="btn-remove m-r">削除</span>*/}
                    {/*<span className="btn-add">画像と本文をを追加</span>*/}
                </div>
                <div className="control-right">
                    <img src="/assets/imgs/upward.png" className="m-r" onClick={e => handleMove(index, 'design', -1)}/>
                    <img src="/assets/imgs/downward.png" onClick={e => handleMove(index, 'design', 1)}/>
                </div>
            </div>
        </div>
    )
}

export default DesignPDF
