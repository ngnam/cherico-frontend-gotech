import * as React from 'react'
import axios from 'axios'

import { Auth } from 'service/auth'
import { useProvider } from 'App/context'

const client = axios.create({
  baseURL: process.env.API_BASE_URL,
})

const initialState = {
  loading: false,
  loadingCount: 0,
}

function reducer(state, { type, payload }) {
  let count
  switch (type) {
    case 'set':
      return { ...state, ...payload }
    case 'increaseLoading':
      count = state.loadingCount + 1
      return { ...state, loadingCount: count, loading: count > 0 }
    case 'decreaseLoading':
      count = state.loadingCount - 1
      return { ...state, loadingCount: count < 0 ? 0 : count, loading: count > 0 }
    default:
      throw new Error('Action type not found')
  }
}

export function useRequestReducer() {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return {
    state,
    dispatch,
  }
}

export default function useRequest() {
  const {
    request: { state, dispatch },
  } = useProvider()

  async function getToken() {
    const user = await Auth.currentUserInfo()
    if (!user) {
      return null
    }
    const session = await Auth.currentSession()
    return session.idToken.jwtToken
  }

  async function request(config, options = {}) {
    // Please below to how can you config
    // https://github.com/axios/axios#request-config
    const reqConfig = { ...config, headers: config.headers || {} }

    if (!reqConfig.headers.Authorization) {
      const token = await getToken()
      if (token) {
        reqConfig.headers.Authorization = `Bearer ${token}`
      }
    }

    options.showLoading !== false && dispatch({ type: 'increaseLoading' })
    try {
      const result = await client(reqConfig)
      return result.data
    } catch (err) {
      console.error('request err', err)
      console.error('request config', reqConfig)
      throw err
    } finally {
      options.showLoading !== false && dispatch({ type: 'decreaseLoading' })
    }
  }

  return { state, dispatch, request, getToken, client }
}
