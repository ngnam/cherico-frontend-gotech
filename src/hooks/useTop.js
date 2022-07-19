import * as React from 'react'
import { useProvider } from 'App/context'

const initialState = {
  items: [],
  currentPage: 1,
  noData: {
    diys: false,
    problems: false,
    news: false,
    dictionaries: false,
  },
  scrollPosition: 0,
  userContentItems: [],
  userContentCurrentPage: 1,
  userContentNoData: {
    diys: false,
    problems: false,
    news: false,
    dictionaries: false,
  },
  activeTab: 1,
  loading: false,
}

function reducer(state, { type, payload }) {
  switch (type) {
    case 'set':
      return { ...state, ...payload }
    case 'setItems':
      return { ...state, items: payload }
    case 'addItems':
      return { ...state, items: [...state.items, ...payload] }
    case 'setCurrentPage':
      return { ...state, currentPage: payload }
    case 'setNoData':
      return { ...state, noData: { ...state.noData, ...payload } }
    case 'setUserContentItems':
      return { ...state, userContentItems: payload }
    case 'addUserContentItems':
      return { ...state, userContentItems: [...state.userContentItems, ...payload] }
    case 'setUserContentCurrentPage':
      return { ...state, userContentCurrentPage: payload }
    case 'setUserContentNoData':
      return { ...state, userContentNoData: { ...state.userContentNoData, ...payload } }
    case 'setActiveTab':
      return { ...state, activeTab: payload }
    case 'setScrollPosition':
      return { ...state, scrollPosition: payload }
    case 'setLoading':
      return { ...state, loading: payload }
    default:
      throw new Error('Action type not found')
  }
}

export function useTopReducer() {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return {
    state,
    dispatch,
  }
}

export default function () {
  const {
    top: { state, dispatch },
  } = useProvider()

  function setItems(items) {
    dispatch({ type: 'setItems', payload: items })
  }

  function addItems(items) {
    dispatch({ type: 'addItems', payload: items })
  }

  function setCurrentPage(page) {
    dispatch({ type: 'setCurrentPage', payload: page })
  }

  function setNoData(noData) {
    dispatch({ type: 'setNoData', payload: noData })
  }

  function setUserContentItems(items) {
    dispatch({ type: 'setUserContentItems', payload: items })
  }

  function addUserContentItems(items) {
    dispatch({ type: 'addUserContentItems', payload: items })
  }

  function setUserContentCurrentPage(page) {
    dispatch({ type: 'setUserContentCurrentPage', payload: page })
  }

  function setUserContentNoData(noData) {
    dispatch({ type: 'setUserContentNoData', payload: noData })
  }

  function setActiveTab(tabIndex) {
    dispatch({ type: 'setActiveTab', payload: tabIndex })
  }

  function setScroll(position) {
    dispatch({ type: 'setScrollPosition', payload: position })
  }

  function setLoading(loading) {
    dispatch({ type: 'setLoading', payload: loading })
  }

  return {
    state: state,
    dispath: dispatch,
    setItems,
    addItems,
    setCurrentPage,
    setNoData,
    setUserContentItems,
    addUserContentItems,
    setUserContentCurrentPage,
    setUserContentNoData,
    setActiveTab,
    setScroll,
    setLoading,
  }
}
