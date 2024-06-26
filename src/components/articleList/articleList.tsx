import React, { useEffect } from 'react'
import { Alert, List, Pagination, Spin } from 'antd'

import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useDispatch } from '../../hooks/useTypedSelector'
import { fetchArticle, setArticleList } from '../../store/action-creators/articles'
import ArticleItem from '../articleItem/articleItem'
import formatDate from '../../utils/formatDate'

import styles from './articleList.module.scss'

const ArticleList: React.FC = () => {
  const { articles, loading, error, page, articlesCount } = useTypedSelector((state) => state.articles)
  const dispatch = useDispatch()
  const { token } = useTypedSelector((state) => state.users)

  const currentPage = Number(localStorage.getItem('currentPage')) || 1

  useEffect(() => {
    dispatch(fetchArticle(currentPage, 5, token))
  }, [dispatch, token])

  if (loading) {
    return (
      <Spin tip="Loading..." size="large">
        <div style={{ minHeight: '200px' }} />
      </Spin>
    )
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon closable />
  }

  const handlePageChange = (newPage: number) => {
    localStorage.setItem('currentPage', newPage.toString())
    dispatch(fetchArticle(newPage, 5, token))
    dispatch(setArticleList(newPage))
  }

  return (
    <div className={styles['articleListContainer']}>
      <List
        itemLayout="horizontal"
        dataSource={articles}
        renderItem={(article) => (
          <ArticleItem
            key={article.slug}
            slug={article.slug}
            title={article.title}
            description={article.description}
            tags={article.tagList}
            avatar={article.author.image}
            author={article.author.username}
            date={formatDate(article.createdAt)}
            likes={article.favoritesCount}
            favorited={article.favorited}
          />
        )}
      />
      <Pagination
        className={styles['articleListPagination']}
        current={page || currentPage}
        total={articlesCount}
        pageSize={5}
        onChange={handlePageChange}
        showSizeChanger={false}
      ></Pagination>
    </div>
  )
}

export default ArticleList
