import React, { useEffect } from 'react'
import { Alert, Avatar, Button, Card, Col, Popconfirm, Row, Spin, Tag, Typography } from 'antd'
import Markdown from 'react-markdown'
import { useNavigate, useParams } from 'react-router-dom'

import { useDispatch, useTypedSelector } from '../../hooks/useTypedSelector'
import { deleteArticle, fetchArticleBySlug } from '../../store/action-creators/articles'
import { useNavigation } from '../../hooks/useNavigation'
import formatDate from '../../utils/formatDate'

import styles from './articlePage.module.scss'

const { Text } = Typography

const ArticlePage: React.FC = () => {
  const { currentArticle, loading, error } = useTypedSelector((state) => state.articles)
  const { user } = useTypedSelector((state) => state.users)
  const { navigateToArticle } = useNavigation()
  const dispatch = useDispatch()
  const { slug } = useParams()
  const navigate = useNavigate()

  const handleDelete = () => {
    if (user && slug) {
      dispatch(deleteArticle(slug, user.token, navigateToArticle))
    }
  }

  const navigateToEditArticle = () => {
    navigate(`/articles/${slug}/edit`)
  }

  useEffect(() => {
    if (slug) {
      dispatch(fetchArticleBySlug(slug))
    }
  }, [dispatch, slug])

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

  const isCurrentUserAuthor = user?.username === currentArticle?.author.username

  return (
    <Card className={styles['articleItem']} style={{ height: '807px' }}>
      <Row justify="space-between" style={{ width: '100%' }}>
        <Col span={20}>
          <div className={styles['articleItemHeader']}>
            <h2 className={styles['articleItemHeaderTitle']}>{currentArticle?.title}</h2>
            <div>
              <span role="img" aria-label="like" className={styles['articleItemLikes']}>
                &#9825;
              </span>
              {currentArticle?.favoritesCount}
            </div>
          </div>
          <div className={styles['articleItemBody']}>
            <div className={styles['articleItemTags']}>
              {currentArticle?.tagList.map((tag, index) => tag.trim() !== '' && <Tag key={index}>{tag}</Tag>)}
            </div>
            <Text>{currentArticle?.description}</Text>
          </div>
        </Col>
        <Col span={4} className={styles['articleItemAuthorContainer']}>
          <div className={styles['articleItemAuthor']}>
            <div className={styles['articleItemAuthorInfo']}>
              <Text strong>{currentArticle?.author.username}</Text>
              <Text type="secondary">{formatDate(currentArticle?.createdAt)}</Text>
            </div>
            <Avatar size={46} src={currentArticle?.author.image} />
          </div>
          {isCurrentUserAuthor && (
            <div className={styles['articleItemAuthorButton']}>
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={handleDelete}
                okText="Yes"
                cancelText="No"
                placement={'right'}
              >
                <Button danger>Delete</Button>
              </Popconfirm>
              <Button onClick={navigateToEditArticle}>Edit</Button>
            </div>
          )}
        </Col>
      </Row>
      <Markdown>{currentArticle?.body}</Markdown>
    </Card>
  )
}

export default ArticlePage
