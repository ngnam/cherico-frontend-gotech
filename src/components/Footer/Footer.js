import React from 'react'

import Logo from 'images/logo.svg'
import { Link } from 'react-router-dom'
// import Twitter from 'images/twitter.svg'
// import Facebook from 'images/facebook.svg'
// import Instagram from 'images/instagram.svg'
// import Line from 'images/line.svg'

import css from './styles.scss'

function Footer({ className }) {
  return (
    <footer className={`footer ${css.class} ${className || ''}`}>
      <div className="row">
        <div className="col">
          <div className="content">
            <Link className="link" to="/">
              <span>ホーム</span>
            </Link>
            <Link className="link" to="/category">
              <span>カテゴリー</span>
            </Link>
            <Link className="link" to="/inquiry">
              <span>お問い合わせ</span>
            </Link>
            <a
              className="link"
              href="https://www.dcm-hldgs.co.jp/company/company/"
              target="_blank"
              rel="noreferrer"
            >
              <span>会社情報（運営会社）</span>
            </a>
            <Link className="link" to="/policy">
              <span>利用規約</span>
            </Link>
            <Link className="link" to="/privacy-policy">
              <span>プライバシーポリシー</span>
            </Link>
            <Link className="link" to="/question-answer">
              <span>よくある質問</span>
            </Link>
          </div>
        </div>
        <div className="col right">
          <div className="content">
            {/* <div className="sns-list">
              <a href="#" className="sns">
                <Twitter />
              </a>
              <a href="#" className="sns">
                <Facebook />
              </a>
              <a href="#" className="sns">
                <Instagram />
              </a>
              <a href="#" className="sns">
                <Line />
              </a>
            </div> */}
            <div className="logo">
              <Logo></Logo>
            </div>
          </div>
        </div>
      </div>
      <div className="row"></div>
    </footer>
  )
}

export default Footer
