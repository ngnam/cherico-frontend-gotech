import * as React from 'react'
import { useProvider } from 'App/context'
import { Auth } from 'service/auth'

const initialState = {
  user: null,
  authChecked: false,
}

// user format
// {
//   "username": "12345678-0000-0000-0000-aabbccddeeff",
//   "attributes": {
//     "sub": "12345678-0000-0000-0000-aabbccddeeff",
//     "email_verified": true,
//     "email": "example@example.com"
//   }
// }

function reducer(state, { type, payload }) {
  switch (type) {
    case 'set':
      return { ...state, ...payload }
    default:
      throw new Error('Action type not found')
  }
}

export function useAuthReducer() {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return {
    state,
    dispatch,
  }
}

export default function () {
  const {
    auth: { state, dispatch },
  } = useProvider()

  React.useEffect(() => {
    if (state.authChecked) {
      return
    }

    checkAuth()
  }, [])

  async function checkAuth() {
    const user = await Auth.currentUserInfo()

    if (!user) {
      dispatch({ type: 'set', payload: { user: null, authChecked: true } })
      return
    }
    dispatch({ type: 'set', payload: { user, authChecked: true } })
  }

  async function login(email, password) {
    try {
      await Auth.signIn({
        username: email,
        password: password,
      })
      const user = await Auth.currentUserInfo()
      dispatch({ type: 'set', payload: { user } })
      return user
    } catch (error) {
      // console.error('Login error', error)
      window.alert('Login失敗しました')
      throw error
    }
  }

  async function logout() {
    await Auth.signOut()
    dispatch({ type: 'set', payload: { user: null, tokenResult: null } })
  }

  async function changePassword(oldPassword, newPassword) {
    try {
      const user = await Auth.currentAuthenticatedUser()
      const result = await Auth.changePassword(user, oldPassword, newPassword)
      return result
    } catch (error) {
      console.error('Password change error', error)
      throw error
    }
  }

  async function changeEmail(newEmail) {
    try {
      const user = await Auth.currentAuthenticatedUser()
      const result = await Auth.updateUserAttributes(
        user,
        {
          email: newEmail,
        },
        { env: process.env.DEV_ENV }
      )
      checkAuth()
      return result
    } catch (error) {
      console.error('Email update error', error)
      throw error
    }
  }

  return {
    state: state,
    dispath: dispatch,
    login,
    logout,
    changePassword,
    changeEmail,
  }
}
