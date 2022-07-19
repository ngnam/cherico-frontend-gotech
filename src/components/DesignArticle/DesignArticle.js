import React from 'react'
import TextInput from "components/TextInputV3";
import css from './styles.scss'

function DesignArticle({handleMove, item, index, handleInputChange}) {
    return (
        <div className={`${css.class}`}>
            <p className="title-header">本文</p>
            <TextInput
                required={false}
                multiline={true}
                rows="7"
                name="description"
                placeholder="例）DIY初心者にもおすすめの木の丸イス"
                errorMsg=""
                value={item.description}
                onChange={handleInputChange}
                type="design"
                position={index}
                maxlength="255"
            />
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

export default DesignArticle
