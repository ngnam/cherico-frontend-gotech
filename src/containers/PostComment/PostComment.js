import React from 'react'

import Header from 'components/Header'
import Button from 'components/Button'
import Footer from 'components/Footer'

import css from './styles.scss'

export default function PostComment({ isHiddenActions }) {
  return (
    <div className={`post-comment ${css.class}`}>
      <Header isHiddenActions={isHiddenActions} />
      <section className="content-box text-break comments">
        <div className="d-flex align-center space-between">
          <div className="title">コメントを投稿する</div>
        </div>
        <div className="comment-input d-flex direction-column align-center">
          <textarea placeholder="コメントを入力してください"></textarea>
          <Button varient="default">コメントを投稿する</Button>
        </div>
        <div className="d-flex align-center space-between">
          <div className="title">
            コメント<span className="count">2件</span>
          </div>
        </div>
        <div className="comment-list">
          <div className="comment-item">
            <div className="inner">
              <div className="d-flex">
                <div className="avatar">
                  <img src="/assets/user@2x.png" alt="ユーザー" />
                </div>
                <div className="comment-content">
                  <div className="text">
                    本当に簡単にできました！最高です。ほんとうに簡単にっていうのがわたしにぴったりでし...
                  </div>
                  <div className="info">
                    <a href="#">のぞみ</a>
                    <span className="timestamp">20XX年3月4日 10:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="comment-item right-after">
            <div className="inner">
              <div className="d-flex">
                <div className="comment-content">
                  <div className="text">
                    本当に簡単にできました！最高です。ほんとうに簡単にっていうのがわたしにぴったりでし...
                  </div>
                  <div className="info">
                    <a href="#">のぞみ</a>
                    <span className="timestamp">20XX年3月4日 10:00</span>
                  </div>
                </div>
                <div className="avatar">
                  <img src="/assets/user@2x.png" alt="ユーザー" />
                </div>
              </div>
              <div className="delete">削除</div>
            </div>
          </div>
          <div className="comment-item">
            <div className="inner">
              <div className="d-flex">
                <div className="comment-content">
                  <div className="text">
                    本当に簡単にできました！最高です。ほんとうに簡単にっていうのがわたしにぴったりでし...
                  </div>
                  <div className="info">
                    <a href="#">のぞみ</a>
                    <span className="timestamp">20XX年3月4日 10:00</span>
                  </div>
                </div>
                <div className="avatar">
                  <img src="/assets/user@2x.png" alt="ユーザー" />
                </div>
              </div>
              <div className="delete">削除</div>
            </div>
          </div>
        </div>
        <div className="back-button d-flex justify-center">
          <Button varient="default">前のページに戻る</Button>
        </div>
      </section>
      <Footer />
    </div>
  )
}
