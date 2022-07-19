import React from 'react'
import Button from 'components/Button'
import ChevronDown from 'images/icons/chevron-down.svg'
import ChevronUp from 'images/icons/chevron-up.svg'
import css from './input-list.scss'

export default function InputList({x, i, type, handleInputChange, handleRemoveClick, handleAddClick, last, rearrangeStep}) {
  return (
      <div>
          <div className={`input-list ${css.class}`}>
              <div className="input-row d-flex space-between">
                  <div className="label pre-wrap">{`・材料名`} {x.e_n && <span className='text-danger'>（20文字）</span>}</div>
                  <div className="input-field d-flex align-center">
                      <input type="text" maxLength="19" placeholder="例）木材（20文字）" name="name" value={x.name} onChange={e => handleInputChange(e, i, type)} />
                  </div>
              </div>
              <div className="input-row d-flex space-between">
                  <div className="label pre-wrap">{`・数量`} {x.e_q && <span className="text-danger">(数値が必要)</span>}</div>
                  <div className="input-field d-flex align-center">
                      <input type="text" placeholder={type === 'tool'? '例）1' : '例）2'} name="qty" value={x.qty} onChange={e => handleInputChange(e, i, type)} />
                  </div>
              </div>
              <div className="input-row d-flex space-between">
                  <div className="label pre-wrap">{`・金額（税抜き）`} {x.e_p && <span className="text-danger">(数値が必要)</span>}</div>
                  <div className="input-field d-flex align-center">
                      <div className="input-field-price">
                          <input className={x.price ? "active": ""}type="text" placeholder={type === 'tool' ? '例）500円' : '例）100円'} name="price" value={x.price} onChange={e => handleInputChange(e, i, type)} />
                          {x.price ? <span>円</span> : ""}
                      </div>
                  </div>

              </div>
              <div className="input-row d-flex space-between">
                  <div className="label pre-wrap">{`・URL`} {x.e_u && <span className="text-danger">(数値が必要)</span>}</div>
                  <div className="input-field d-flex align-center">
                      <input type="text" placeholder="https://mirateo.jp" name="url" value={x.url} onChange={e => handleInputChange(e, i, type)} />
                  </div>
              </div>
          </div>
          <div className="actions-input">
              <div className="space-between align-center">
                  <div className="change-order">
                      {
                          i == 0 ? (
                              <span> </span>
                          ) : (
                              <button  onClick={() => rearrangeStep(i, type, -1)}>
                                  <ChevronUp/>
                              </button>
                          )
                      }
                      {
                          i === last ? (
                              <span> </span>
                          ) : (
                              <button onClick={() => rearrangeStep(i, type, 1)}>
                                  <ChevronDown/>
                              </button>
                          )
                      }
                  </div>
              </div>
          </div>
          <div className="add-item-action w100 d-flex justify-center">
              {
                  i !== 0 ? (
                      <Button varient="default" className="delete-material" onClick={() => handleRemoveClick(i, type)}>
                          <span>削除する</span>
                      </Button>
                  ) : (
                      <span> </span>
                  )
              }
              {
                  i === last ? (
                      <Button varient="default" className="add-material" onClick={() => handleAddClick(type)}>
                          {
                              type === 'material' ?
                                  (<span>材料を追加する</span>)
                                  :
                                  (<span>工具・道具を追加する</span>)
                          }
                      </Button>
                  ) : (
                      <span> </span>
                  )
              }
          </div>
      </div>
  )
}
