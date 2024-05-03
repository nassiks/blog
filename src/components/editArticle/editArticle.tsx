import React, { useEffect, useState } from 'react'
import { Button, Card, Form, Input, message, Space, Tag } from 'antd'
import { useParams } from 'react-router-dom'

import { useDispatch, useTypedSelector } from '../../hooks/useTypedSelector'
import { updateArticle } from '../../store/action-creators/articles'

import styles from './editArticle.module.scss'

interface editArticleFormDate {
  title: string
  description: string
  body: string
  tagList: string[]
}

const EditArticle: React.FC = () => {
  const dispatch = useDispatch()
  const { slug } = useParams()
  const article = useTypedSelector((state) => state.articles.currentArticle)
  const { user } = useTypedSelector((state) => state.users)

  const [inputTag, setInputTag] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const handleFinish = (values: editArticleFormDate) => {
    const { title, description, body } = values
    if (user && slug) {
      dispatch(
        updateArticle(slug, { title, description, body, tagList: tags }, user.token, () => {
          message.success('Article updated successfully!')
        })
      )
    }
  }

  useEffect(() => {
    if (article && article.tagList) {
      setTags(article.tagList)
    }
  }, [article])

  const handleAddTag = () => {
    if (inputTag && !tags.includes(inputTag)) {
      setTags([...tags, inputTag])
      setInputTag('')
    }
  }

  const handleDeleteTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  return (
    <Card className={styles['addArticleFormContainer']}>
      <h2 className={styles['addArticleFormTitle']}>Edit article</h2>
      <Form layout="vertical" className={styles['addArticleForm']} onFinish={handleFinish}>
        <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input title!' }]}>
          <Input placeholder="Title" />
        </Form.Item>

        <Form.Item
          label="Short description"
          name="description"
          rules={[{ required: true, message: 'Please input short description!' }]}
        >
          <Input placeholder="Short description" />
        </Form.Item>

        <Form.Item label="Text" name="body" rules={[{ required: true, message: 'Please input text!' }]}>
          <Input.TextArea placeholder="Text" className={styles['addArticleFormTextarea']} />
        </Form.Item>

        <div className={styles['addArticleFormTagsContainer']}>
          <Form.Item label="Tags" name="tags" rules={[{ required: false }]}>
            <Space direction="vertical" wrap>
              {tags.map((tag, index) => (
                <div key={index}>
                  <Tag className={styles['addArticleFormTags']}>{tag}</Tag>
                  <Button key="delete" onClick={() => handleDeleteTag(tag)}>
                    Delete
                  </Button>
                </div>
              ))}
              <div>
                <Input value={inputTag} onChange={(e) => setInputTag(e.target.value)} placeholder="Tag" />
                <Button onClick={handleAddTag}>Add Tag</Button>
              </div>
            </Space>
          </Form.Item>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles['addArticleFormButtonSend']}>
            Send
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default EditArticle
