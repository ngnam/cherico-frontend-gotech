import React from 'react'

import css from './styles.scss'

function CatchPhrase({ className }) {
  return (
    <div className={`catch-phrase ${css.class} ${className || ''}`}>
      <div className="actions">
      {/*みんなの手作りレシピからお困りごと解決までアイデアいっぱい！< br/>コミュニティーサービス「mirateo -ミラテオ-」*/}
      データ障害のため予定していた記事がアップされていません。< br/>段階的に記事は増加しますので少々お待ちください。
      </div>
    </div>
  )
}

export default CatchPhrase
