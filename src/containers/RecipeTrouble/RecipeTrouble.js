import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useParams, Link, useHistory } from 'react-router-dom'
import Linkify from 'react-linkify'
import { format, parseISO } from 'date-fns'

import { setImageHost } from 'service/image'
import Header from 'components/Header'
import Author from 'components/Author_v2'
import Process from "components/Process";
import Button from 'components/Button'
import Favorite from 'components/Favorite'
import RecipeMaterialList from 'components/RecipeMaterialList'
import ProductList from 'components/ProductList'
import CommentList from 'components/CommentList'
import CommentLink from 'components/CommentLink'
import KeywordList from 'components/KeywordList'
import AccordionText from 'components/AccordionText'
// import ReadMore from 'components/ReadMore'
// import RecipeList from 'components/RecipeList'
import Footer from "components/Footer";

import TimeIcon from "images/icons/time.svg";
import MoneyIcon from "images/icons/money.svg";

import useAuth from "hooks/useAuth";
import useRequest from "hooks/useRequest";

import css from "./styles.scss";
import CommentBox from "../../components/CommentBox/CommentBox";

export default function RecipeTrouble() {
  const { state: authState } = useAuth();
  const history = useHistory();
  const { request } = useRequest();
  const params = useParams();
  const [recipe, setRecipe] = React.useState(null);
  const [isFav, setIsFav] = useState(false);
  const [myRecipe, setMyRecipe] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [userId, setUserId] = useState(0);


  async function onFavorite() {
    if (!authState.user) {
      history.push("/login");
      return;
    }

    // API request
    const likeUrl = `/contents/types/problems/${params.recipeId}/like/`;
    let method = "post";
    if (isFav) {
      method = "delete";
    }
    
    await request({ url: likeUrl, method: method });
    setIsFav(!isFav);
  }

  async function fetchData() {
    if (authState.user) {
      setUserId(authState.user.username)

      const likeResult = await request({
        url: `/contents/recipes/${params.recipeId}/type/problems/like/status`,
      })
      setIsFav(likeResult.data.is_liked)
    
    }

    const result = await request({
      url: `/contents/recipes/problems/${params.recipeId}`,
    });
    if (result.data.status !== "public") {
      history.push("/");
    }
    setRecipe(result.data)
  
    if (authState.user && result.data.user && authState.user.username === result.data.user.id) {
      setMyRecipe(true)
    }
  }

  const inputChange = (e) => {
    const { value } = e.target;
    setComment(value);
  };

  const getPostComment = () => {
    request({
      url: `/contents/recipes/problems/${params.recipeId}/comments?limit=100&offset=0`,
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

  const postComment = () => {
    const formData = new FormData();
    formData.append("comment", comment);
    const config = {
      method: "post",
      url: `/contents/recipes/problems/${params.recipeId}/comments`,
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

  const handleDeleteComment = (item) => {
    const _confirm = confirm("削除しますか？");
    if (_confirm) {
      const _delete = {
        method: "delete",
        url: `/contents/recipes/problems/${params.recipeId}/comments/${item.id}`,
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

  React.useEffect(() => {
    if (!authState.authChecked) {
      return;
    }

    fetchData();
    // todo
    getPostComment();
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

  // 費用
  const costMaterial =
    recipe.materials &&
    recipe.materials.length &&
    recipe.materials.reduce((sum, i) => sum + i.price * i.qty, 0);

  const costTool =
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
    );

    const media = recipe.reference_media.url ? (
      <a href={recipe.reference_media.url} target="_blank" rel="noreferrer">
        {base}
      </a>
    ) : (
      base
    );

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
    <div className={`recipe-trouble ${css.class}`}>
      <Helmet>
        <title>{recipe.title} | mirateo</title>
        {recipe.reference_url && <link rel="canonical" href={recipe.reference_url} />}
        <meta name="robots" content="noindex" />
        <meta name="robots" content="nofollow" />
      </Helmet>
      <Header />

      <div className="main-image">
        <img className="main-img" src={setImageHost(recipe.image_file_name)} />
        <span className="btn-type">お困り解決</span>
        <img className="btn-upload" src={`/assets/imgs/upload.png`} alt="upload icon"/>
      </div>

      <div className="post-type-content p-lr-16">
        <span className="btn-recipe">
          <img src={`/assets/imgs/recipe.png`} alt={`recipe_type`} />
          レシピ
        </span>
      </div>

      <div className="main-title p-lr-16">
        <p className="text-main-title">{recipe.title}</p>
        <div className="date-main-title">
          {recipe.updated_at && format(parseISO(recipe.updated_at), "yyyy.MM.dd HH:mm")}
        </div>
        <div className="like-main-title">
          <img src="/assets/imgs/heart.png" className="image-like" alt="heart" />
          {`999`}
          <img src="/assets/imgs/comment.png" className="image-like" alt="comment" />
          {`999`}
        </div>
      </div>

      <div className="p-lr-16 user-info">
        <Author owner={myRecipe} user={recipe.user} detail={false}></Author>
      </div>

        <div className="p-lr-16 recipe-description">
            {recipe.description}
        </div>

        <div className="p-lr-16">
            <div className="summary-info">
                <div className="date-summary">
                    <TimeIcon className='adjust-top' />
                    所要時間 {recipe.required_time}
                    <MoneyIcon className='adjust-top m-l-22' />
                    <span className="text">
                        費用{" "}
                        {!cost || Number.isNaN(cost)
                            ? "---"
                            : "¥" + Number(cost).toLocaleString()}
                    </span>
                </div>
                <div className="s-text">
                    DIY費用と業者への発注金額の比較
                </div>
                <div className="com-box">
                    <div className="com-icon">
                        <img src="/assets/imgs/diy.png" alt="icon" /> DIY
                        <span className="eclipse"></span>
                    </div>
                    <div className="com-money">
                        ¥1,000
                    </div>
                </div>
                <div className="pro-box">
                    <div className="pro-box-1">
                        <img src="/assets/imgs/Shape.png" align="icon" /> 業者
                    </div>
                    <div className="pro-box-2">

                    </div>
                    <div className="pro-box-3">
                        ¥15,000〜
                    </div>
                </div>
            </div>
        </div>


            {(recipe.materials && showRecipeMaterialList(recipe.materials)) && (
                <div className="p-lr-16 material-box">
                    <p className="block-text-title">使用する材料</p>
                    <div className="material-list">
                        <RecipeMaterialList items={recipe.materials} />
                    </div>
                    <div className="material-link">
                        <a href="#">材料の商品情報を確認する</a>
                    </div>
                </div>
            )}

        {(recipe.tools && showRecipeMaterialList(recipe.tools)) && (
            <div className="p-lr-16 material-box">
                <p className="block-text-title">使用する工具・道具</p>
                <div className="material-list">
                    <RecipeMaterialList items={recipe.tools} />
                </div>
                <div className="material-link">
                    <a href="#">工具・道具の商品情報を確認する</a>
                </div>
            </div>
        )}

        <div className="p-lr-16">
            <div className="index-section">
                <p className="text-index">作業工程</p>
                <ul className="ul-index">
                    <li className="li-index">
                        <div className="span-content">
                            <span>1</span>
                        </div>
                        換気扇の汚れ状況を確認
                    </li>
                    <li className="li-index">
                        <div className="span-content">
                            <span>2</span>
                        </div>
                        黒く錆びついた油汚れの場合
                    </li>
                    <li className="li-index">
                        <div className="span-content">
                            <span>3</span>
                        </div>
                        ここにはタイトルが入ります。
                    </li>
                    <li className="li-index">
                        <div className="span-content">
                            <span>4</span>
                        </div>
                        選び方
                    </li>
                </ul>
            </div>
        </div>
        {
            recipe?.processes?.pre ?
                <div className="p-lr-16">
                    <div className="step-title">
                        <span className="time-consuming">
                            <img src="/assets/imgs/clock.png" alt="clock" />
                            所要時間：3分
                        </span>
                        <p className="text-step-title">Pre</p>
                    </div>
                </div> : ''
        }

        <div className="p-lr-16">
            <Process steps={recipe.processes.pre} recipeId={recipe.id} type="problems" stepType="pre" showComment={false} ></Process>
        </div>

        {
            recipe?.processes?.step ?
                <div className="p-lr-16">
                    <div className="step-title">
                        <span className="time-consuming">
                            <img src="/assets/imgs/clock.png" alt="clock" />
                            所要時間：3分
                        </span>
                        <p className="text-step-title">2. Step</p>
                    </div>
                </div> : ''
        }

        <div className="p-lr-16">
            <Process steps={recipe.processes.step} recipeId={recipe.id} type="problems" stepType="step" showComment={true} ></Process>
        </div>

        {
            recipe?.processes?.complete ?
                <div className="p-lr-16">
                    <div className="step-title">
                        <span className="time-consuming">
                            <img src="/assets/imgs/clock.png" alt="clock" />
                            所要時間：3分
                        </span>
                        <p className="text-step-title">3. Complete</p>
                    </div>
                </div> : ''
        }

        <div className="p-lr-16">
            <Process steps={recipe.processes.complete} recipeId={recipe.id} type="problems" stepType="complete" showComment={false} ></Process>
        </div>

        <div className="p-lr-16 user-info mt-52">
            <p className="title-user">投稿者情報</p>
            <Author owner={myRecipe} user={recipe.user} detail={true}></Author>
        </div>

        {comments && (
          <div className="comment-box-wrap">
            <section className="content-box products">
              <div className="d-flex align-center space-between title-margin">
                <div className="title">全体のコメント
                <a className="count" href={`/comment/${params.recipeId}/problems/common/${params.recipeId}`}>  {comments.length}</a>件
                </div>
              </div>
            </section>

            <CommentList items={comments} viewer={userId} handleDeleteComment={handleDeleteComment} type='problems' recipeId={params.recipeId}/>
            {/* <div className="d-flex item-align justify-center"> */}
            {/*  <ReadMore /> */}
            {/* </div> */}
            <CommentBox
              value={comment}
              postComment={postComment}
              inputChange={inputChange}
            />
          </div>
        )}
        
      {recipe.reference_url && (
        <section className="content-box text-break d-flex justify-center">
          <Button className="btn-view-detail" varient="outline" onClick={handleReferenceUrl}>
            元の記事を読む
          </Button>
        </section>
      )}
      {Goods}
      {Tags}
      {RelatedContents}

      {/* <section className="content-box related-recipes text-break">
        <div className="d-flex align-center space-between title-margin">
          <div className="title">関連レシピ</div>
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
