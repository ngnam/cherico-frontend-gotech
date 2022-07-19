import React from 'react'
import { Link } from 'react-router-dom'
import { setImageHost } from 'service/image'
import FollowButton from 'components/FollowButton'
import css from './styles.scss'

function Author({ user, owner, detail }) {
    if (!user) {
        return null
    }

    return (
        <div>
            <section className={`author ${css.class}`}>
                <div className="user-info d-flex align-center">
                    <Link to={`/profile/${user?.id}`} className="link">
                        <div className="photo">
                            {user?.profile?.image_file_name ? (
                                <img src={setImageHost(user.profile.image_file_name)} />
                            ) : (
                                <div className="dummy-avatar">
                                    <img src="/assets/user-avatar.png" />
                                </div>
                            )}
                        </div>
                    </Link>
                    <Link to={`/profile/${user?.id}`} className="link">
                        <div className="name">{user.nickname}</div>
                    </Link>
                </div>
                {
                    !owner && <div className="actions d-flex align-center">
                        <FollowButton>フォロー</FollowButton>
                    </div>
                }
                {
                    user?.profile?.introduction && detail ? <div className="introduction">{user.profile.introduction}</div> : ''
                }
                {
                    detail && <div className="summary-user-info">
                        <p className="summary-title">記事の感想</p>
                        <p className="summary-description">
                            ちょっとしたキズがあると退去時に補修代を請求されることが気になり、キズを見るたびにどうしようかなぁって思ってました。だからと言って、同じ色の補修用クロスを探すのは大変だし。コンセントタップの裏から補修用クロスを切り取る方法は目からうろこでした。<br/>
                            ポイントは、補修用クロスと壁紙を一緒に切る方法、これは補修用クロスがぴったりとはまりやすいので、初心者でも失敗しにくい方法ですね。思った以上にきれいに仕上がり大満足です。
                        </p>
                    </div>
                }
            </section>

        </div>
    )
}

export default Author
