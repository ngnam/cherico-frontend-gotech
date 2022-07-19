import React from 'react'
import { useHistory } from 'react-router-dom'
import BlockTitle from 'components/BlockTitle'
import ContentItem from 'components/ContentItem'
import { contentsType } from 'constants/const'
import useNews from 'hooks/useNews'
import css from './styles.scss'

function News({ service }) {
  const perPages = 20
  const { state, addItems, setItems, setCurrentPage, setNoData, setScroll } = useNews()
  const history = useHistory()
  const [isFetching, setIsFetching] = React.useState(false)

  const handleScroll = () => {
    setScroll(service.scrollTop())
    if (
      window.innerHeight + document.documentElement.scrollTop >
      document.documentElement.offsetHeight - 100
    ) {
      setIsFetching(true)
    }
  }

  const loadContents = async (page) => {
    if (service.requestState.loading) {
      return
    }
    const offset = (page - 1) * perPages
    const result = await service.fetchContents(perPages, offset, contentsType.NEWS)

    setCurrentPage(page)
    if (!result.data) {
      setNoData(true)
      return
    }

    if (page === 1) {
      setItems(result.data)
    } else {
      addItems(result.data)
    }

    if (result.pagination && result.pagination.total <= offset + perPages) {
      setNoData(true)
    }
  }

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    })

    if (history.action === 'POP') {
      if (state.scrollPosition !== 0) {
        setTimeout(() => {
          window.scrollTo({
            top: state.scrollPosition,
            behavior: 'instant',
          })
        }, 100)
      }
      if (state.items.length === 0) {
        loadContents(1)
      }
    } else {
      loadContents(1)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  React.useEffect(() => {
    if (isFetching) {
      if (!state.noData && !service.requestState.loading) {
        loadContents(state.currentPage + 1)
      }
      setIsFetching(false)
    }
  }, [isFetching])

  return (
    <div className={`${css.class}`}>
      <div className="title">
        <BlockTitle logo={<img src="/assets/icons/news.svg" />} titleText="ニュース" />
      </div>
      <section className="contents">
        <div className="contents-list">
          <ContentItem items={state.items} />
        </div>
      </section>
      {service.requestState.loading ? <div className="loader">Loading ...</div> : ''}
    </div>
  )
}

export default News
