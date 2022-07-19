import React, { useState, useMemo } from 'react'
import MainBanner from 'components/MainBanner'
import BlockTitle from 'components/BlockTitle'
import ContentItem from 'components/ContentItem'
import RecipeList from 'components/RecipeList'
import { contentsType } from 'constants/const'
import useAuth from "hooks/useAuth";
import CommentMain from 'components/CommentMain'

import KeywordList from 'components/KeywordList'

import NewLogo from 'images/icons/new_fill.svg'
import RecommendLogo from 'images/icons/recommend_fill.svg'
import useRequest from 'hooks/useRequest'

import css from './styles.scss'

function Main({ service }) {
  const [loading, setLoading] = React.useState(false)
  const [tags, setTags] = React.useState([])
  const [page, setPage] = React.useState(1)
  const [pageUserContent, setPageUserContent] = React.useState(1)
  const { request, state: requestState } = useRequest()

  const [recommended, setRecommended] = React.useState([])
  const [userContentData, setUserContentData] = React.useState([])

  const [noData, setNoData] = React.useState({
    diys: false,
    problems: false,
    news: false,
    dictionaries: false,
  })

  const [noDataUserContent, setNoDataUserContent] = React.useState({
    diys: false,
    problems: false,
    news: false,
    dictionaries: false,
  })

  const [userId, setUserId] = useState(0);
  const { state: authState } = useAuth();

  const [active, setActive] = React.useState(1);
  const SHOW_TAB = {
    ADMIN_CONTENT: 1,
    USER_CONTENT: 0,
  };

  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >
      document.documentElement.offsetHeight - 400
    ) {

      loadDataTabActive();

    }
  }

  React.useEffect(() => {
    getTag()

    if (authState.user) {
      setUserId(authState.user.username)
    }
    loadDataTabActive();
  }, [])


  const getTag = () => {
    request({
      url: `/contents/recipes/keywords`,
    }).then((res) => {
      if (res.meta.code === 200 && res.data) {
        setTags(res.data)
      }
    });
  };



  // const loadNews = async () => {
  //   const result = await service.fetchContents(5, 0, contentsType.NEWS)
  //   setNews(result.data)
  // }

  const loadAdminContent = async (page) => {
    setLoading(true)
    const item = {
      recipes: null,
      news: null,
      dictionaries: null,
    }

    let offset = 0
    const promise = []
    const identifier = []

    // news
    if (!noData.news) {
      offset = (page - 1) * 2 + 5
      promise.push(service.fetchContents(2, offset, contentsType.NEWS))
      identifier.push('news')
    }

    // dictionaries
    if (!noData.dictionaries) {
      offset = (page - 1) * 1
      promise.push(service.fetchContents(1, offset, contentsType.DICTIONARIES))
      identifier.push('dictionaries')
    }

    // diys
    if (!noData.diys) {
      offset = (page - 1) * 4
      promise.push(service.fetchContents(4, offset, contentsType.DIYS))
      identifier.push('diys')
    }

    // problems
    if (!noData.problems) {
      offset = (page - 1) * 3
      promise.push(service.fetchContents(3, offset, contentsType.PROBLEMS))
      identifier.push('problems')
    }

    await Promise.all(promise).then((results) => {
      results.forEach((result, index) => {
        if (identifier[index] === 'news') {
          if (result.data) {
            item.news = result.data
          } else {
            setNoData({ ...noData, news: true })
          }
        }

        if (identifier[index] === 'dictionaries') {
          if (result.data) {
            item.dictionaries = result.data
          } else {
            setNoData({ ...noData, dictionaries: true })
          }
        }

        if (identifier[index] === 'diys') {
          if (result.data) {
            item.recipes = !item.recipes ? result.data : [...item.recipes, ...result.data]
          } else {
            setNoData({ ...noData, diys: true })
          }
        }

        if (identifier[index] === 'problems') {
          if (result.data) {
            item.recipes = !item.recipes ? result.data : [...item.recipes, ...result.data]
          } else {
            setNoData({ ...noData, problems: true })
          }
        }
      })
    })

    const newPage = page + 1
    setPage(newPage)

    const newItems = [...recommended, ...[item]]

    setRecommended(newItems)

    setLoading(false)
  }



  const loadUserContent = async (pageUserContent) => {
    setLoading(true)
    const item = {
      recipes: null,
      news: null,
      dictionaries: null,
    }

    let offset = 0
    let is_admin = 1;
    const promise = []
    const identifier = []

    // news
    if (!noDataUserContent.news) {
      offset = (pageUserContent - 1) * 2 + 5
      promise.push(service.fetchContents(2, offset, contentsType.NEWS, is_admin))
      identifier.push('news')
    }

    // dictionaries
    if (!noDataUserContent.dictionaries) {
      offset = (pageUserContent - 1) * 2
      promise.push(service.fetchContents(2, offset, contentsType.DICTIONARIES, is_admin))
      identifier.push('dictionaries')
    }

    // diys
    if (!noDataUserContent.diys) {
      offset = (pageUserContent - 1) * 4
      promise.push(service.fetchContents(4, offset, contentsType.DIYS, is_admin))
      identifier.push('diys')
    }

    // problems
    if (!noDataUserContent.problems) {
      offset = (pageUserContent - 1) * 3
      promise.push(service.fetchContents(4, offset, contentsType.PROBLEMS, is_admin))
      identifier.push('problems')
    }

    await Promise.all(promise).then((results) => {
      results.forEach((result, index) => {
        if (identifier[index] === 'news') {
          if (result.data) {
            item.news = result.data
          } else {
            setNoDataUserContent({ ...noDataUserContent, news: true })
          }
        }

        if (identifier[index] === 'dictionaries') {
          if (result.data) {
            item.dictionaries = result.data
          } else {
            setNoDataUserContent({ ...noDataUserContent, dictionaries: true })
          }
        }

        if (identifier[index] === 'diys') {
          if (result.data) {
            item.recipes = !item.recipes ? result.data : [...item.recipes, ...result.data]
          } else {
            setNoDataUserContent({ ...noDataUserContent, diys: true })
          }
        }

        if (identifier[index] === 'problems') {
          if (result.data) {
            item.recipes = !item.recipes ? result.data : [...item.recipes, ...result.data]
          } else {
            setNoDataUserContent({ ...noDataUserContent, problems: true })
          }
        }
      })
    })

    const newPageUserContent = pageUserContent + 1
    setPageUserContent(newPageUserContent)

    const newItemsUserContentData = [...userContentData, ...[item]]
    setUserContentData(newItemsUserContentData)

    setLoading(false)
  }


  const handleActive = (n) => {
    loadDataTabActive(n);
    setActive(n);

  };

  function loadDataTabActive(n = null) {

    var checkActive = n === null ? active : n;
    if (checkActive == SHOW_TAB.ADMIN_CONTENT) {
      if (!noData.diys || !noData.problems || !noData.news || !noData.dictionaries) {
        loadAdminContent(page);
      }
    } else {
      if (!noDataUserContent.diys || !noDataUserContent.problems || !noDataUserContent.news || !noDataUserContent.dictionaries) {
        loadUserContent(pageUserContent);
      }
    }
  }

  // 関連キーワード
  const Tags = (() => {
    if (!tags.length) {
      return null;
    }

    return (
      <section className="content-box text-break keywords main-page-keywords">
        <div className="d-flex align-center space-between">
          <div className="title"><RecommendLogo/> 人気キーワード</div>
        </div>
        <div>
          <KeywordList items={tags} />
        </div>
      </section>
    );
  })();

  const AdminContent = recommended &&
    recommended.length > 0 &&
    recommended.map((items, idx) => (
      <div className="recomended-content admin-content" key={idx}>

        <RecipeList list={items.recipes}></RecipeList>


        {items.news && items.news.length > 0 && (
          <div className="news">
            <div className="contents-list">
              <ContentItem items={items.news} />
            </div>
          </div>
        )}

        {items.dictionaries && items.dictionaries.length > 0 && (
          <div className="dictionaries">
            <div className="contents-list">
              <ContentItem items={items.dictionaries} />
            </div>
          </div>
        )}

        {idx < 1 && Tags}

        <div className="wrap-cmt-main">
          {/* <CommentMain list={items.news} listConcat={items.dictionaries} classArrow="arrow-up-center" /> */}
        </div>

      </div>
    ))

  const UserContent = userContentData &&
    userContentData.length > 0 &&
    <div className="user-content">{userContentData.map((items, idx) => (
      <div className="recomended-content" key={idx}>
        <RecipeList list={items.recipes} type="user_content"></RecipeList>
      </div>
    ))}
    </div>


  return (
    <div className={`${css.class}`}>
      <MainBanner></MainBanner>
      {/* <section className="latest-news">
        <div className="title">
          <BlockTitle logo={<NewLogo />} titleText="新着ニュース" />
        </div>
        <div className="news-list">
          <ContentItem items={news} contentsType={news} />
        </div>
      </section> */}
      <section className="menu">
        <div className="info-row menus">
          <span className="css-background-menu"></span>

          <a
            onClick={() => handleActive(SHOW_TAB.ADMIN_CONTENT)}
            className={`menu-link ${active === SHOW_TAB.ADMIN_CONTENT ? "active" : ""
              }`}
            href="#"
          >
            全体投稿一覧
          </a>

          <a
            onClick={() => handleActive(SHOW_TAB.USER_CONTENT)}
            className={`menu-link ${active === SHOW_TAB.USER_CONTENT ? "active" : ""
              }`}
            href="#"
          >
            ユーザー投稿一覧
          </a>


        </div>
      </section>
      <section className="recommended">
        {active === SHOW_TAB.ADMIN_CONTENT ? AdminContent : UserContent}
      </section>


      {loading ? <div className="loader">Loading ...</div> : ''}
    </div>
  )
}

export default Main
