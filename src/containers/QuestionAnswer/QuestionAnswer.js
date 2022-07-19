import React, { useState } from 'react'

import Header from 'components/Header'
import Footer from 'components/Footer'
import ArrowBottom from 'images/icons/arrow-bottom.svg'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import css from './styles.scss'

export default function QuestionAnswer() {
  const [open, setOpen] = useState([])

  const handleOpen = (n) => {
    const newOpen = [...open]
    newOpen[n] = !newOpen[n]
    setOpen(newOpen)
  }
  return (
    <div className={`recipe ${css.class}`}>
      <Header />
      <div className="content-box">
        <div className="content-box">
          <h1>よくある質問</h1>
          <div className={`content-title ${open[1] ? 'active' : ''}`}>
            <h2 onClick={() => handleOpen(1)}>
              ミラテオ全般について
              <ArrowBottom className="icon" />
            </h2>
            <ul>
              <li>
                <span>Q</span>
                <AnchorLink offset="80" href="#q-1">
                  ミラテオってどんなサイトですか？
                </AnchorLink>
              </li>
              <li>
                <span>Q</span>
                <AnchorLink offset="80" href="#q-2">
                  ミラテオってどういう意味ですか？
                </AnchorLink>
              </li>
              <li>
                <span>Q</span>
                <AnchorLink offset="80" href="#q-3">
                  スマートフォンに対応していますか？
                </AnchorLink>
              </li>
            </ul>
          </div>

          <div className={`content-title ${open[2] ? 'active' : ''}`}>
            <h2 onClick={() => handleOpen(2)}>
              利用者登録・解除について
              <ArrowBottom className="icon" />
            </h2>
            <ul>
              <li>
                <span>Q</span>
                <AnchorLink offset="80" href="#q-4">
                  利用者登録をすると、どんなことができますか？
                </AnchorLink>
              </li>
              <li>
                <span>Q</span>
                <AnchorLink offset="80" href="#q-5">
                  登録にお金はかかりますか？また年会費はかかりますか？
                </AnchorLink>
              </li>
            </ul>
          </div>

          <div className={`content-title ${open[3] ? 'active' : ''}`}>
            <h2 onClick={() => handleOpen(3)}>
              記事投稿について
              <ArrowBottom className="icon" />
            </h2>
            <ul>
              <li>
                <span>Q</span>
                <AnchorLink offset="80" href="#q-6">
                  投稿できる記事の種類について教えてください。
                </AnchorLink>
              </li>
            </ul>
          </div>

          <div className={`content-title ${open[4] ? 'active' : ''}`}>
            <h2 onClick={() => handleOpen(4)}>
              コメント投稿について
              <ArrowBottom className="icon" />
            </h2>
            <ul>
              <li>
                <span>Q</span>
                <AnchorLink offset="80" href="#q-7">
                  投稿できるコメントの種類について教えてください。
                </AnchorLink>
              </li>
            </ul>
          </div>
          <h3>基本的な使い方について</h3>
          <div id="q-1" className="content-body">
            <p className="question">
              <span>Q</span>ミラテオってどんなサイトですか？
            </p>
            <p>
              <span>A</span>
              {`「ミラテオ」はDCMホールディングス株式会社が運営する、DIY（Do it Yourself)に特化したキュレーションサイトです。

日常生活の中でよくある、
◆「困った！」が解決するアイデアや豆知識
◆「作りたい！」を叶えるレシピ
◆「学びたい！」情報
がサイト内に沢山ございます。

DIYにより日々の暮らしが楽しく快適になる、心が豊かになる、新しい自分のライフスタイルが見つかる・・・それらが実現するためのアイデアや知恵をこの「ミラテオ」で詳しく・丁寧に紹介し、大きな驚きと感動をみなさまにお届けします。`}
            </p>
          </div>

          <div id="q-2" className="content-body">
            <p className="question">
              <span>Q</span>ミラテオってどういう意味ですか？
            </p>
            <p>
              <span>A</span>
              {`サイトの思いを表す造語です。
ラテン語で驚きを意味するMiratio。
皆さんに驚きを提供するとともに、未来(Mira)まで、永く多くのユーザーと手を（ｔeo)つなぎ寄り添っていきたいとの思いを込めてミラテオ(Mirateo)と名付けました。`}
            </p>
          </div>

          <div id="q-3" className="content-body">
            <p className="question">
              <span>Q</span>スマートフォンに対応していますか？
            </p>
            <p>
              <span>A</span>
              {`iPhoneやアンドロイドなどのスマートフォンに対応しています。
スマートフォンの画面サイズに最適な横幅で表示されますので、快適にサイトをお楽しみ頂けます。`}
            </p>
          </div>

          <h3>利用者登録・解除について</h3>
          <div id="q-4" className="content-body">
            <p className="question">
              <span>Q</span>利用者登録をすると、どんなことができますか？
            </p>
            <p>
              <span>A</span>
              {`利用者登録をすると各種投稿機能を使用することが可能になります。
・「DIYレシピ」「お困り」への記事投稿
・コメント投稿`}
            </p>
          </div>

          <div id="q-5" className="content-body">
            <p className="question">
              <span>Q</span>登録にお金はかかりますか？また年会費はかかりますか？
            </p>
            <p>
              <span>A</span>
              {`登録料・年会費等全て無料です。`}
            </p>
          </div>

          <h3>記事投稿について</h3>
          <div id="q-6" className="content-body">
            <p className="question">
              <span>Q</span>投稿できる記事の種類について教えてください。
            </p>
            <p>
              <span>A</span>
              {`「DIYレシピ」と「お困り」のカテゴリーで記事を投稿して頂けます。
「DIYレシピ」
自分で実際にやってみたDIYについての投稿を募集しています。
その際、材料・寸法・作り方等、写真を織り交ぜながら分かりやすい記事構成をお願いします。
また、ご自身の腕前や作品を披露する場としてもとても有効です。
「お困り」
汚れが落ちない、破れた、壊れたなど日常の生活で目にするお困りについて、「こんな風にするのがオススメ」、「自分はこうしてますよ！」等の解決方法、裏技、豆知識等の投稿を募集しています。`}
            </p>
          </div>

          <h3>コメント投稿について</h3>
          <div id="q-7" className="content-body">
            <p className="question">
              <span>Q</span>投稿できるコメントの種類について教えてください。
            </p>
            <p>
              <span>A</span>
              {`掲載されている記事に対してコメント投稿が可能です。
記事に対しての質問や、質問に対しての回答、実際に試してみての感想や体験した面白エピソード等のコメントを募集しています。`}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
