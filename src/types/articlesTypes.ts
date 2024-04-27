/* eslint-disable no-unused-vars */
export interface Article {
  slug: string
  title: string
  description: string
  body: string
  tagList: string[]
  createdAt: string
  author: Author
  favoritesCount: number
}

export interface Author {
  username: string
  image: string
}
export interface ArticleState {
  currentArticle: Article | null
  articles: Article[]
  loading: boolean
  error: null | string
  page: number
  articlesCount: number
}

export enum ArticleActionTypes {
  FETCH_ARTICLE_BY_SLUG = 'FETCH_ARTICLE_BY_SLUG',
  FETCH_ARTICLE_BY_SLUG_SUCCESS = 'FETCH_ARTICLE_BY_SLUG_SUCCESS',
  FETCH_ARTICLE_BY_SLUG_ERROR = 'FETCH_ARTICLE_BY_SLUG_ERROR',
  FETCH_ARTICLES = 'FETCH_ARTICLES',
  FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS',
  FETCH_ARTICLES_ERROR = 'FETCH_ARTICLES_ERROR',
  SET_ARTICLES_PAGE = 'SET_ARTICLES_PAGE',
}

interface FetchArticleBySlug {
  type: ArticleActionTypes.FETCH_ARTICLE_BY_SLUG
}

interface FetchArticleBySlugSuccess {
  type: ArticleActionTypes.FETCH_ARTICLE_BY_SLUG_SUCCESS
  payload: Article
}
interface FetchArticleBySlugError {
  type: ArticleActionTypes.FETCH_ARTICLE_BY_SLUG_ERROR
  payload: string
}

interface FetchArticleAction {
  type: ArticleActionTypes.FETCH_ARTICLES
}
interface FetchArticleSuccessAction {
  type: ArticleActionTypes.FETCH_ARTICLES_SUCCESS
  payload: Article[]
  articlesCount: number
}
interface FetchArticleErrorAction {
  type: ArticleActionTypes.FETCH_ARTICLES_ERROR
  payload: string
}

interface SetArticlesPage {
  type: ArticleActionTypes.SET_ARTICLES_PAGE
  payload: number
}

export type ArticleAction =
  | FetchArticleAction
  | FetchArticleErrorAction
  | FetchArticleSuccessAction
  | SetArticlesPage
  | FetchArticleBySlug
  | FetchArticleBySlugError
  | FetchArticleBySlugSuccess
