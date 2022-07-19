import React from 'react'
import { Link } from 'react-router-dom'

import css from './styles.scss'

const screens = [
  {
    name: 'サービストップ',
    path: '/',
  },
  {
    name: 'ログイン',
    path: '/login',
  },
  {
    name: 'レシピ',
    path: '/recipe',
  },
  {
    name: 'レシピ・お困り',
    path: '/recipe-trouble',
  },
  {
    name: 'お困り・投稿',
    path: '/trouble-input',
  },
  {
    name: 'コメント投稿',
    path: '/post-comment',
  },
  {
    name: 'カテゴリートップ',
    path: '/category',
  },
  {
    name: 'メール確認（メールのリンクからの遷移画面）',
    path: '/confirm-signup?code=1111&email=dummyuser@example.com',
  },
  {
    name: 'ユーザー登録',
    path: '/user-registration',
  },
  {
    name: 'パスワードリセット依頼',
    path: '/password-reset-request',
  },
  {
    name: 'パスワード設定（メールのリンクからの遷移画面）',
    path: '/password-reset?code=1111&email=dummyuser@example.com',
  },
  {
    name: 'プロフィール詳細',
    path: '/profile/123',
  },
  {
    name: 'プロフィール設定',
    path: '/profile/setting',
  },
  {
    name: 'プロフィールフォロー',
    path: '/profile/follow',
  },
  {
    name: 'プロフィール登録',
    path: '/profile/registration',
  },
  {
    name: '検索',
    path: '/search-results/garden',
  },
  {
    name: '問い合わせ',
    path: '/contact',
  },
]

function Sample() {
  const Links = screens.map((s, index) => (
    <p key={index}>
      <Link to={s.path}>{s.name}</Link>
    </p>
  ))
  return (
    <div className={`sample ${css.class}`}>
      <div className="body">
        <h1>画面一覧</h1>
        {Links}
      </div>
    </div>
  )
}

export default Sample
