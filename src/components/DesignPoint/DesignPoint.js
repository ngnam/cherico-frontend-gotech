import React from 'react'
import TextInput from 'components/TextInputV3'
import UploadImage from "../UploadImage/UploadImage";

import css from './styles.scss'

function DesignPoint({handleMove, item, index, handleInputChange}) {
    return (
        <div className={`${css.class}`}>
            <p className="title-header">ポイント</p>
            <div className="point-section-content">
                <p className="sub-text-title m-t-0">ポイント見出し</p>
                <TextInput
                    required={false}
                    multiline={true}
                    rows="4"
                    name="title"
                    placeholder="例）木製の丸イス"
                    errorMsg=""
                    value={item.title}
                    onChange={handleInputChange}
                    type="design"
                    position={index}
                    maxlength="50"
                    helperText="0/50"
                />
                <div className="m-t-8">
                    <UploadImage />
                </div>
                <p className="sub-text-title">本文</p>
                <TextInput
                    required={false}
                    multiline={true}
                    rows="4"
                    name="description"
                    placeholder="例）DIY初心者にもおすすめの木の丸イス"
                    errorMsg=""
                    value={item.description}
                    onChange={handleInputChange}
                    type="design"
                    position={index}
                    maxlength="1000"
                />
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

export default DesignPoint
