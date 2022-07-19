import React from 'react'
import TextInput from 'components/TextInput'

import CameraFill from 'images/icons/camera-fill.svg'
import CrossIcon from 'images/icons/cross.svg'
import css from './styles.scss'

export default function RecipePoint({x, i, type, handleInputChange, handleAddAdvice, handleStepImage}) {
  return (
    <div className={`recipe-point ${css.class}`}>
      <a className="close" onClick={() => handleAddAdvice(i, type, false)}>
        <CrossIcon />
      </a>
      <div className="photo">
        <div className="d-flex direction-column align-center">
          <div className="photo-placeholder d-flex align-center justify-center">
              {
                  x.advice.image_file_name ? (<img src={process.env.IMAGE_HOST + '/' + x.advice.image_file_name} />) : (<CameraFill />)
              }
          </div>
          <span className="add-photo-link action-link">
            写真を追加する
              <input type="file" onChange={e => handleStepImage(e, i, type)}/>
          </span>
        </div>
      </div>
      <div className="input-field">
        <TextInput
          label="ポイントタイトル"
          name="title"
          placeholder="例）木製の丸イス"
          errorMsg={x.advice.e_t}
          showError={x.advice.e_t}
          value={x.advice.title}
          onChange={e => handleInputChange(e, i, type)}
          maxlength="50"
        />
      </div>
      <div className="description">
        <TextInput
          label="説明"
          multiline={true}
          name="description"
          placeholder="例）はじめに全ての部材をカットします。"
          value={x.advice.description}
          onChange={e => handleInputChange(e, i, type)}
          errorMsg={x.advice.e_d}
          showError={x.advice.e_d}
          maxlength="999"
        />
      </div>
    </div>
  )
}
