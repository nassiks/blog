import { ArticleActionTypes, ArticleState, ArticleAction } from '../../types/articlesTypes'

const initialState: ArticleState = {
  currentArticle: null,
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
    case ArticleActionTypes.FETCH_ARTICLE_BY_SLUG:
      return { ...state, loading: true }
    case ArticleActionTypes.FETCH_ARTICLE_BY_SLUG_SUCCESS:
      return { ...state, loading: false, currentArticle: action.payload }
    case ArticleActionTypes.FETCH_ARTICLE_BY_SLUG_ERROR:
      return { ...state, loading: false, error: action.payload }
    case ArticleActionTypes.CREATE_ARTICLE:
      return { ...state, loading: true, error: null }
    case ArticleActionTypes.CREATE_ARTICLE_SUCCESS:
      return { ...state, loading: false, articles: [action.payload, ...state.articles], currentArticle: action.payload }
    case ArticleActionTypes.CREATE_ARTICLE_ERROR:
      return { ...state, loading: false, error: action.payload }
    case ArticleActionTypes.UPDATE_ARTICLE:
      return { ...state, loading: true }
    case ArticleActionTypes.UPDATE_ARTICLE_SUCCESS: {
      const updatedArticles = state.articles.map((article) =>
        article.slug === action.payload.slug ? action.payload : article
      )
      return { ...state, loading: false, currentArticle: action.payload, articles: updatedArticles }
    }
    case ArticleActionTypes.UPDATE_ARTICLE_ERROR:
      return { ...state, loading: false, error: action.payload }
    case ArticleActionTypes.DELETE_ARTICLE:
      return { ...state, loading: true }
    case ArticleActionTypes.DELETE_ARTICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        articles: state.articles.filter((article) => article.slug !== state.currentArticle?.slug),
        currentArticle: null,
      }
    case ArticleActionTypes.DELETE_ARTICLE_ERROR:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
