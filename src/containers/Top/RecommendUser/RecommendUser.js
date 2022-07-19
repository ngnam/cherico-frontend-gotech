import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import useRequest from "hooks/useRequest";
import { setImageHost } from "service/image";
import BlockTitle from "components/BlockTitle";
import FollowButton from "components/FollowButton";
import useAuth from "hooks/useAuth";
import FavLogo from "images/icons/favorite.svg";

import css from "./styles.scss";

function RecommendUser({ items, followedUserIds }) {
  const { state: authState } = useAuth();
  const history = useHistory();
  const { request } = useRequest();
  const onFollow = (userId) => {
    // APIへリクエスト
    const follows = { ...isFollow };
    follows[userId] = !isFollow[userId];
    setIsFollow(follows);
  };

  const handleFollow = async (userId) => {
    if (authState.user) {
      onFollow(userId);
      await request({
        url: `/users/${userId}/follow`,
        method: "put",
      }).catch((err) => console.log("error", err));
    } else {
      history.push("/login");
    }
  };

  const handleUnFollow = async (userId) => {
    if (authState.user) {
      onFollow(userId);
      await request({
        url: `/users/${userId}/follow`,
        method: "delete",
      }).catch((err) => console.log("error", err));
    } else {
      history.push("/login");
    }
  };

  React.useEffect(() => {
    const follows = {};
    followedUserIds &&
      followedUserIds.map((userId) => {
        follows[userId] = true;
      });
    setIsFollow(follows);
  }, [items]);

  const [isFollow, setIsFollow] = useState({});
  if (!items || !items.length) {
    return null;
  }

  const Users = items.map((item, index) => {
    const { user, diys } = item;
    const Recipes =
      diys &&
      diys.map((recipe) => {
        return (
          <li className="receipt" key={recipe.id}>
            <Link to={`/recipe/${recipe.id}/diys`} className="link">
              <img
                src={`${setImageHost(recipe.image_file_name)}`}
                alt={item.title}
              />
            </Link>
          </li>
        );
      });
    return (
      <div className="content" key={index}>
        <div className="row">
          <div className="user">
            <div className="user-info">
              {user.profile?.image_file_name ? (
                <img src={setImageHost(user.profile.image_file_name)} />
              ) : (
                ""
              )}
              <span className="user-name">{user.nickname}</span>
            </div>
            <div className="follow-action">
              <FollowButton
                onClick={() =>
                  isFollow[user.id]
                    ? handleUnFollow(user.id)
                    : handleFollow(user.id)
                }
                className={isFollow[user.id] ? "on" : ""}
              >
                {isFollow[user.id] ? "フォロー中" : "フォロー"}
              </FollowButton>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="receipt-list">
            <ul>{Recipes}</ul>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div className={`recommend-user ${css.class}`}>
      <BlockTitle logo={<FavLogo />} titleText="おすすめユーザー" />
      {Users}
    </div>
  );
}

export default RecommendUser;
