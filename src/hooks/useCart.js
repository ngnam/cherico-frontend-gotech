import * as React from 'react'
import { useProvider } from 'App/context'

const initialState = {
  items: [],
}

function reducer(state, { type, payload }) {
  switch (type) {
    case 'addItems':
      return { ...state, items: [...state.items, payload] }
    case 'setItems':
      return { ...state, items: payload }
    default:
      throw new Error('Action type not found')
  }
}

export function useCartReducer() {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return {
    state,
    dispatch,
  }
}

export default function () {
  const {
    cart: { state, dispatch },
  } = useProvider()

  function addToCart(item) {
    dispatch({ type: 'addItems', payload: item })
  }

  function removeFromCart(item) {
    const items = state.items.filter((i) => i.id !== item.id)
    dispatch({ type: 'setItems', payload: items })
  }

  return {
    state: state,
    addToCart,
    removeFromCart,
  }
}
