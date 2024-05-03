// eslint-disable-next-line import/named
import { Dispatch } from 'redux'
import axios from 'axios'

import { UsersActionTypes, UsersAction } from '../../types/usersTypes'

export const updateProfile = (
  userData: { username: string; email: string; password: string; image: string },
  token: string,
  onSuccess: () => void
) => {
  return async (dispatch: Dispatch<UsersAction>) => {
    try {
      dispatch({ type: UsersActionTypes.UPDATE_USER })
      const { username, email, password, image } = userData

      const response = await axios.put(
        'https://blog.kata.academy/api/user',
        {
          user: { username, email, ...(password && { password }), image },
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )

      dispatch({
        type: UsersActionTypes.UPDATE_USER_SUCCESS,
        payload: response.data.user,
      })
      localStorage.setItem('token', JSON.stringify(response.data.user.token))
      localStorage.setItem('user', JSON.stringify(response.data.user))
      onSuccess()
    } catch (error) {
      dispatch({
        type: UsersActionTypes.UPDATE_USER_ERROR,
        payload: 'Failed to update user',
      })
      console.error('Update profile error:', error)
    }
  }
}
