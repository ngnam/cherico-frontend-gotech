import React from 'react'
import css from './styles.scss'
import TextInput from 'components/TextInputV3'

function RecipeInfo({ className, info, handleInputChange }) {

    return (
        <div className={`${css.class} ${className || ''}`}>
            <p className="main-title-block">レシピの情報</p>
            <div className="section-content-block">
                <p className="text-title">所要時間</p>
                <TextInput
                    required={false}
                    multiline={false}
                    name="required_time"
                    placeholder="例）1時間"
                    errorMsg={info.e_r}
                    value={info.required_time}
                    onChange={handleInputChange}
                    type="main"
                    position="0"
                    maxlength="255"
                    noborder={true}
                />
                <p className="text-title">総費用</p>
                <TextInput
                    required={false}
                    multiline={false}
                    name="cost"
                    placeholder="自動計算"
                    errorMsg={info.e_c}
                    value={info.cost}
                    onChange={handleInputChange}
                    position="0"
                    type="main"
                    maxlength="255"
                    noborder={true}
                />
                <p className="text-title">業者に発注した場合の金額</p>
                <TextInput
                    required={false}
                    multiline={false}
                    name="vendor_cost"
                    placeholder="0"
                    errorMsg={info.e_v}
                    value={info.vendor_cost}
                    onChange={handleInputChange}
                    type="main"
                    position="0"
                    maxlength="255"
                    noborder={true}
                    money={true}
                />
            </div>
        </div>
    )
}

export default RecipeInfo
