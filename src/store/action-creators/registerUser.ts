// eslint-disable-next-line import/named
import { Dispatch } from 'redux'
import axios from 'axios'

import { UsersActionTypes, UsersAction } from '../../types/usersTypes'

export const registerUser = (username: string, email: string, password: string, onSuccess: () => void) => {
  return async (dispatch: Dispatch<UsersAction>) => {
    try {
      dispatch({ type: UsersActionTypes.REGISTER_USERS })
      const response = await axios.post('https://blog.kata.academy/api/users', {
        user: { username, email, password },
      })
      if (response.status === 200) {
        dispatch({
          type: UsersActionTypes.REGISTER_USERS_SUCCESS,
          payload: response.data.user,
        })
      }
      onSuccess()
    } catch (e) {
      dispatch({
        type: UsersActionTypes.REGISTER_USERS_ERROR,
        payload: 'Registration error',
      })
    }
  }
}
