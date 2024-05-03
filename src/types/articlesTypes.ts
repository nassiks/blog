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
  CREATE_ARTICLE = 'CREATE_ARTICLE',
  CREATE_ARTICLE_SUCCESS = 'CREATE_ARTICLE_SUCCESS',
  CREATE_ARTICLE_ERROR = 'CREATE_ARTICLE_ERROR',
  UPDATE_ARTICLE = 'UPDATE_ARTICLE',
  UPDATE_ARTICLE_SUCCESS = 'UPDATE_ARTICLE_SUCCESS',
  UPDATE_ARTICLE_ERROR = 'UPDATE_ARTICLE_ERROR',
  DELETE_ARTICLE = 'DELETE_ARTICLE',
  DELETE_ARTICLE_SUCCESS = 'DELETE_ARTICLE_SUCCESS',
  DELETE_ARTICLE_ERROR = 'DELETE_ARTICLE_ERROR',
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

interface CreateArticle {
  type: ArticleActionTypes.CREATE_ARTICLE
}

interface CreateArticleSuccess {
  type: ArticleActionTypes.CREATE_ARTICLE_SUCCESS
  payload: Article
}

interface CreateArticleError {
  type: ArticleActionTypes.CREATE_ARTICLE_ERROR
  payload: string
}

interface UpdateArticle {
  type: ArticleActionTypes.UPDATE_ARTICLE
}

interface UpdateArticleSuccess {
  type: ArticleActionTypes.UPDATE_ARTICLE_SUCCESS
  payload: Article
}

interface UpdateArticleError {
  type: ArticleActionTypes.UPDATE_ARTICLE_ERROR
  payload: string
}

interface DeleteArticleAction {
  type: ArticleActionTypes.DELETE_ARTICLE
}

interface DeleteArticleSuccessAction {
  type: ArticleActionTypes.DELETE_ARTICLE_SUCCESS
}

interface DeleteArticleErrorAction {
  type: ArticleActionTypes.DELETE_ARTICLE_ERROR
  payload: string
}

export type ArticleAction =
  | FetchArticleAction
  | FetchArticleErrorAction
  | FetchArticleSuccessAction
  | SetArticlesPage
  | FetchArticleBySlug
  | FetchArticleBySlugError
  | FetchArticleBySlugSuccess
  | CreateArticle
  | CreateArticleSuccess
  | CreateArticleError
  | UpdateArticle
  | UpdateArticleSuccess
  | UpdateArticleError
  | DeleteArticleAction
  | DeleteArticleSuccessAction
  | DeleteArticleErrorAction
