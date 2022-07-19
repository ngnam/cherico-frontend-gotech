import * as React from 'react'
import { useProvider } from 'App/context'

const initialState = {
  postModalOpen: false,
  loginModalOpen: false
}

function reducer(state, { type, payload }) {
  switch (type) {
    case 'set':
      return { ...state, ...payload }
    default:
      throw new Error('Action type not found')
  }
}

export function useHeaderReducer() {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return {
    state,
    dispatch,
  }
}

export default function () {
  const {
    header: { state, dispatch },
  } = useProvider()

  function openPostModal() {
    dispatch({ type: 'set', payload: { postModalOpen: true } })
  }

  function closePostModal() {
    dispatch({ type: 'set', payload: { postModalOpen: false } })
  }

  function openLoginModal() {
    dispatch({ type: 'set', payload: { loginModalOpen: true }})
  }

  function closeLoginModal() {
    dispatch({ type: 'set', payload: { loginModalOpen: false}})
  }

  return {
    state,
    openPostModal,
    closePostModal,
    openLoginModal,
    closeLoginModal
  }
}
