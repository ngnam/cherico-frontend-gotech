import React from 'react'
import UploadImage from "../UploadImage/UploadImage";
import TextInput from 'components/TextInputV3'
import { setImageHost } from 'service/image'

import css from './styles.scss'

function ProductInput({item, index, type, last, handleInputChange, handleAdd, handleRemove, handleMove, handleProductImage}) {
    return (
        <div className={`${css.class}`}>
            <div className="product-input-content">
                <div className="upload-modify">
                    <UploadImage simple={true} handleUpload={handleProductImage} imgSrc={item.image_file_name} index={index}/>
                </div>
                <p className="sub-title-text">メーカー名</p>
                <TextInput
                    required={false}
                    multiline={false}
                    name="company_name"
                    placeholder="DCM-HD"
                    errorMsg={item.e_c}
                    value={item.company_name}
                    onChange={handleInputChange}
                    type={type}
                    position={index}
                    maxlength="255"
                    noborder={true}
                />
                <p className="sub-title-text">商品名</p>
                <TextInput
                    required={false}
                    multiline={false}
                    name="name"
                    placeholder="ドライバドリル"
                    errorMsg={item.e_n}
                    value={item.name}
                    onChange={handleInputChange}
                    type={type}
                    position={index}
                    maxlength="255"
                    noborder={true}
                />
                <p className="sub-title-text">価格</p>
                <TextInput
                    required={false}
                    multiline={false}
                    name="price"
                    placeholder="0"
                    errorMsg={item.e_p}
                    value={item.price}
                    onChange={handleInputChange}
                    position={index}
                    type={type}
                    maxlength="255"
                    noborder={true}
                    money={true}
                />
                <p className="sub-title-text">商品URL</p>
                <TextInput
                    required={false}
                    multiline={false}
                    name="url"
                    placeholder="http://mirateo.jp"
                    errorMsg={item.e_u}
                    value={item.url}
                    onChange={handleInputChange}
                    type={type}
                    position={index}
                    maxlength="255"
                    noborder={true}
                />
            </div>
            <div className="sub-content-1-control m-b-52">
                <div className="control-left">
                    {
                        index != (last - 1) && <span className="btn-remove m-r" onClick={e => handleRemove(index, type)}>削除</span>
                    }
                    {
                        index == (last - 1) && <span className="btn-add" onClick={e => handleAdd(type)}>画像と本文をを追加</span>
                    }
                </div>
                <div className="control-right">
                    <img src="/assets/imgs/upward.png" className="m-r"  onClick={e => handleMove(index, type, -1)}/>
                    <img src="/assets/imgs/downward.png" onClick={e => handleMove(index, type, 1)}/>
                </div>
            </div>
        </div>
    )
}

export default ProductInput
