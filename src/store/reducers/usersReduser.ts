import { AuthState, UsersAction, UsersActionTypes } from '../../types/usersTypes'

const initialState: AuthState = {
  user: null,
  token: '',
  loading: false,
  error: null,
}

export const usersReducer = (state = initialState, action: UsersAction): AuthState => {
  switch (action.type) {
    case UsersActionTypes.REGISTER_USERS:
      return { ...state, loading: true }
    case UsersActionTypes.REGISTER_USERS_SUCCESS:
      return { ...state, loading: false, error: null, user: action.payload, token: action.payload.token }
    case UsersActionTypes.REGISTER_USERS_ERROR:
      return { ...state, loading: false, error: action.payload }
    case UsersActionTypes.LOGIN_USER:
      return { ...state, loading: true }
    case UsersActionTypes.LOGIN_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload, token: action.payload.token, error: null }
    case UsersActionTypes.LOGIN_USER_ERROR:
      return { ...state, loading: false, error: action.payload }
    case UsersActionTypes.UPDATE_USER:
      return { ...state, loading: true }
    case UsersActionTypes.UPDATE_USER_SUCCESS:
      return { ...state, user: action.payload, loading: false }
    case UsersActionTypes.UPDATE_USER_ERROR:
      return { ...state, error: action.payload, loading: false }
    case UsersActionTypes.LOGOUT_USER:
      return { ...initialState }
    default:
      return state
  }
}
