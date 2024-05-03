// eslint-disable-next-line import/named
import { Dispatch } from 'redux'
import axios from 'axios'

import { UsersActionTypes, UsersAction } from '../../types/usersTypes'

export const authUser = (email: string, password: string, onSuccess: () => void) => {
  return async (dispatch: Dispatch<UsersAction>) => {
    try {
      dispatch({ type: UsersActionTypes.LOGIN_USER })
      const response = await axios.post('https://blog.kata.academy/api/users/login', {
        user: { email, password },
      })
      if (response.status === 200) {
        localStorage.setItem('token', JSON.stringify(response.data.user.token))
        localStorage.setItem('user', JSON.stringify(response.data.user))

        dispatch({
          type: UsersActionTypes.LOGIN_USER_SUCCESS,
          payload: response.data.user,
        })
      }
      onSuccess()
    } catch (e) {
      dispatch({
        type: UsersActionTypes.LOGIN_USER_ERROR,
        payload: 'Login error',
      })
    }
  }
}

export const initializeAuth = () => {
  return (dispatch: Dispatch<UsersAction>) => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')

    if (storedToken && storedUser) {
      const user = JSON.parse(storedUser)
      dispatch({
        type: UsersActionTypes.LOGIN_USER_SUCCESS,
        payload: user,
      })
    }
  }
}

export const logoutUser = () => {
  return (dispatch: Dispatch<UsersAction>) => {
    dispatch({
      type: UsersActionTypes.LOGOUT_USER,
    })
  }
}
