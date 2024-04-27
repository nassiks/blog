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
      dispatch({ type: ArticleActionTypes.FETCH_ARTICLES_ERROR, payload: 'Произошла ошибка при загрузке статей' })
    }
  }
}

export function setArticleList(page: number): ArticleAction {
  return { type: ArticleActionTypes.SET_ARTICLES_PAGE, payload: page }
}
