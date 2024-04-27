import React from 'react'
import { Row, Col, Typography, Tag, Avatar, Card } from 'antd'

import styles from './articleItem.module.scss'

interface ArticleItemProps {
  title: string
  description: string
  tags: string[]
  avatar: string
  author: string
  date: string
  likes: number
}

const { Title, Text } = Typography
const ArticleItem: React.FC<ArticleItemProps> = ({ title, description, tags, avatar, author, date, likes }) => {
  return (
    <Card className={styles['articleItem']}>
      <Row justify="space-between" style={{ width: '100%' }}>
        <Col span={20}>
          <div className={styles['articleItemHeader']}>
            <Title level={2}>{title}</Title>
            <div>
              <span role="img" aria-label="like" className={styles['articleItemLikes']}>
                &#9825;
              </span>
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
            <Text strong>{author}</Text>
            <Text type="secondary">{date}</Text>
          </div>
          <Avatar size={46} src={avatar} />
        </Col>
      </Row>
    </Card>
  )
}

export default ArticleItem
