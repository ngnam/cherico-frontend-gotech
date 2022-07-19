import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useParams, Link, useHistory } from 'react-router-dom'
import Linkify from 'react-linkify'
import { format, parseISO } from 'date-fns'

import Header from 'components/Header'
import Author from 'components/Author'
import Favorite from 'components/Favorite'
import ProductList from 'components/ProductList'
import KeywordList from 'components/KeywordList'
import RecipeMaterialList from 'components/RecipeMaterialList'
import Button from 'components/Button'
import Footer from 'components/Footer'
import TimeIcon from 'images/icons/time.svg'
import MoneyIcon from 'images/icons/money.svg'
import { setImageHost } from 'service/image'

import useAuth from 'hooks/useAuth'
import useRequest from 'hooks/useRequest'

import CommentLink from 'components/CommentLink'
import css from './styles.scss'
import CommentBox from '../../components/CommentBox/CommentBox'
import CommentList from '../../components/CommentList/CommentList'

export default function Recipe() {
  const { state: authState } = useAuth();
  const history = useHistory();
  const { request } = useRequest();
  const params = useParams();
  const [isFav, setIsFav] = useState(false);
  const [recipe, setRecipe] = React.useState(null);
  const [myRecipe, setMyRecipe] = useState(false);
  const types = ["diys", "news", "dictionaries"];

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [userId, setUserId] = useState(0);

  async function onFavorite() {
    if (!authState.user) {
      history.push("/login");
      return;
    }

    // API request
    const likeUrl = `/contents/types/${params.type}/${params.recipeId}/like/`;
    let method = "post";
    if (isFav) {
      method = "delete";
    }

    await request({ url: likeUrl, method: method });
    setIsFav(!isFav);
  }

  const getPostComment = () => {
    request({
      url: `/contents/recipes/${params.type}/${params.recipeId}/comments?limit=100&offset=0`,
    }).then((res) => {
      if (res.meta.code === 200 && res.data) {
        setComments(
          res.data.map((v, i) => {
            return {
              user: {
                image_file_name: v.user.profile.image_file_name,
                name: v.user.nickname,
                id: v.user.id,
              },
              comment: v.comment,
              updated_at: v.updated_at,
              id: v.id,
            };
          })
        );
      }
    });
  };

  const inputChange = (e) => {
    const { value } = e.target;
    setComment(value);
  };

  const postComment = () => {
    const formData = new FormData();
    formData.append("comment", comment);
    const config = {
      method: "post",
      url: `/contents/recipes/${params.type}/${params.recipeId}/comments`,
      data: formData,
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    request(config).then((res) => {
      if (res.meta.code === 200) {
        getPostComment();
      }
    });
    setComment("");
  };

  async function fetchData() {
    if (authState.user) {
      setUserId(authState.user.username);
      const likeStatusUrl = `/contents/recipes/${params.recipeId}/type/${params.type}/like/status`;
      const likeResult = await request({ url: likeStatusUrl });
      setIsFav(likeResult.data.is_liked);
    }

    const url = `/contents/recipes/${params.type}/${params.recipeId}`;
    const result = await request({ url });
    if (result.data.status !== "public") {
      history.push("/");
    }
    setRecipe(result.data);
    if (
      authState.user &&
      result.data.user &&
      authState.user.username === result.data.user.id
    ) {
      setMyRecipe(true);
    }

    getPostComment();
  }

  React.useEffect(() => {
    if (types.indexOf(params.type) === -1) {
      history.push("/");
    }

    if (!authState.authChecked) {
      return;
    }

    fetchData();
  }, [authState.authChecked]);
  /*
    const categoryText = React.useMemo(() => {
        if (!recipe || !recipe.category) {
            return ''
        }

        const categoryTexts = []
        const search = (category, texts) => {
            if (category) {
                texts.push(category.name)
            }

            if (category.parent) {
                search(category.parent, texts)
            }
        }

        search(recipe.category, categoryTexts)
        return categoryTexts.reverse().join(' > ')
    }, [recipe ? recipe.category : ''])
*/
  if (!recipe) {
    return null;
  }

  const Indexes =
    recipe.processes &&
    recipe.processes.step &&
    recipe.processes.step
      .sort((a, b) => a.process_no - b.process_no)
      .filter((step) => !!step.title)
      .map((step, index) => {
        return (
          <li className="index-item" key={index}>
            <a href={"#" + step.id} className="link">
              {step.title}
            </a>
          </li>
        );
      });

  const Steps =
    recipe.processes &&
    recipe.processes.step &&
    recipe.processes.step
      .sort((a, b) => a.process_no - b.process_no)
      .map((step) => {
        const Comments = (
          <div className="solution-comments">

            {
              step.comments &&
              <div className={'session-comment-item d-flex ' + (step.comments[0].user.id == userId ? ' my-comment ' : ' ')} key={0} data-id={0}>
                <div className="avatar">
                  {
                    step.comments[0].user.profile.image_file_name ?
                      <img src={setImageHost(step.comments[0].user.profile.image_file_name)} alt={step.comments[0].user.nickname} /> :
                      <img src="/assets/user-avatar.png" />
                  }
                </div>
                <div className="comment-content">
                  <div className="new-lable">新着コメント</div>
                  <div className="text">{step.comments[0].comment}</div>
                  <div className="info">
                    <a href="#">{step.comments[0].user.nickname}</a>
                    <span className="timestamp"> {format(parseISO(step.comments[0].updated_at), 'yyyy年MM月dd日 HH:mm')}</span>
                  </div>
                  {/*
                  step.comments[0].user.id == userId && <div className="delete-comment">
                    <span className="btn-delete-comment" onClick={() => handleDeleteComment(step.comments[0])}>削除</span>
                  </div>
                */}
                </div>
              </div>
            }


            <div className="comment-summary d-flex align-center space-between">
              <div className="count">
                コメント
                <a
                  href={`/comment/${recipe.id}/${params.type}/step/${step.id}`}
                >
                  {step.comments ? step.comments.length : 0}
                </a>
                件
              </div>
              <div className="action">
                <CommentLink
                  id={recipe.id}
                  type={params.type}
                  process="step"
                  index={step.id}
                />
              </div>
            </div>
          </div>
        );

        return (
          <React.Fragment key={step.id}>
            <section className="content-box content-block" id={step.id}>
              <div className="heading">{step.title}</div>
              <div className="sub">{step.sub_title}</div>
            </section>
            {step.image_file_name && (
              <section className="image">
                <div className="image-container">
                  <img src={`${setImageHost(step.image_file_name)}`} alt="" />
                </div>
              </section>
            )}
            <section className="content-box">
              <span className="description">
                <Linkify properties={{ target: "_blank" }}>
                  {step.description}
                </Linkify>
              </span>
            </section>
            <section className="content-box">{Comments}</section>
          </React.Fragment>
        );
      });

  // 費用
  const costMaterial =
    params.type === "diys" &&
    recipe.materials &&
    recipe.materials.length &&
    recipe.materials.reduce((sum, i) => sum + i.price * i.qty, 0);

  const costTool =
    params.type === "diys" &&
    recipe.tools &&
    recipe.tools.length &&
    recipe.tools.reduce((sum, i) => sum + i.price * i.qty, 0);

  const cost = Number(costMaterial) + Number(costTool);

  const ReferenceMedia = (() => {
    if (!recipe.reference_media) {
      return;
    }

    if (
      !recipe.reference_media.image_file_name &&
      !recipe.reference_media.url &&
      !recipe.reference_media.name
    ) {
      return;
    }

    const base = recipe.reference_media.image_file_name ? (
      <img
        src={setImageHost(recipe.reference_media.image_file_name)}
        alt={recipe.reference_media.name ? recipe.reference_media.name : ""}
      />
    ) : (
        recipe.reference_media.name
      )

    const media = recipe.reference_media.url ? (
      <a href={recipe.reference_media.url} target="_blank" rel="noreferrer">
        {base}
      </a>
    ) : (
        base
      )

    return (
      <section className="text-break reference-media">
        <div className="image-container">{media}</div>
      </section>
    );
  })();

  const handleReferenceUrl = () => {
    window.open(recipe.reference_url, "_blank");
  };

  // 商品情報
  const Goods = (() => {
    if (!recipe.goods || !recipe.goods.length) {
      return null;
    }
    const goods = recipe.goods.filter((item) => {
      return (
        item.maker || item.name || item.price || item.url || item.mage_file_name
      );
    });

    if (!goods.length) {
      return null;
    }
    return (
      <section className="content-box products">
        <div className="d-flex align-center space-between title-margin">
          <div className="title">
            商品購入はこちら
            <small>一部ネットで取り扱えない商品もございます</small>
          </div>
        </div>
        <ProductList items={goods} />
      </section>
    );
  })();

  // 関連キーワード
  const Tags = (() => {
    if (!recipe.tags || !recipe.tags.length) {
      return null;
    }
    const tags = recipe.tags.filter((item) => item);

    if (!tags.length) {
      return null;
    }
    return (
      <section className="content-box text-break keywords">
        <div className="d-flex align-center space-between">
          <div className="title">関連キーワード</div>
        </div>
        <div>
          <KeywordList items={tags} />
        </div>
      </section>
    );
  })();

  // 関連記事
  const RelatedContents = (() => {
    if (!recipe.related_contents || !recipe.related_contents.length) {
      return null;
    }
    const relatedContents = recipe.related_contents
      .filter((item) => {
        return item.text || item.url;
      })
      .map((content, index) => {
        return (
          <li className="post-item" key={index}>
            <Link to={content.url} className="link">
              {content.text}
            </Link>
          </li>
        );
      });

    if (!relatedContents.length) {
      return null;
    }

    return (
      <section className="content-box text-break related-posts text-break">
        <div className="d-flex align-center space-between">
          <div className="title">関連した記事</div>
        </div>
        <div>
          <ul className="post-list">{relatedContents}</ul>
        </div>
      </section>
    );
  })();

  const handleDeleteComment = (item) => {
    const _confirm = confirm("削除しますか？");
    if (_confirm) {
      const _delete = {
        method: "delete",
        url: `/contents/recipes/${params.type}/${params.recipeId}/comments/${item.id}`,
        headers: {
          "content-type": "application/json",
        },
      };
      request(_delete).then((res) => {
        if (res.meta.code === 200) {
          getPostComment();
          alert("削除");
        } else {
          alert("何かがうまくいかなかった。後でもう一度やり直してください。");
        }
      });
    }
  };

  function showRecipeMaterialList(items) {
    var status = false;
    for (var i = 0; i < items.length; i++) {
      if (items[i].qty && items[i].qty > 0) {
        status = true;
        break;
      }
    }
    return status;
  }

  return (
    <div className={`recipe ${css.class}`}>
      <Helmet>
        <title>{recipe.title} | mirateo</title>
        {recipe.reference_url && <link rel="canonical" href={recipe.reference_url} />}
        <meta name="robots" content="noindex" />
        <meta name="robots" content="nofollow" />
        <meta property="og:title" content={`${recipe.title} | mirateo `} />
        <meta property="og:type" content="article" />

        <meta property="og:image" content={setImageHost(recipe.image_file_name)} />
        <meta property="og:url" content={recipe.reference_url} />
        <meta property="og:site_name" content="mirateo [ミラテオ]" />
        <meta property="og:description" content={recipe.description} />
      </Helmet>
      <Header />
      <Author user={recipe.user}></Author>
      <section className="text-break kv image">
        <div className="image-container">
          <img src={setImageHost(recipe.image_file_name)} />
        </div>
      </section>
      <section className="content-box text-break title">
        <div className="text-container d-flex space-between">
          <div>
            <div className="text">{recipe.title}</div>
            <span className="updated-at">
              {recipe.updated_at &&
                format(parseISO(recipe.updated_at), "yyyy.MM.dd HH:mm")}
            </span>
          </div>
          {!myRecipe && (
            <div className="favorite-action">
              <Favorite onClick={() => onFavorite()} active={isFav} />
            </div>
          )}
        </div>
      </section>
      {ReferenceMedia}
      {((params.type === "diys" || params.type === "dictionaries") && recipe.description) && (
        <section className="content-box text-break intro border">
          {(recipe.required_time || recipe.materials) && (
            <div className="d-flex align-center space-between">
              <div className="title-time-price">
                <TimeIcon />
                所要時間 {recipe.required_time}
                <MoneyIcon />
                費用{" "}
                {!cost || Number.isNaN(cost)
                  ? "---"
                  : `${Number(cost).toLocaleString()}円`}
              </div>
            </div>
          )}

          <div className="intro-text body-text description">
            <Linkify properties={{ target: "_blank" }}>
              {recipe.description}
            </Linkify>
          </div>

          {/* {categoryText && ( */}
          {/*  <div className="category-box"> */}
          {/*    <div className="title">カテゴリー</div> */}
          {/*    <div className="intro-text body-text">{categoryText}</div> */}
          {/*  </div> */}
          {/* )} */}
        </section>
      )}
      {params.type === "news" && (
        <section className="content-box text-break intro border">
          <div className="intro-text body-text description">
            <Linkify properties={{ target: "_blank" }}>
              {recipe.description}
            </Linkify>
          </div>
        </section>
      )}
      {recipe.materials && showRecipeMaterialList(recipe.materials) && (
        <section className="content-box text-break material border">
          <div className="d-flex align-center space-between">
            <div className="title">使用する材料</div>
          </div>
          <div className="material-list">
            <RecipeMaterialList items={recipe.materials} />
          </div>
        </section>
      )}
      {recipe.tools && showRecipeMaterialList(recipe.tools) && (
        <section className="content-box text-break material border">
          <div className="d-flex align-center space-between">
            <div className="title">使用する工具・道具</div>
          </div>
          <div className="material-list">
            <RecipeMaterialList items={recipe.tools} />
          </div>
        </section>
      )}

      {Indexes && Indexes.length > 0 && (
        <section className="content-box text-break index">
          <div className="d-flex align-center space-between">
            <div className="title">目次</div>
          </div>
          <div>
            <ul className="index-list">{Indexes}</ul>
          </div>
        </section>
      )}

      {Steps}

      {recipe.reference_url && (
        <section className="content-box text-break d-flex justify-center">
          <Button className="btn-view-detail" varient="outline" onClick={handleReferenceUrl}>
            元の記事を読む
          </Button>
        </section>
      )}

      {Goods}

      {/* <section className="content-box text-break write-comment border"></section> */}

      {comments && (
        <div className="comment-box-wrap">
          <section className="content-box products">
            <div className="d-flex align-center space-between title-margin">
              <div className="title">全体のコメント
              <a className="count" href={`/comment/${params.recipeId}/${params.type}/common/${params.recipeId}`}>  {comments.length}</a>
              件</div>
            </div>
          </section>
          <CommentList items={comments} viewer={userId} handleDeleteComment={handleDeleteComment} type={params.type} recipeId={params.recipeId} />
          <CommentBox
            value={comment}
            postComment={postComment}
            inputChange={inputChange}
          />
        </div>
      )}

      {Tags}
      {RelatedContents}
      {/* <section className="content-box text-break related-recipes">
        <div className="d-flex align-center space-between">
          <div className="title">関連したレシピ</div>
        </div>
        <div>
          <RecipeList list={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}></RecipeList>
        </div>
        <div className="d-flex justify-center">
          <ReadMore />
        </div>
      </section> */}
      <Footer />
    </div>
  );
}
