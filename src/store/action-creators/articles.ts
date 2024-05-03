// eslint-disable-next-line import/named
import { Dispatch } from 'redux'
import axios from 'axios'

import { ArticleAction, ArticleActionTypes } from '../../types/articlesTypes'

export const fetchArticle = (page = 1, limit = 5) => {
  return async (dispatch: Dispatch<ArticleAction>) => {
    try {
      dispatch({ type: ArticleActionTypes.FETCH_ARTICLES })
      const response = await axios.get('https://blog.kata.academy/api/articles', {
        params: { offset: (page - 1) * limit, limit: limit },
      })
      dispatch({
        type: ArticleActionTypes.FETCH_ARTICLES_SUCCESS,
        payload: response.data.articles,
        articlesCount: response.data.articlesCount,
      })
    } catch (e) {
      dispatch({ type: ArticleActionTypes.FETCH_ARTICLES_ERROR, payload: 'Failed to loading articles' })
    }
  }
}

export const fetchArticleBySlug = (slug: string) => {
  return async (dispatch: Dispatch<ArticleAction>) => {
    try {
      dispatch({ type: ArticleActionTypes.FETCH_ARTICLE_BY_SLUG })
      const response = await axios.get(`https://blog.kata.academy/api/articles/${slug}`)
      dispatch({
        type: ArticleActionTypes.FETCH_ARTICLE_BY_SLUG_SUCCESS,
        payload: response.data.article,
      })
    } catch (e) {
      dispatch({
        type: ArticleActionTypes.FETCH_ARTICLE_BY_SLUG_ERROR,
        payload: 'Failed to loading article',
      })
    }
  }
}

export function setArticleList(page: number): ArticleAction {
  return { type: ArticleActionTypes.SET_ARTICLES_PAGE, payload: page }
}

export const createArticle = (
  articleData: { title: string; description: string; body: string; tagList: string[] },
  token: string,
  onSuccess: () => void
) => {
  return async (dispatch: Dispatch<ArticleAction>) => {
    dispatch({ type: ArticleActionTypes.CREATE_ARTICLE })
    try {
      const response = await axios.post(
        'https://blog.kata.academy/api/articles',
        { article: articleData },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )

      dispatch({ type: ArticleActionTypes.CREATE_ARTICLE_SUCCESS, payload: response.data.article })
      onSuccess()
    } catch (error) {
      dispatch({ type: ArticleActionTypes.CREATE_ARTICLE_ERROR, payload: 'Failed to create article' })
    }
  }
}

export const updateArticle = (
  slug: string,
  articleData: { title: string; description: string; body: string; tagList: string[] },
  token: string,
  onSuccess: () => void
) => {
  return async (dispatch: Dispatch<ArticleAction>) => {
    dispatch({ type: ArticleActionTypes.UPDATE_ARTICLE })
    try {
      const response = await axios.put(
        `https://blog.kata.academy/api/articles/${slug}`,
        { article: articleData },
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      dispatch({ type: ArticleActionTypes.UPDATE_ARTICLE_SUCCESS, payload: response.data.article })
      onSuccess()
    } catch (error) {
      dispatch({ type: ArticleActionTypes.UPDATE_ARTICLE_ERROR, payload: 'Failed to update article' })
    }
  }
}

export const deleteArticle = (slug: string, token: string, onSuccess: () => void) => async (dispatch: Dispatch) => {
  dispatch({ type: ArticleActionTypes.DELETE_ARTICLE })
  try {
    await axios.delete(`https://blog.kata.academy/api/articles/${slug}`, {
      headers: { Authorization: `Token ${token}` },
    })
    dispatch({ type: ArticleActionTypes.DELETE_ARTICLE_SUCCESS })
    onSuccess()
  } catch (error) {
    dispatch({
      type: ArticleActionTypes.DELETE_ARTICLE_ERROR,
      payload: 'Error deleting article',
    })
  }
}
