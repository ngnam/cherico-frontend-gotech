import React from 'react'

import css from './register-success.scss'

export default function UserRegistration() {
  return (
    <div className={`register-success ${css.class}`}>
      <div className="heading">
        <h1 className="title">登録されたメールアドレス宛にURLを送信しました。</h1>
        <p className="message">
          <strong>mirateo@co.jp</strong>
          へ受信確認用のメールを送信しました。 メールを確認いただき、メールに記載されたURLから、
          新規登録のお手続きに進んでください。
        </p>
      </div>
      <div className="body">
        <h2 className="title">メールが届かない場合</h2>
        <p className="message">受信確認のメールアドレスが届かない場合、下記を確認ください。</p>
        <p className="message">
          ・迷惑メールフォルダに振り分けられていたり、フィルターの設定によって受信ボックス以外の場所に保管されていないかご確認ください。
        </p>
        <p className="message">
          ・メールの配信に時間がかかる場合がございます。数分程度待った上で、メールが届いているか再度ご確認ください。
        </p>
        <p className="message">
          ・登録にご使用したメールアドレス
          mirateo@co.jpが正しいかどうか確認してください。正しくない場合は、メールアドレスを再設定してください。
        </p>
      </div>
    </div>
  )
}
