import React from 'react'
import { useHistory } from 'react-router-dom'
import Button from 'components/Button'
import useHeader from 'hooks/useHeader'

import css from './styles.scss'

function PostConfirmModal({ className }) {
  const header = useHeader()
  const history = useHistory()
  function handleClose(event) {
    event.preventDefault()
    close()
  }

  function close() {
    header.closePostModal()
  }

  if (!header.state.postModalOpen) {
    return null
  }

  return (
    <div className={`post-confirm-modal ${css.class} ${className || ''}`}>
      <div className="overlay" onClick={handleClose}></div>
      <div className="modal">
        <div className="modal-title">レシピを投稿しましょう</div>
        <div className="modal-content">
          <div className="modal-image">
            <img src="/assets/recipe-post.png" />
          </div>
          <div className="modal-actions">
            <div className="post">
              <Button
                onClick={() => {
                  close()
                  history.push('/trouble-input')
                }}
              >
                レシピを投稿する
              </Button>
            </div>
            <div className="post-from-saved">
              <Button
                varient="default"
                onClick={() => {
                  close()
                  history.push('/draft-list')
                }}
              >
                下書きからレシピを投稿する
              </Button>
            </div>
            <div className="close">
              <a href="#" onClick={handleClose}>
                閉じる
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostConfirmModal
