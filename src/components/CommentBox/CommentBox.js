import React, { useState } from 'react'
import { setImageHost } from 'service/image'
import useAuth from 'hooks/useAuth'
import useRequest from 'hooks/useRequest'
import useHeader from 'hooks/useHeader'

import LoginConfirmModal from 'components/LoginConfirmModal'

import css from './styles.scss'

function CommentBox({ value, postComment, inputChange, user }) {
  const header = useHeader()
  const [userInfo, setUserInfo] = useState(false)
  const { state: authState } = useAuth()
  const { request } = useRequest()

  async function fetchData() {
    if (user) {
      setUserInfo(user)
    } else if (authState.user) {
      const userInfo = await request({
        url: `/users/${authState.user.username}`,
      })
      setUserInfo(userInfo.data)
    }
  }

  React.useEffect(() => {
    if (!authState.authChecked) {
      return
    }

    fetchData()
  }, [authState.authChecked])

  const textarea = document.querySelector('textarea')
  if (value.length > 0) {
    textarea.addEventListener('keyup', autosize)
  }

  function handlePostComment() {
    if(userInfo !== false) {
      postComment()
    } else {
      header.openLoginModal()
    }
  }

  function autosize() {
    const el = this
    if (el.scrollHeight < 148) {
      setTimeout(() => {
        el.style.cssText = `height:auto`
        el.style.cssText = `height: ${el.scrollHeight}px`
      }, 0)
    }
  }
  return (
    <div className={`comment-box ${css.class} d-flex`}>
      <div className="left">
        {userInfo?.profile?.image_file_name ? (
          <img src={setImageHost(userInfo.profile.image_file_name)} />
        ) : (
            <div className="dummy-avatar">
              <img src="/assets/user-avatar.png" />
            </div>
          )}
      </div>
      <div className="right">
        <textarea
          className={`${value.length > 0 ? '' : 'row-1'}`}
          placeholder="コメントを入力してください"
          name="comment"
          rows="1"
          value={value}
          onChange={(e) => inputChange(e)}
        />
        <span className={`btn-comment ${value.length > 0 ? 'active' : ''}`} onClick={handlePostComment}>投稿</span>
      </div>
      <LoginConfirmModal />
    </div>
  )
}

export default CommentBox
