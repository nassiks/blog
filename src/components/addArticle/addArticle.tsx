import React, { useState } from 'react'
import { Button, Card, Form, Input, Tag, Space } from 'antd'

import { useDispatch, useTypedSelector } from '../../hooks/useTypedSelector'
import { createArticle } from '../../store/action-creators/articles'
import { useNavigation } from '../../hooks/useNavigation'

import styles from './addArticle.module.scss'

interface addArticleFormData {
  title: string
  description: string
  body: string
  tagList: string[]
}

const AddArticle: React.FC = () => {
  const dispatch = useDispatch()
  const { user } = useTypedSelector((state) => state.users)
  const [inputTag, setInputTag] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const { navigateToArticle } = useNavigation()
  const handleFinish = (values: addArticleFormData) => {
    const { title, description, body } = values
    if (user) {
      dispatch(createArticle({ title, description, body, tagList: tags }, user.token, navigateToArticle))
    }
  }

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
      <h2 className={styles['addArticleFormTitle']}>Create new article</h2>
      <Form onFinish={handleFinish} layout="vertical" className={styles['addArticleForm']}>
        <Form.Item
          label="Title"
          name="title"
          rules={[
            { required: true, message: 'Please input title!' },
            { whitespace: true, message: 'Cannot be blank!' },
          ]}
        >
          <Input placeholder="Title" />
        </Form.Item>

        <Form.Item
          label="Short description"
          name="description"
          rules={[
            { required: true, message: 'Please input short description!' },
            { whitespace: true, message: 'Cannot be blank!' },
          ]}
        >
          <Input placeholder="Short description" />
        </Form.Item>

        <Form.Item
          label="Text"
          name="body"
          rules={[
            { required: true, message: 'Please input text!' },
            { whitespace: true, message: 'Cannot be blank!' },
          ]}
        >
          <Input.TextArea placeholder="Text" className={styles['addArticleFormTextarea']} />
        </Form.Item>

        <div className={styles['addArticleFormTagsContainer']}>
          <Form.Item
            label="Tags"
            name="tags"
            rules={[{ required: false }, { whitespace: true, message: 'Cannot be blank!' }]}
          >
            <Space direction="vertical" wrap>
              {tags.map((tag, index) => (
                <div key={index} className={styles['addArticleFormTagsDelete']}>
                  <Tag className={styles['addArticleFormTags']}>{tag}</Tag>
                  <Button danger size="middle" key="delete" onClick={() => handleDeleteTag(tag)}>
                    Delete
                  </Button>
                </div>
              ))}
              <div className={styles['addArticleFormTagsAdd']}>
                <Input value={inputTag} onChange={(e) => setInputTag(e.target.value)} placeholder="Tag" />
                <Button type="primary" ghost size="middle" onClick={handleAddTag}>
                  Add Tag
                </Button>
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

export default AddArticle
