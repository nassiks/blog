/* eslint-disable no-unused-vars */
export interface Users {
  username: string
  token: string
  email: string
  password: string
  image: string
}

export interface AuthState {
  user: Users | null
  token: string
  loading: boolean
  error: null | string
}

export enum UsersActionTypes {
  REGISTER_USERS = 'REGISTER_USERS',
  REGISTER_USERS_SUCCESS = 'REGISTER_USERS_SUCCESS',
  REGISTER_USERS_ERROR = 'REGISTER_USERS_ERROR',
  LOGIN_USER = 'LOGIN_USER',
  LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS',
  LOGIN_USER_ERROR = 'LOGIN_USER_ERROR',
  LOGOUT_USER = 'LOGOUT_USER',
  UPDATE_USER = 'UPDATE_USER',
  UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS',
  UPDATE_USER_ERROR = 'UPDATE_USER_ERROR',
}

interface RegisterUsersAction {
  type: UsersActionTypes.REGISTER_USERS
}

interface RegisterUsersSuccessAction {
  type: UsersActionTypes.REGISTER_USERS_SUCCESS
  payload: Users
}

interface RegisterUsersErrorAction {
  type: UsersActionTypes.REGISTER_USERS_ERROR
  payload: string
}

interface LoginUserAction {
  type: UsersActionTypes.LOGIN_USER
}

interface LoginUserSuccessAction {
  type: UsersActionTypes.LOGIN_USER_SUCCESS
  payload: Users
}

interface LoginUserErrorAction {
  type: UsersActionTypes.LOGIN_USER_ERROR
  payload: string
}

interface LogoutUserAction {
  type: UsersActionTypes.LOGOUT_USER
}

interface UpdateUserAction {
  type: UsersActionTypes.UPDATE_USER
}

interface UpdateUserSuccessAction {
  type: UsersActionTypes.UPDATE_USER_SUCCESS
  payload: Users
}

interface UpdateUserErrorAction {
  type: UsersActionTypes.UPDATE_USER_ERROR
  payload: string
}

export type UsersAction =
  | RegisterUsersAction
  | RegisterUsersSuccessAction
  | RegisterUsersErrorAction
  | LoginUserAction
  | LoginUserSuccessAction
  | LoginUserErrorAction
  | LogoutUserAction
  | UpdateUserAction
  | UpdateUserSuccessAction
  | UpdateUserErrorAction
