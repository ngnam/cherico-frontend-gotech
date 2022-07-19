import * as React from 'react'
import { useProvider } from 'App/context'

const initialState = {
  items: [],
  currentPage: 1,
  noData: false,
  scrollPosition: 0,
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
      return { ...state, noData: payload }
    case 'setScrollPosition':
      return { ...state, scrollPosition: payload }
    default:
      throw new Error('Action type not found')
  }
}

export function useDiysReducer() {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return {
    state,
    dispatch,
  }
}

export default function () {
  const {
    diys: { state, dispatch },
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

  function setScroll(position) {
    dispatch({ type: 'setScrollPosition', payload: position })
  }

  return {
    state: state,
    dispath: dispatch,
    setItems,
    addItems,
    setCurrentPage,
    setNoData,
    setScroll,
  }
}
