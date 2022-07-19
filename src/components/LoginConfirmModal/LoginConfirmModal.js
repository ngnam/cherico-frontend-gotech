import React from 'react'
import { useHistory } from 'react-router-dom'
import Button from 'components/Button'
import useHeader from 'hooks/useHeader'

import css from './styles.scss'

function LoginConfirmModal() {
    const header = useHeader()
    const history = useHistory()

    function handleClose(event) {
        event.preventDefault()
        close()
    }

    function close() {
        header.closeLoginModal()
    }

    if (!header.state.loginModalOpen) {
        return null
    }

    return (
        <div className={`post-confirm-modal ${css.class}`}>
            <div className="overlay" onClick={handleClose}></div>
            <div className="modal">
                <div className="modal-title">コメントするには <br/>ログインする必要があります</div>
                <div className="modal-content">
                    <div className="modal-actions">
                        <div className="post">
                            <Button
                                onClick={() => {
                                    close()
                                    history.push('/login', {oldUrl: window.location.href})
                                }}
                            >
                                ログイン
                            </Button>
                        </div>
                        <div className="post-from-saved">
                            <Button
                                varient="btn-adjust"
                                onClick={() => {
                                    close()
                                    history.push('/user-registration')
                                }}
                            >
                                会員登録
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

export default LoginConfirmModal
