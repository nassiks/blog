import React from 'react'
import { Row, Col, Typography, Tag, Avatar, Card, Button } from 'antd'
import { useNavigate } from 'react-router-dom'

import { useDispatch, useTypedSelector } from '../../hooks/useTypedSelector'
import { toggleFavorite } from '../../store/action-creators/articles'

import styles from './articleItem.module.scss'

interface ArticleItemProps {
  slug: string
  title: string
  description: string
  tags: string[]
  avatar: string
  author: string
  date: string
  likes: number
  favorited: boolean
}

const { Title, Text } = Typography
const ArticleItem: React.FC<ArticleItemProps> = ({
  slug,
  title,
  description,
  tags,
  avatar,
  author,
  date,
  likes,
  favorited,
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useTypedSelector((state) => state.users)

  const navigateToArticle = () => {
    navigate(`/articles/${slug}`)
  }

  const handleToggleFavorite = () => {
    if (!user) {
      navigate('/sign-in')
      return
    }
    dispatch(toggleFavorite(slug, user.token, favorited))
  }

  return (
    <Card className={styles['articleItem']}>
      <Row justify="space-between" style={{ width: '100%' }}>
        <Col span={20}>
          <div className={styles['articleItemHeader']}>
            <Title level={2} onClick={navigateToArticle} className={styles['articleItemHeaderTitle']}>
              {title}
            </Title>
            <div>
              <Button onClick={handleToggleFavorite} className={styles['articleItemHeaderLikes']}>
                {favorited ? '❤️' : '🤍'}
              </Button>
              {likes}
            </div>
          </div>
          <div className={styles['articleItemBody']}>
            <div className={styles['articleItemTags']}>
              {tags.length > 0 && tags.map((tag, index) => (tag.trim() !== '' ? <Tag key={index}>{tag}</Tag> : null))}
            </div>
            <Text>{description}</Text>
          </div>
        </Col>
        <Col span={4} className={styles['articleItemAuthor']}>
          <div className={styles['articleItemAuthorInfo']}>
            <Text strong className={styles['articleItemAuthorUsername']}>
              {author}
            </Text>
            <Text type="secondary" className={styles['articleItemAuthorDate']}>
              {date}
            </Text>
          </div>
          <Avatar size={46} src={avatar} />
        </Col>
      </Row>
    </Card>
  )
}

export default ArticleItem
