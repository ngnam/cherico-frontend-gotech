import React from 'react'

import Header from 'components/Header'
import Footer from 'components/Footer'
import CatchPhrase from 'components/CatchPhrase'
import MainBanner from 'components/MainBanner'

import useRequest from 'hooks/useRequest'
import useAuth from 'hooks/useAuth'

import CategoryList from './CategoryList'
import NewRecipe from './NewRecipe'
import TodaysRecipe from './TodaysRecipe'
import RecommendUser from './RecommendUser'
import FollowUserRecipe from './FollowUserRecipe'

import css from './styles.scss'

function Top() {
  const { request } = useRequest()
  const { state: authState } = useAuth()

  const [newArrivals, setNewArrivals] = React.useState([])
  const [recommendeds, setRecommendeds] = React.useState([])
  const [recommendedUsers, setRecommendedUsers] = React.useState(null)
  const [categorys, setCategorys] = React.useState([])
  const [followedUsers, setFollowedUsers] = React.useState(null)
  const [followedUserIds, setFollowedUserIds] = React.useState([])
  React.useEffect(() => {
    fetchData()
  }, [])

  React.useEffect(() => {
    if (!authState.user) {
      return
    }
    const userId = authState.user.username
    request({
      url: `/contents/recipes/users/${userId}/follows`,
    }).then((result) => {
      if (result.data && result.data.length) {
        setFollowedUsers(result.data)
      }

    })

    request({
      url:`/users/${userId}/follow`,
    }).then(result => {
      const userIds = result?.data?.follows.reduce((acc, curr) => {
        acc.push(curr.user_id)
        return acc
      }, [])
      setFollowedUserIds(userIds)
    })

  }, [authState.user])

  async function fetchData() {
    let result = await request({ url: `/contents/recipes/newarrival` })
    setNewArrivals(result.data)

    result = await request({ url: `/contents/recipes/recommended` })
    setRecommendeds(result.data)

    result = await request({ url: `/contents/recipes/diys/users/recommended` })
    setRecommendedUsers(result.data)

    result = await request({ url: `/categories` })
    setCategorys(result.data)
  }

  // const filteredRecommendedUser = (followedUsers, recommendedUsers) => {

  // }
  return (
    <div className={`top ${css.class}`}>
      <Header></Header>
      <CatchPhrase></CatchPhrase>
      <MainBanner></MainBanner>
      <div className="content-container">
        <div className="container new">
          <NewRecipe items={newArrivals} />
        </div>
        <div className="container todays">
          <TodaysRecipe recipe={recommendeds} />
        </div>
        <div className="container follow-user">
          {followedUsers &&
            followedUsers.map((index, followedUser) => (
              <FollowUserRecipe items={followedUser.contents} key={index} />
            ))}
        </div>

        <div className="container recommend">
          <RecommendUser items={recommendedUsers} followedUserIds={followedUserIds} />
        </div>

        <div className="container category-list">
          <CategoryList items={categorys} />
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Top
