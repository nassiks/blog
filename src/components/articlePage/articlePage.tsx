import React, { useEffect } from 'react'
import { Alert, Avatar, Button, Card, Col, Popconfirm, Row, Spin, Tag, Typography } from 'antd'
import Markdown from 'react-markdown'
import { useNavigate, useParams } from 'react-router-dom'

import { useDispatch, useTypedSelector } from '../../hooks/useTypedSelector'
import { deleteArticle, fetchArticleBySlug, toggleFavorite } from '../../store/action-creators/articles'
import { useNavigation } from '../../hooks/useNavigation'
import formatDate from '../../utils/formatDate'

import styles from './articlePage.module.scss'

const { Title, Text } = Typography

const ArticlePage: React.FC = () => {
  const { currentArticle, loading, error } = useTypedSelector((state) => state.articles)
  const { user, token } = useTypedSelector((state) => state.users)
  const { navigateToArticle, navigateToSignIn } = useNavigation()
  const dispatch = useDispatch()
  const { slug } = useParams()
  const navigate = useNavigate()

  const handleDelete = () => {
    if (user && slug) {
      dispatch(deleteArticle(slug, token, navigateToArticle))
    }
  }

  const navigateToEditArticle = () => {
    navigate(`/articles/${slug}/edit`)
  }

  const handleToggleFavorite = () => {
    if (!user) {
      navigateToSignIn()
      return
    }
    if (currentArticle) {
      dispatch(toggleFavorite(currentArticle.slug, token, currentArticle.favorited))
    }
  }

  useEffect(() => {
    if (slug) {
      dispatch(fetchArticleBySlug(slug, token))
    }
  }, [dispatch, slug, token])

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
            <Title level={2} className={styles['articleItemHeaderTitle']}>
              {currentArticle?.title}
            </Title>
            <div>
              <Button onClick={handleToggleFavorite} className={styles['articleItemHeaderLikes']}>
                {currentArticle?.favorited ? '❤️' : '🤍'}
              </Button>
              {currentArticle?.favoritesCount}
            </div>
          </div>
          <div className={styles['articleItemBody']}>
            <div className={styles['articleItemTags']}>
              {currentArticle?.tagList.map((tag, index) => tag.trim() !== '' && <Tag key={index}>{tag}</Tag>)}
            </div>
            <Text type="secondary" className={styles['articleItemBodyDescription']}>
              {currentArticle?.description}
            </Text>
          </div>
        </Col>
        <Col span={4} className={styles['articleItemAuthorContainer']}>
          <div className={styles['articleItemAuthor']}>
            <div className={styles['articleItemAuthorInfo']}>
              <Text strong className={styles['articleItemAuthorUsername']}>
                {currentArticle?.author.username}
              </Text>
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
                <Button size="middle" danger>
                  Delete
                </Button>
              </Popconfirm>
              <Button size="middle" onClick={navigateToEditArticle} className={styles['articleItemAuthorEdit']}>
                Edit
              </Button>
            </div>
          )}
        </Col>
      </Row>
      <Markdown className={styles['articleItemText']}>{currentArticle?.body}</Markdown>
    </Card>
  )
}

export default ArticlePage
