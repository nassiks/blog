import { combineReducers } from 'redux'

import { articlesReducer } from './articlesReducer'
import { usersReducer } from './usersReduser'

export const rootReducer = combineReducers({
  articles: articlesReducer,
  users: usersReducer,
})

export type RootState = ReturnType<typeof rootReducer>
