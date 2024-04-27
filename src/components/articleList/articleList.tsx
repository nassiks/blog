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

  console.log(articles)

  useEffect(() => {
    dispatch(fetchArticle(page))
  }, [page, dispatch])

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

  const handlePageChange = (page: number) => {
    dispatch(fetchArticle(page))
    dispatch(setArticleList(page))
  }

  return (
    <div>
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
          />
        )}
      />
      <Pagination
        className={styles['articleListPagination']}
        current={page}
        total={articlesCount}
        pageSize={5}
        onChange={handlePageChange}
        showSizeChanger={false}
      ></Pagination>
    </div>
  )
}

export default ArticleList
