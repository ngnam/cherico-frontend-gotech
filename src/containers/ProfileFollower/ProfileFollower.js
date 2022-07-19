import React from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'

import useAuth from 'hooks/useAuth'
import useRequest from 'hooks/useRequest';
import { setImageHost } from 'service/image'

import Header from 'components/Header'
import Footer from 'components/Footer'

import FollowButton from 'components/FollowButton'
import Label from 'components/Label'
import IconNoUser from 'images/icons/no-user.svg'

import css from './styles.scss'


export default function ProfileFollower() {
    const { state: authState } = useAuth();
    const { request } = useRequest();
    const history = useHistory();
    const [items, setItems] = React.useState([]);
    const { userId } = useParams();
    const [showAction, setShowAction] = React.useState(false);



    function User({ user, owner }) {



        const handleFollow = async (userId) => {
            if (!authState.user) {
                history.push("/login");
                return;
            }
            await request({
                url: `/users/${userId}/follow`,
                method: "put",
            }).catch((err) => console.log("error", err));

            var newItems = items.map((item, index) => {
                return item.user_id === userId ? { ...item, is_followed: true } : item
            })

            setItems(newItems);

        };

        const handleUnFollow = async (userId) => {
            if (!authState.user) {
                history.push("/login");
                return;
            }

            await request({
                url: `/users/${userId}/follow`,
                method: "delete",
            }).catch((err) => console.log("error", err));

            var newItems = items.map((item, index) => {
                return item.user_id === userId ? { ...item, is_followed: false } : item
            })
            setItems(newItems);


        };



        return (
            <div className="content wrap-user test">
                <div className="row">
                    <div className="user">
                        <div className="user-info">
                            {
                                user.image_file_name ? (
                                    <img src={`${setImageHost(user.image_file_name)}`} alt="ユーザー" />
                                ) : (
                                        <img src="/assets/user-avatar.png" alt='no_image' />
                                    )
                            }
                            <span className="user-name">{user.nickname} </span>
                            {/*<Label className="official">公式</Label>*/}
                        </div>
                        {
                            (authState.user.username != user.user_id) && (user.is_followed
                                ? <div className="follow-action">
                                    <FollowButton onClick={() => (handleUnFollow(user.user_id))} className="on">フォロー中</FollowButton>
                                </div>
                                : <div className="follow-action">
                                    <FollowButton onClick={() => (handleFollow(user.user_id))} className="">フォロー</FollowButton>
                                </div>)
                        }



                    </div>
                </div>
                <div className="row">
                    <div className="receipt-list">
                        <ul>
                            {
                                user.thumbnails && user.thumbnails.map((v, i) => {
                                    return (
                                        v && <li className="receipt" key={i}>
                                            <a className="link" href="#">
                                                <img src={`${setImageHost(v)}`} alt='no_image' className={`img-receipt`} />
                                            </a>
                                        </li>
                                    );
                                })
                            }

                        </ul>
                    </div>
                </div>
            </div>
        )
    }



    function NoUser() {
        return <div>
            <h1 className="no-data" >フォロー中のユーザーがいません</h1>
            <div className="icon-no-user"> <IconNoUser /></div>
        </div>
    }

    async function fetchData() {
        if (authState.user) {
            if (authState.user.username == userId) {
                setShowAction(true);
            }
            let result = await request({ url: `/users/${userId}/followers` });
            if (result.meta.code == 200 && result.data != null && result.data.followers != null) {
                setItems(result.data.followers);
            }
        } else {
            history.push('/')
        }
    };

    React.useEffect(() => {
        if (!authState.authChecked) {
            return;
        }

        fetchData();
    }, [authState.authChecked]);


    return (
        <div className={`profile-follow ${css.class}`}>
            <Header></Header>
            <div className="page-title">フォロワーのユーザー</div>
            {
                items.length > 0
                    ? (items.map((v, i) => {
                        return <User key={i} user={v} owner={showAction} />;
                    }))
                    : <NoUser />
            }
            <Footer></Footer>
        </div>
    )
}
