import React from 'react'
import css from './styles.scss'

import TextInput from 'components/TextInputV3'
import Select from "../Select/Select";

function ToolList({ title, className, item, handleInputChange, type, index, handleAdd, handleRemove, last}) {
    let _num = [];
    for (let i = 0; i < 100; i++) {
        _num.push(i);
    }

    return (
        <div className={`${css.class} ${className || ''}`}>
            <p className="main-title-block">{title + '.' + (index + 1)}</p>
            <div className="section-content-block">
                <p className="text-title">材料名</p>
                <TextInput
                    required={false}
                    multiline={false}
                    name="name"
                    placeholder="例）木材"
                    errorMsg={item.e_n}
                    value={item.name}
                    onChange={handleInputChange}
                    type={type}
                    position={index}
                    maxlength="20"
                    helperText={`${ item.name?.length ?? 0 }/20`}
                    noborder={true}
                />
                <p className="text-title">数量</p>
                <Select fullWidth name="qty" value={item.qty} onChange={handleInputChange} index={index} type={type}>
                    {
                        _num.map(i => {
                            return <option key={i} value={i}>{i}</option>;
                        })
                    }
                </Select>
                <p className="text-title">金額</p>
                <TextInput
                    required={false}
                    multiline={false}
                    name="price"
                    placeholder="0"
                    errorMsg={item.e_p}
                    value={item.price}
                    onChange={handleInputChange}
                    type={type}
                    position={index}
                    maxlength="255"
                    noborder={true}
                    money={true}
                />
                <p className="text-title">URL</p>
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
            <div className="section-control">
                {
                    index != (last - 1) && <span className="btn-remove" onClick={e => handleRemove(index, type)}>削除</span>
                }
                {
                    index == (last - 1) && <span className="btn-add" onClick={e => handleAdd(type)}>材料追加</span>
                }
            </div>
        </div>
    )
}

export default ToolList
