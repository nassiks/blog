import { combineReducers } from 'redux'

import { articlesReducer } from './articlesReducer'
import { usersReducer } from './usersReduser'
import { tagsReducer } from './tagsReduser'

export const rootReducer = combineReducers({
  articles: articlesReducer,
  users: usersReducer,
  tags: tagsReducer,
})

export type RootState = ReturnType<typeof rootReducer>
