import { ArticleActionTypes, ArticleState, ArticleAction } from '../../types/articlesTypes'

const initialState: ArticleState = {
  articles: [],
  loading: false,
  error: null,
  page: 1,
  articlesCount: 0,
}

export const articlesReducer = (state = initialState, action: ArticleAction): ArticleState => {
  switch (action.type) {
    case ArticleActionTypes.FETCH_ARTICLES:
      return { ...state, loading: true }
    case ArticleActionTypes.FETCH_ARTICLES_SUCCESS:
      return { ...state, loading: false, articles: action.payload, articlesCount: action.articlesCount }
    case ArticleActionTypes.FETCH_ARTICLES_ERROR:
      return { ...state, loading: false, error: action.payload }
    case ArticleActionTypes.SET_ARTICLES_PAGE:
      return { ...state, page: action.payload }
    default:
      return state
  }
}
