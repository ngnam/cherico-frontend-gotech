import React from 'react'
import TextInput from 'components/TextInput'

import ChevronDown from 'images/icons/chevron-down.svg'
import ChevronUp from 'images/icons/chevron-up.svg'
import CameraFill from 'images/icons/camera-fill.svg'
import Button from 'components/Button'
import css from './styles.scss'

export default function RecipeStep({x, i, type, handleInputChange, handleRemoveClick, last, handleAdd, handleStepImage, handleAddAdvice, rearrangeStep, postType}) {
    return (
        <div className={`recipe-step ${css.class}`}>
            <div className="input-field">
                <TextInput
                    label="見出し"
                    name="title"
                    placeholder={type === 'reason' || (type === 'solution' && postType == 2) ? "例）気になる壁のキズやはがれ" : "例）壁紙のはがれが起きる原因"}
                    errorMsg={x.e_t}
                    showError={x.e_t}
                    value={x.title} onChange={e => handleInputChange(e, i, type)}
                    maxlength="50"
                />
            </div>
            <div className="input-field">
                <TextInput
                    label="小見出し"
                    name="sub_title"
                    placeholder={type === 'reason' || (type === 'solution' && postType == 2) ? "例）小さなキズを補修する場合" : "例）1.ビニール製の壁紙は衝撃に弱い"}
                    errorMsg={x.e_s}
                    showError={x.e_s}
                    value={x.sub_title} onChange={e => handleInputChange(e, i, type)}
                    maxlength="50"
                />
            </div>
            <div className="photo">
                <div className="d-flex direction-column align-center">
                    <div className="photo-placeholder d-flex align-center justify-center">
                        {
                            x.image_file_name ? (<img src={process.env.IMAGE_HOST + '/' + x.image_file_name}/>) : (
                                <CameraFill/>)
                        }
                    </div>
                    <span className="add-photo-link action-link">
                        写真を追加する
                        <input type="file" onChange={e => handleStepImage(e, i, type)}/>
                    </span>
                </div>
            </div>
            <div className="input">
                <TextInput
                    label="説明（任意）"
                    multiline={true}
                    name="description"
                    placeholder={type === 'reason' || (type === 'solution' && postType == 2) ? "例）壁紙は、自分で簡単に補修することができます。" : "ビニール製の壁紙は、はがれやすいという弱点があります。"}
                    errorMsg={x.e_d}
                    showError={x.e_d}
                    value={x.description} onChange={e => handleInputChange(e, i, type)}
                    maxlength="999"
                />
            </div>
            <div className="actions">
                <div className="d-flex space-between align-center">
                    <div className="add-point d-flex">
                        {
                            x.advice.check ? (
                                <span> </span>
                            ) : (
                                <span className="action-link ml" onClick={() => handleAddAdvice(i, type, true)}>
                          <img src={"/assets/icon_plus.png"}/>
                          ポイントを追加する
                      </span>
                            )
                        }
                    </div>
                    <div className="change-order d-flex">
                        {
                            i == 0 ? (
                                <span> </span>
                            ) : (
                                <button className="d-flex" onClick={() => rearrangeStep(i, type, -1)}>
                                    <ChevronUp/>
                                </button>
                            )
                        }
                        {
                            i === last ? (
                                <span> </span>
                            ) : (
                                <button className="d-flex" onClick={() => rearrangeStep(i, type, 1)}>
                                    <ChevronDown/>
                                </button>
                            )
                        }
                    </div>
                </div>
                <div className="d-flex justify-center buttons">
                    {
                        i !== 0 ? (
                            <Button className="delete-step" onClick={() => handleRemoveClick(i, type)}>削除する</Button>
                        ) : (
                            <span> </span>
                        )
                    }
                    {last === i ? (
                        <Button className="add-step" varient="default" onClick={() => handleAdd(type)}>
                            ステップを追加する
                        </Button>
                    ) : (
                        <span> </span>
                    )
                    }
                </div>
            </div>
        </div>
    )
}
