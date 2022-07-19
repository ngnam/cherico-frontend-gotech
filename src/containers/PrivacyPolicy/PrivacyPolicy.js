import React from 'react'
import Header from 'components/Header'
import Footer from 'components/Footer'
import css from './styles.scss'

export default function PrivacyPolicy() {
  return (
    <div className={`recipe ${css.class}`}>
      <Header />
      <div className="content-box">
        <div className="content-box">
          <h2>プライバシーポリシー</h2>
          <p>
            当社は、お客さまから取得した個人情報を適正に管理し利用することが、当社に課せられた社会的責務と認識し、次のとおり個人情報保護方針を定め、お客さまの個人情報の保護に全力で取り組んでまいります。
          </p>
          <h3>1. 個人情報の取得・利用・提供</h3>
          <p>
            お客さまから取得した個人情報は、お客さまとのお約束を果たし、より良いサービスを提供するために、その目的の範囲内で利用します。
            また、お客さまの個人情報は、お客さまの同意を得ないで、第三者には提供いたしません。
          </p>
          <h3>2. 個人情報の適正管理</h3>
          <p>
            お客さまの個人情報に紛失・破壊・改ざん・漏洩・不正アクセス等が生じないようにセキュリティ対策を講じて適正に管理します。
          </p>
          <h3>3. 個人情報に関する法令等の遵守</h3>
          <p>お客さまの個人情報に関して適用される個人情報保護法などの法令を遵守します。</p>
          <h3>4. 個人情報の取扱いの外部委託</h3>
          <p>
            お客さまの個人情報をお取引やサービス提供のために、その取り扱いを外部に委託することがあります。外部に委託する場合には、適正な取り扱いを確保するための指導を行い、実施状況の報告を受ける等、厳正な管理を行います。
          </p>
          <h3>5. 組織体制</h3>
          <p>
            当社は、グループ各社と連携し内部統制委員会において個人情報保護についての適正な管理を行います。
          </p>
          <h3>6. 開示・訂正等</h3>
          <p>
            当社が保有している個人データについてお客さまから開示・訂正等を求められたときは、所定の手続きに従って対応いたします。
          </p>
          <h2>特定個人情報の適正な取扱いに関する基本方針</h2>
          <p>
            当社は、特定個人情報等を適正に管理し利用することが、当社に課せられた社会的責務と認識し、次のとおり特定個人情報保護方針を定め、特定個人情報等の保護に全力で取り組んでまいります。
          </p>
          <h3>1. ◆関係法令、ガイドライン等の遵守</h3>
          <p>
            当社は、特定個人情報の取扱いに関する関係法令、国が定めるガイドラインその他の規範を遵守します。
          </p>
          <h3>2. ◆安全管理措置に関する組織体制の確立</h3>
          <p>
            当社は事業の内容および規模を考慮した特定個人情報の適正な取扱いのための組織管理体制を確立します。
          </p>
          <h3>3. ◆安全管理措置の実施</h3>
          <p>
            当社は、特定個人情報の取得、利用、保存、提供、削除・廃棄に際しては所定の規程等を遵守し、適正な取扱いを実施するために十分な措置を講じます。
          </p>
          <h3>4. ◆質問および苦情処理の窓口</h3>
          <p>
            当社は、特定個人情報の苦情や相談に関する窓口を設け、適切かつ迅速に対応し、問題の解決を図るように努めます。
          </p>
          <h2>個人データおよび特定個人情報に関する開示などの手続きについて</h2>
          <p>
            当社が保有している個人データおよび特定個人情報に関しての開示・訂正等の手続きは、以下によりお受けいたします。
          </p>
          <h3>
            1.
            開示・訂正等の請求にあたっては書面によるお申し込みをいただいたうえ、ご本人であることが確認できた場合に限り対応させていただきます。
          </h3>
          <h3>2. お問い合わせ先:</h3>
          <p>
            {`〒140-0013
東京都品川区南大井6丁目22番7号 大森ベルポートE館
DCMホールディングス株式会社
(TEL: 03-5764-5211)
なお、グループ各社に対する手続きは個別に各社あてご連絡下さい。
お問合せ先は、各社のホームページをご覧下さい。`}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}