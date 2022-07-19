import React from 'react'

import css from './styles.scss'

function Modal({article, handleEdit, handleDraft, handleCopy, handleDelete, handleCloseModal }) {
  return (
    <div className={`${css.class}`}>
      <div className="popup-box">
        <div className="box-action">
          <div className={`content-box`}>
            <div className={`button`} onClick={() => handleEdit(article)}>編集</div>
            <div className="border-top"></div>
            <div className={`button`} onClick={() => handleDraft(article)}>下書きに戻す</div>
            <div className="border-top"></div>
            <div className={`button`} onClick={() => handleCopy(article)}>URLをコピー</div>
            <div className="border-top"></div>
            <div className={`button button-delete`} onClick={() => handleDelete(article)}>削除</div>
          </div>
        </div>
        <div className="box-close">
          <div className={`button`} onClick={() => handleCloseModal()}>キャンセル</div>
        </div>
      </div>
    </div>
  )
}

export default Modal
