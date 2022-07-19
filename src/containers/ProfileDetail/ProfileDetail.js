import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Helmet } from 'react-helmet'
import parse from "date-fns/parse";
import Header from "components/Header";
import Footer from "components/Footer";
import Modal from "components/Modal";
import Label from "components/Label";
import FollowButton from "components/FollowButton";
import TimeAgo from "components/TimeAgo";
import useAuth from "hooks/useAuth";
import useRequest from "hooks/useRequest";
import { setImageHost } from "service/image";
import ChevronRight from "images/icons/chevron-right.svg";
import Setting from "images/icons/setting_outline.svg";
import Person from "images/person-image.svg";
import Heart from "images/icons/heart-s.svg";
import HeartOn from "images/icons/heart-s-on.svg";
import Balloone from "images/icons/balloon.svg";
import BallooneOn from "images/icons/balloon-on.svg";

import css from "./styles.scss";

export default function ProfileDetail() {
  const { request } = useRequest();
  const history = useHistory();
  const { state: authState } = useAuth();
  const [isMyPage, setIsMyPage] = React.useState(false);
  const [profile, setProfile] = React.useState();
  const [post, setPost] = React.useState();
  const [postLiked, setPostLiked] = React.useState();
  const [active, setActive] = React.useState(0);
  const [isFollow, setIsFollow] = React.useState(false);
  const [followerCount, setFollowerCount] = React.useState();
  const [isModal, setIsModal] = React.useState("");
  const { userId } = useParams();
  const ARTICLE_TYPE = {
    POST: 0,
    LIKE: 1,
  };
  React.useEffect(() => {
    if (!userId) {
      return;
    }
    fetchUserPost(userId);
    fetchLikePost(userId);
  }, [userId]);

  React.useEffect(() => {
    if (!authState.authChecked) {
      return;
    }

    if (authState.user) {
      fetchFollower(userId);
    }
    if (authState.user && userId === authState.user.username) {
      setIsMyPage(true);
    }
  }, [authState]);

  const changeFollowerCount = (n) => {
    const count = followerCount + n
    setFollowerCount(count)
  }
  const fetchFollower = async (id) => {
    await request({
      url: `/users/${authState.user.username}/follow`,
    }).then((result) => {
      if (result.data.follows) {
        const userIds = result?.data?.follows.reduce((acc, curr) => {
          acc.push(curr.user_id);
          return acc;
        }, []);
        // ユーザー
        const isFollow = userIds.includes(id);
        setIsFollow(isFollow);
      }
    });
  };

  const fetchLikePost = async (id) => {
    const requestUrl = `/contents/recipes/users/${id}/likes?offset=0&limit=100`;
    const res = await request({
      url: requestUrl,
      method: "get",
    });

    if (res?.data) {
      const datas = res.data
        .map((item) => {
          return { ...item, user: item.user };
        })
        .sort(
          (a, b) =>
            parse(b.updated_at, "yyyy-MM-dd HH:mm:ss", new Date()) -
            parse(a.updated_at, "yyyy-MM-dd HH:mm:ss", new Date())
        );
      setPostLiked(datas);
    } else {
      setPostLiked();
    }
  }
  const fetchUserPost = async (id) => {
    const requestUrl = `/contents/recipes/users/${id}?offset=0&limit=100`;
    const res = await request({
      url: requestUrl,
      method: "get",
    });
    if (res?.data) {


      setProfile(res.data.user);

      setFollowerCount(res.data.user.follower_count)
      const datas =
        res.data.contents &&
        res.data.contents.sort(
          (a, b) =>
            parse(b.updated_at, "yyyy-MM-dd HH:mm:ss", new Date()) -
            parse(a.updated_at, "yyyy-MM-dd HH:mm:ss", new Date())
        );

      setPost(datas);
    }
  };

  const handleActive = (n) => {
    setActive(n);
  };

  const handleFollow = async () => {
    if (!authState.user) {
      history.push("/login");
      return;
    }

    await request({
      url: `/users/${userId}/follow`,
      method: "put",
    }).catch((err) => console.log("error", err));
    setIsFollow(!isFollow);
    changeFollowerCount(1)
  };

  const handleUnFollow = async () => {
    if (!authState.user) {
      history.push("/login");
      return;
    }

    await request({
      url: `/users/${userId}/follow`,
      method: "delete",
    }).catch((err) => console.log("error", err));
    setIsFollow(!isFollow);
    changeFollowerCount(-1)
  };

  const handleOpenModal = (article) => {
    setIsModal(article);
  };

  const handleEdit = (article) => {
    window.location = `/trouble-input/${article.id}/${article.type}`;
  };

  const handleDraft = (article) => {
    const config = {
      method: "put",
      url: `/contents/recipes/${article.type}/${article.id}/draft`,
    };
    request(config).then((res) => {
      if (res.meta.code === 200) {
        alert("成功");
        fetchUserPost(userId);
        setIsModal("");
      } else {
        alert("何かがうまくいかなかった。後でもう一度やり直してください。");
      }
    });
  };

  const handleCopy = (article) => {
    const tempInput = document.createElement("input");
    const domain = window.location.hostname;
    const port = window.location.port;
    tempInput.value = `${domain + (port === 80 || port === 443 ? "" : `:${port}`)
      }/recipe/${article.id}/${article.type}`;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    alert("コピー");
  };
  const handleDelete = (article) => {
    const _confirm = confirm("削除しますか？");
    if (_confirm) {
      const _delete = {
        method: "delete",
        url: `/contents/recipes/${article.type}/${article.id}`,
        headers: {
          "content-type": "application/json",
        },
      };
      request(_delete).then((res) => {
        if (res.meta.code === 200) {
          alert("成功");
          fetchUserPost(userId);
          setIsModal("");
        } else {
          alert("何かが間違っていました。後でもう一度やり直してください。");
        }
      });
    }
  };
  const handleCloseModal = () => {
    setIsModal("");
  };

  function CaptionTypePost(props) {
    var title = '';
    var icon = '';
    console.log(props.content_type);
    switch (props.content_type) {
      case 'dictionaries':
        title = '辞書';
        icon = '/assets/icons/dictionary.svg';

        break;
      case 'news':
        title = 'ニュース';
        icon = '/assets/icons/news.svg';

        break;
      case 'problems':
        title = 'お困りレシピ';
        icon = '/assets/icons/problem.svg';

        break;
      case 'diys':
        title = 'DIYレシピ';
        icon = '/assets/icons/diy.svg';

        break;
      default:
        break;

    }

    return <div className="caption">
      <img src={icon} />
      <span className="text">{title}</span>
    </div>;
  }

  React.useEffect(() => {
    // console.log("profile", profile);
  }, [profile]);
  return (
    <div
      className={`profile-detail ${css.class} ${isModal !== "" ? css.modal : ""
        }`}
    >
        <Helmet>
        <title>mirateo [ミラテオ]｜暮らしを豊かにするコミュニティサービス</title>
        <meta
          name="description"
          content="mirateoは、DIYにより日々の暮らしが楽しく快適になる、心が豊かになる、新しい自分のライフスタイルが見つかる。お困り・DIYのアイデアや知恵・学びを詳しく丁寧に紹介し、大きな驚きと感動をみなさまにお届けします。"
        />
        <meta property="og:locale" content="ja_JP" />
        <meta property="og:title" content="mirateo [ミラテオ]｜暮らしを豊かにするコミュニティサービス" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://mirateo.jp/assets/dummy-banner.png" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:site_name" content="mirateo [ミラテオ]" />
        <meta property="og:description" content="mirateo [ミラテオ]は、DIYの、最大級の、サービスです。" />
      </Helmet>
      <Header />
      <section className="profile">
        <div className="info-row no-border user-image">
          <div className="photo-container">
            <div className="photo">
              {profile?.profile?.image_file_name ? (
                <img
                  className="user-photo"
                  src={`${setImageHost(profile.profile.image_file_name)}`}
                  alt=""
                />
              ) : (
                  <Person />
                )}
            </div>
            {!isMyPage && profile && (
              <div className="follow-action">
                <FollowButton
                  onClick={() => (isFollow ? handleUnFollow() : handleFollow())}
                  className={isFollow ? "on" : ""}
                >
                  {isFollow ? "フォロー中" : "フォロー"}
                </FollowButton>
              </div>
            )}
          </div>
          {isMyPage && profile && (
            <div className="config">
              <Link to="/profile/setting">
                <Setting />
              </Link>
            </div>
          )}
        </div>
        <div className="info-row name no-border">
          {profile?.nickname}
          {profile?.account_type === "offical" && (
            <div className="user-status">
              <Label className="official">公式</Label>
            </div>
          )}
        </div>
        <div className="info-row follows no-border">
          <div className="following">
            <div className="col">
              <label className="label">フォロー中</label>
              <a href={`/profile/follow/${userId}`} className="count">{profile?.follow_count}</a>
            </div>
            <div className="icon">
              <ChevronRight />
            </div>
          </div>
          <div className="followers">
            <div className="col">
              <label className="label">フォロワー</label>
              <a href={`/profile/follower/${userId}`} className="count">{followerCount}</a>
            </div>
            <div className="icon">
              <ChevronRight />
            </div>
          </div>
        </div>
        <div className="info-row introduction">
          {profile?.profile ? profile.profile.introduction : ""}
        </div>
      </section>
      <section className="menu">
        <div className="info-row menus">
          <a
            onClick={() => handleActive(ARTICLE_TYPE.POST)}
            className={`menu-link ${active === ARTICLE_TYPE.POST ? "active" : ""
              }`}
            href="#"
          >
            投稿記事
          </a>

          <a
            onClick={() => handleActive(ARTICLE_TYPE.LIKE)}
            className={`menu-link ${active === ARTICLE_TYPE.LIKE ? "active" : ""
              }`}
            href="#"
          >
            いいねした記事
          </a>

        </div>
      </section>
      <section className="posts">
        <div className="post-count">
          {active === ARTICLE_TYPE.POST
            ? post
              ? post.length === 100
                ? "99+"
                : post.length
              : 0
            : postLiked
              ? postLiked.length
              : 0}
          件
        </div>
        {active === ARTICLE_TYPE.POST ? (
          <div className="post-list">
            {post &&
              post.map((item, index) => {
                return (
                  <article key={index}>
                    <Link
                      to={`/recipe/${item.id}/${item.type}`}
                      className="link"
                    >
                      <div className="contents-image">
                        <img
                          src={`${setImageHost(item.image_file_name)}`}
                          alt={item.title}
                        />
                      </div>
                    </Link>
                    <div className="contents-content">
                      <Link
                        to={`/recipe/${item.id}/${item.type}`}
                        className="contents-link"
                      >
                        <div className="contents-head">
                        <CaptionTypePost content_type={item.type} />
                          <div className="effect">
                            <span className="likes">
                              {item.is_liked ? <HeartOn /> : <Heart />}
                              <span className="text">{item.like_count}</span>
                            </span>
                            <span className="watches">
                              {item.is_commented ? (
                                <BallooneOn />
                              ) : (
                                  <Balloone />
                                )}
                              <span className="text">
                                {item.comment_count | 0}
                              </span>
                            </span>
                          </div>
                        </div>
                        <p className="contents-title">
                          <Link
                            to={`/recipe/${item.id}/${item.type}`}
                            className="link"
                          >
                            {item.title}
                          </Link>
                        </p>
                        <div className="contents-foot">
                          <div className="user"></div>
                          <div className="updated">
                            <TimeAgo
                              date={parse(
                                item.updated_at,
                                "yyyy-MM-dd HH:mm:ss",
                                new Date()
                              )}
                            />
                          </div>
                        </div>
                      </Link>
                    </div>
                    {isMyPage && (
                      <div className="contents-action">
                        <img
                          src="/assets/three-dots.png"
                          onClick={() => handleOpenModal(item)}
                        />
                      </div>
                    )}
                  </article>
                );
              })}
          </div>
        ) : (
            <div className="post-list">
              {postLiked &&
                postLiked.map((item, index) => {
                  return (
                    <article key={index}>
                      <Link to={`/recipe/${item.id}/${item.content_type}`} className="link">
                        <div className="contents-image">
                          <img
                            src={`${setImageHost(item.image_file_name)}`}
                            alt={item.title}
                          />
                        </div>
                      </Link>
                      <div className="contents-content">
                        <div className="contents-head">
                          <CaptionTypePost content_type={item.content_type} />
                         
                          <div className="effect">
                            <span className="likes">
                              {item.is_liked ? <HeartOn /> : <Heart />}
                              <span className="text">{item.like_count}</span>
                            </span>
                            <span className="watches">
                              {item.is_commented ? <BallooneOn /> : <Balloone />}
                              <span className="text">
                                {item.comment_count | 0}
                              </span>
                            </span>
                          </div>
                        </div>
                        <p className="contents-title">
                          <Link to={`/recipe/${item.id}/${item.content_type}`} className="link">
                            {item.title}
                          </Link>
                        </p>
                        <div className="contents-foot">
                          <Link to={`/profile/${item.user?.id}`} className="link">
                            <div className="user">
                              {item.user.profile.image_file_name ? (
                                <img
                                  className="thumb"
                                  src={`${setImageHost(
                                    item.user.profile.image_file_name
                                  )}`}
                                  alt={item.user?.nickname}
                                />
                              ) : (
                                  <img
                                    className="dummy"
                                    src="/assets/icons/person.svg"
                                  />
                                )}
                              <div className="nickname">
                                <div className="text">{item.user?.nickname}</div>
                              </div>
                            </div>
                          </Link>
                          <div className="updated">
                            <TimeAgo
                              date={parse(
                                item.updated_at,
                                "yyyy-MM-dd HH:mm:ss",
                                new Date()
                              )}
                            />
                          </div>
                        </div>
                      </div>

                    </article>
                  );
                })}
            </div>
          )}
      </section>
      {isModal !== "" ? (
        <Modal
          article={isModal}
          handleEdit={handleEdit}
          handleDraft={handleDraft}
          handleCopy={handleCopy}
          handleDelete={handleDelete}
          handleCloseModal={handleCloseModal}
        />
      ) : null}
      <Footer />
    </div>
  );
}
